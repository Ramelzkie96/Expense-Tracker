import { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import Modal from "../Modal";
import Input from "../Input";
import TransactionTypeToggle from "./TransactionTypeToggle";
import CategoryDropdown from "./CategoryDropdown";
import PaymentMethodDropdown from "./PaymentMethodDropdown";
import { useSupabaseClient } from "../../../hooks/useSupabaseClient";
import { getCategories, getPaymentMethods } from "../../../services/categories";
import {
  createTransaction,
  updateTransaction,
  getDashboardTransactions,
} from "../../../services/transactions";
import {
  computeDashboardSummary,
  formatPeso,
} from "../../../utils/dashboardSummary";

// Compare in cents so floating-point sums (e.g. 0.1 + 0.2) can't cause a
// false "exceeds balance" result.
function exceedsBalance(amount, balance) {
  return Math.round(amount * 100) > Math.round(balance * 100);
}

function todayFormatted() {
  return new Date().toISOString().split("T")[0];
}

function getInitialState(lockedType, transaction) {
  // Edit mode: prefill from the selected row
  if (transaction) {
    return {
      type: transaction.type,
      amount: String(Math.abs(transaction.amount)),
      date: transaction.rawDate,
      description: transaction.title,
      // id + name is enough: the dropdowns display by name and saving uses the id
      category: transaction.categoryId
        ? { id: transaction.categoryId, name: transaction.category }
        : null,
      paymentMethod: transaction.paymentMethodId
        ? { id: transaction.paymentMethodId, name: transaction.method }
        : null,
      notes: transaction.notes ?? "",
    };
  }

  return {
    type: lockedType ?? "Expense",
    amount: "",
    date: todayFormatted(),
    description: "",
    category: null,        // full category object from Supabase
    paymentMethod: null,   // full payment_method object from Supabase
    notes: "",
  };
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  lockedType,
  transaction = null, // pass a mapped transaction row to open in edit mode
}) {
  const isEdit = transaction !== null;
  // In edit mode the type is fixed to the transaction's own type
  const effectiveLockedType = isEdit ? transaction.type : lockedType;

  const supabase = useSupabaseClient();
  const { user } = useUser();
  const [form, setForm] = useState(() => getInitialState(effectiveLockedType, transaction));

  const [allCategories, setAllCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [balance, setBalance] = useState(null); // all-time income minus expenses; null until loaded

  // Fetch categories + payment methods once when the modal opens
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setIsLoadingOptions(true);

    Promise.all([getCategories(supabase), getPaymentMethods(supabase)])
      .then(([categories, methods]) => {
        if (cancelled) return;
        setAllCategories(categories);
        setPaymentMethods(methods);
      })
      .catch((err) => {
        console.error("Failed to load categories/payment methods:", err);
        toast.error("Failed to load form options. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingOptions(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, supabase]);

  // Load the current total balance when the modal opens (used to block
  // expenses that exceed it)
  useEffect(() => {
    if (!isOpen || !user) return;

    let cancelled = false;
    setBalance(null);

    getDashboardTransactions(supabase, user.id)
      .then((rows) => {
        if (!cancelled) setBalance(computeDashboardSummary(rows).totalBalance);
      })
      .catch((err) => console.error("Failed to load balance:", err));

    return () => {
      cancelled = true;
    };
  }, [isOpen, supabase, user]);

  // Reset (or prefill, in edit mode) the form whenever the modal opens
  useEffect(() => {
    if (isOpen) setForm(getInitialState(effectiveLockedType, transaction));
  }, [isOpen, effectiveLockedType, transaction]);

  // Categories filtered by the currently selected type (income/expense)
  const categoryOptions = allCategories.filter(
    (c) => c.type === (form.type === "Income" ? "income" : "expense")
  );

  // Expenses can't exceed the available balance. When editing an existing
  // expense, its own current amount is already deducted from the balance, so
  // add it back before comparing.
  const ownExpenseCredit =
    isEdit && transaction.type === "Expense" ? Math.abs(transaction.amount) : 0;
  const availableBalance = balance !== null ? balance + ownExpenseCredit : null;

  const amountNumber = parseFloat(form.amount);
  const isOverBalance =
    form.type === "Expense" &&
    availableBalance !== null &&
    !Number.isNaN(amountNumber) &&
    exceedsBalance(amountNumber, availableBalance);

  const overBalanceMessage =
    availableBalance !== null && availableBalance > 0
      ? `Amount exceeds your available balance of ${formatPeso(availableBalance)}.`
      : "You have no available balance to cover this expense.";

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleTypeChange = (type) =>
    setForm((prev) => ({ ...prev, type, category: null }));

  const handleCategoryChange = (category) =>
    setForm((prev) => ({ ...prev, category }));

  const handlePaymentMethodChange = (paymentMethod) =>
    setForm((prev) => ({ ...prev, paymentMethod }));

  const handleClose = () => {
    setForm(getInitialState(effectiveLockedType, transaction));
    onClose();
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be signed in to save a transaction.");
      return;
    }

    setIsSaving(true);
    try {
      // Authoritative check with a fresh balance, in case it changed since
      // the modal opened (e.g. another tab or device).
      if (form.type === "Expense") {
        const rows = await getDashboardTransactions(supabase, user.id);
        const currentBalance = computeDashboardSummary(rows).totalBalance;
        setBalance(currentBalance);

        if (exceedsBalance(parseFloat(form.amount), currentBalance + ownExpenseCredit)) {
          toast.error("Expense exceeds your available balance.");
          return;
        }
      }

      let saved;
      if (isEdit) {
        // Column names here are the database's (snake_case)
        saved = await updateTransaction(supabase, transaction.id, {
          type: form.type,
          amount: parseFloat(form.amount),
          title: form.description,
          category_id: form.category.id,
          payment_method_id: form.paymentMethod.id,
          transaction_date: form.date,
          notes: form.notes || null,
        });
      } else {
        saved = await createTransaction(supabase, user.id, {
          type: form.type,
          amount: parseFloat(form.amount),
          title: form.description,
          subtitle: null,
          categoryId: form.category.id,
          paymentMethodId: form.paymentMethod.id,
          transactionDate: form.date,
          transactionTime: null,
          notes: form.notes || null,
        });
      }

      onSave?.(saved);
      toast.success(isEdit ? "Transaction updated." : "Transaction saved.");
      handleClose();
    } catch (err) {
      console.error("Failed to save transaction:", err);
      toast.error("Failed to save transaction. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isValid =
    form.amount && form.date && form.description && form.category && form.paymentMethod;

  const modalTitle = isEdit
    ? "Edit Transaction"
    : lockedType
    ? `Add ${lockedType}`
    : "Add Transaction";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} icon={Wallet} title={modalTitle}>
      {!effectiveLockedType && (
        <TransactionTypeToggle type={form.type} onTypeChange={handleTypeChange} />
      )}

      <div className="mb-4 grid grid-cols-2 gap-4">
        <Input
          label="Amount"
          required
          icon={() => <span className="text-[13px] font-semibold">₱</span>}
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={form.amount}
          onChange={updateField("amount")}
        />

        <Input
          label="Date"
          required
          type="date"
          value={form.date}
          onChange={updateField("date")}
        />
      </div>

      {isOverBalance && (
        <p className="-mt-2 mb-4 text-[12.5px] font-medium text-rose-500">
          {overBalanceMessage}
        </p>
      )}

      <Input
        label="Description"
        required
        placeholder="e.g. Grocery Shopping, Netflix, Salary..."
        value={form.description}
        onChange={updateField("description")}
        className="mb-4"
      />

      <div className="mb-4">
        <CategoryDropdown
          value={form.category?.name ?? ""}
          onChange={handleCategoryChange}
          categories={categoryOptions}
          isLoading={isLoadingOptions}
        />
      </div>

      <div className="mb-4">
        <PaymentMethodDropdown
          value={form.paymentMethod?.name ?? ""}
          onChange={handlePaymentMethodChange}
          paymentMethods={paymentMethods}
          isLoading={isLoadingOptions}
        />
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
          Notes <span className="font-normal text-slate-400">(Optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Add a note..."
          value={form.notes}
          onChange={updateField("notes")}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleClose}
          disabled={isSaving}
          className="flex h-[42px] items-center rounded-lg cursor-pointer border border-slate-200 bg-white px-5 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid || isSaving || isOverBalance}
          className="flex h-[42px] items-center rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : isEdit ? "Save Changes" : "Save Transaction"}
        </button>
      </div>
    </Modal>
  );
}