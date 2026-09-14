import { useState, useEffect, useRef } from "react";
import { ChevronDown, Target, Calendar } from "lucide-react";
import Modal from "../Modal";
import Input from "../Input";
import { budgetCategories, formatPesoPlain } from "../../../data/budgets";

const DESCRIPTION_MAX_LENGTH = 100;

function todayFormatted() {
  return new Date().toISOString().split("T")[0];
}

function endOfMonthFormatted() {
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return end.toISOString().split("T")[0];
}

function getInitialState() {
  return {
    category: "",
    monthlyBudget: "",
    startDate: todayFormatted(),
    endDate: endOfMonthFormatted(),
    description: "",
  };
}

function CategoryDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selected = budgetCategories.find((c) => c.name === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
        Category<span className="ml-0.5 text-rose-500">*</span>
      </label>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 text-[13.5px] text-slate-700 outline-none transition-colors focus:border-indigo-400"
      >
        {selected ? (
          <>
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selected.iconBg}`}>
              <selected.icon size={13} strokeWidth={2} className={selected.iconColor} />
            </div>
            <span className="flex-1 text-left">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-slate-400">Select category</span>
        )}
        <ChevronDown size={15} className="shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {budgetCategories.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onChange(c.name);
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] text-slate-700 transition-colors hover:bg-slate-50"
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${c.iconBg}`}>
                  <Icon size={13} strokeWidth={2} className={c.iconColor} />
                </div>
                {c.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AddBudgetModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(getInitialState);

  useEffect(() => {
    if (isOpen) setForm(getInitialState());
  }, [isOpen]);

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCategoryChange = (category) =>
    setForm((prev) => ({ ...prev, category }));

  const handleDescriptionChange = (e) => {
    const value = e.target.value.slice(0, DESCRIPTION_MAX_LENGTH);
    setForm((prev) => ({ ...prev, description: value }));
  };

  const handleClose = () => {
    setForm(getInitialState());
    onClose();
  };

  const handleSave = () => {
    onSave?.(form);
    handleClose();
  };

  const isValid = form.category && form.monthlyBudget && form.startDate;

  const monthlyLimitValue = Number(form.monthlyBudget) || 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} icon={Target} title="Add Budget">
      <p className="-mt-3 mb-5 text-[13px] text-slate-500">
        Set a spending limit for a category and track your progress.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <CategoryDropdown value={form.category} onChange={handleCategoryChange} />

        <Input
          label="Monthly Budget"
          required
          icon={() => <span className="text-[13px] font-semibold">₱</span>}
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={form.monthlyBudget}
          onChange={updateField("monthlyBudget")}
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          required
          icon={Calendar}
          type="date"
          value={form.startDate}
          onChange={updateField("startDate")}
        />

        <Input
          label="End Date"
          icon={Calendar}
          type="date"
          value={form.endDate}
          onChange={updateField("endDate")}
          labelSuffix={<span className="font-normal text-slate-400"> (Optional)</span>}
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-700">
          Description <span className="font-normal text-slate-400">(Optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Groceries, restaurants, cafe, etc."
          value={form.description}
          onChange={handleDescriptionChange}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[13.5px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
        />
        <p className="mt-1 text-right text-[12px] text-slate-400">
          {form.description.length}/{DESCRIPTION_MAX_LENGTH}
        </p>
      </div>

      {/* Live-updating Monthly Limit summary */}
      <div className="mb-6 flex items-start gap-3 rounded-xl bg-indigo-50/60 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100">
          <Target size={18} strokeWidth={2} className="text-indigo-600" />
        </div>
        <div>
          <p className="text-[13px] text-slate-600">Monthly Limit</p>
          <p className="text-[19px] font-bold text-slate-800">
            {formatPesoPlain(monthlyLimitValue)}
          </p>
          <p className="mt-0.5 text-[12px] text-slate-500">
            You'll be notified when you're close to or over your budget.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleClose}
          className="flex h-[42px] items-center rounded-lg border border-slate-200 bg-white px-5 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="flex h-[42px] items-center rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save Budget
        </button>
      </div>
    </Modal>
  );
}