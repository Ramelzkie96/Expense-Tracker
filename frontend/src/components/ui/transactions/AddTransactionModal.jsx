import { useState, useEffect } from "react";
import { Wallet, Tag, CreditCard } from "lucide-react";
import Modal from "../Modal";
import Input from "../Input";
import IconDropdown from "../IconDropdown";
import TransactionTypeToggle from "./TransactionTypeToggle";
import {
  expenseCategoryOptions,
  incomeCategoryOptions,
  paymentMethodOptions,
  categoryMeta,
  paymentMethodMeta,
} from "../../../data/transactions";

function todayFormatted() {
  return new Date().toISOString().split("T")[0];
}

function getInitialState(lockedType) {
  return {
    type: lockedType ?? "Expense",
    amount: "",
    date: todayFormatted(),
    description: "",
    category: "",
    paymentMethod: "",
    notes: "",
  };
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  lockedType, // "Expense" | "Income" | undefined — when set, hides the toggle and fixes the type
}) {
  const [form, setForm] = useState(() => getInitialState(lockedType));

  useEffect(() => {
    if (isOpen) setForm(getInitialState(lockedType));
  }, [isOpen, lockedType]);

  const categoryOptions =
    form.type === "Income" ? incomeCategoryOptions : expenseCategoryOptions;

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleTypeChange = (type) =>
    setForm((prev) => ({ ...prev, type, category: "" }));

  const handleCategoryChange = (category) =>
    setForm((prev) => ({ ...prev, category }));

  const handlePaymentMethodChange = (paymentMethod) =>
    setForm((prev) => ({ ...prev, paymentMethod }));

  const handleClose = () => {
    setForm(getInitialState(lockedType));
    onClose();
  };

  const handleSave = () => {
    onSave?.(form);
    handleClose();
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
        <IconDropdown
          label="Category"
          required
          placeholder="Select category"
          placeholderIcon={Tag}
          value={form.category}
          onChange={handleCategoryChange}
          options={categoryOptions}
          meta={categoryMeta}
        />
      </div>

      <div className="mb-4">
        <IconDropdown
          label="Payment Method"
          required
          placeholder="Select payment method"
          placeholderIcon={CreditCard}
          value={form.paymentMethod}
          onChange={handlePaymentMethodChange}
          options={paymentMethodOptions}
          meta={paymentMethodMeta}
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
          className="flex h-[42px] items-center rounded-lg cursor-pointer border border-slate-200 bg-white px-5 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="flex h-[42px] items-center rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Transaction
        </button>
      </div>
    </Modal>
  );
}