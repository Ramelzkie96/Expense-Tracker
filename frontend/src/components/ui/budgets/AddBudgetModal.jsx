import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import * as LucideIcons from "lucide-react";
import { ChevronDown, Target, Calendar } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import Modal from "../Modal";
import Input from "../Input";
import { useSupabaseClient } from "../../../hooks/useSupabaseClient";
import { getCategories } from "../../../services/categories";
import { upsertBudget } from "../../../services/budgets";
import { formatPesoPlain } from "../../../data/budgets";

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
    category: null, // full category object from Supabase: { id, name, icon_name, icon_bg, icon_color, type }
    monthlyBudget: "",
    startDate: todayFormatted(),
    endDate: endOfMonthFormatted(),
    description: "",
  };
}

function CategoryDropdown({ value, onChange, categories, isLoading }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

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
        disabled={isLoading}
        className="flex h-[42px] w-full items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-3 text-[13.5px] text-slate-700 outline-none transition-colors focus:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {value ? (
          <>
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${value.icon_bg}`}
            >
              <value.Icon size={13} strokeWidth={2} className={value.icon_color} />
            </div>
            <span className="flex-1 text-left">{value.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-slate-400">
            {isLoading ? "Loading categories..." : "Select category"}
          </span>
        )}
        <ChevronDown size={15} className="shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
          {categories.length === 0 ? (
            <p className="px-3 py-2.5 text-[13px] text-slate-400">
              No expense categories found.
            </p>
          ) : (
            categories.map((c) => {
              const Icon = c.Icon;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    onChange(c);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-[13.5px] text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${c.icon_bg}`}
                  >
                    <Icon size={13} strokeWidth={2} className={c.icon_color} />
                  </div>
                  {c.name}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function AddBudgetModal({ isOpen, onClose, onSave }) {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [form, setForm] = useState(getInitialState);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch expense categories (you don't budget income) when the modal opens
  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setIsLoadingCategories(true);

    getCategories(supabase)
      .then((rows) => {
        if (cancelled) return;
        const expenseCategories = rows
          .filter((c) => c.type === "expense")
          .map((c) => ({
            ...c,
            // Resolve the icon name once here, same convention as transactionMapper
            Icon: LucideIcons[c.icon_name] ?? LucideIcons.Tag,
          }));
        setCategories(expenseCategories);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        toast.error("Failed to load categories. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCategories(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, supabase]);

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

  const handleSave = async () => {
    if (!user) {
      toast.error("You must be signed in to save a budget.");
      return;
    }

    setIsSaving(true);
    try {
      const saved = await upsertBudget(supabase, user.id, {
        categoryId: form.category.id,
        monthlyBudget: parseFloat(form.monthlyBudget),
        startDate: form.startDate,
        endDate: form.endDate || null,
        description: form.description || null,
      });

      onSave?.(saved);
      toast.success("Budget saved.");
      handleClose();
    } catch (err) {
      console.error("Failed to save budget:", err);
      toast.error("Failed to save budget. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isValid = form.category && form.monthlyBudget && form.startDate;

  const monthlyLimitValue = Number(form.monthlyBudget) || 0;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} icon={Target} title="Add Budget">
      <p className="-mt-3 mb-5 text-[13px] text-slate-500">
        Set a spending limit for a category and track your progress.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <CategoryDropdown
          value={form.category}
          onChange={handleCategoryChange}
          categories={categories}
          isLoading={isLoadingCategories}
        />

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
          disabled={isSaving}
          className="flex h-[42px] items-center rounded-lg border border-slate-200 bg-white px-5 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!isValid || isSaving}
          className="flex h-[42px] items-center rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Budget"}
        </button>
      </div>
    </Modal>
  );
}