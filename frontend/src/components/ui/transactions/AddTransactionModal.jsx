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
import { createTransaction } from "../../../services/transactions";

function todayFormatted() {
  return new Date().toISOString().split("T")[0];
}

function getInitialState(lockedType) {
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
}) {
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const [form, setForm] = useState(() => getInitialState(lockedType));

  const [allCategories, setAllCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

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

  // Reset the form whenever the modal opens
  useEffect(() => {
    if (isOpen) setForm(getInitialState(lockedType));
  }, [isOpen, lockedType]);

  // Categories filtered by the currently selected type (income/expense)
  const categoryOptions = allCategories.filter(
    (c) => c.type === (form.type === "Income" ? "income" : "expense")
  );

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleTypeChange = (type) =>
    setForm((prev) => ({ ...prev, type, category: null }));

  const handleCategoryChange = (category) =>
    setForm((prev) => ({ ...prev, category }));

  const handlePaymentMethodChange = (paymentMethod) =>
    setForm((prev) => ({ ...prev, paymentMethod }));

  const handleClose = () => {
    setForm(getInitialState(lockedType));
    onClose();
  };

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be signed in to add a transaction.");
      return;
    }

    setIsSaving(true);
    try {
      const saved = await createTransaction(supabase, user.id, {
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

      onSave?.(saved);
      toast.success("Transaction saved.");
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

  const modalTitle = lockedType ? `Add ${lockedType}` : "Add Transaction";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} icon={Wallet} title={modalTitle}>
      {!lockedType && (
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
          disabled={!isValid || isSaving}
          className="flex h-[42px] items-center rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Transaction"}
        </button>
      </div>
    </Modal>
  );
}