import { useState, useEffect, useRef } from "react";
import {
  Search,
  SlidersHorizontal,
  Tag,
  CreditCard,
  Filter,
  ChevronDown,
  Check,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useSupabaseClient } from "../../hooks/useSupabaseClient";
import { getCategories, getPaymentMethods } from "../../services/categories";

const TYPE_OPTIONS = ["Income", "Expense"];

function Dropdown({
  icon: Icon,
  label,
  options,
  value,
  onChange,
  getOptionLabel = (o) => o,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside the dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayLabel = value ? getOptionLabel(value) : label;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex h-[38px] w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto sm:px-3.5"
      >
        <Icon size={15} strokeWidth={2} className="shrink-0 text-slate-400" />
        <span className="min-w-0 flex-1 truncate text-left sm:flex-none">
          {displayLabel}
        </span>
        <ChevronDown size={14} strokeWidth={2} className="shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-20 mt-1.5 max-h-64 min-w-[11rem] overflow-y-auto sm:right-auto sm:w-52 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {/* "All" option clears this filter */}
          <button
            onClick={() => {
              onChange(null);
              setIsOpen(false);
            }}
            className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-slate-600 hover:bg-slate-50"
          >
            All {label}
            {!value && <Check size={14} className="text-indigo-600" />}
          </button>

          {options.length === 0 ? (
            <p className="px-3 py-2 text-[12.5px] text-slate-400">
              No options found.
            </p>
          ) : (
            options.map((opt, i) => {
              const optLabel = getOptionLabel(opt);
              const isSelected = value && getOptionLabel(value) === optLabel;
              return (
                <button
                  key={i}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-slate-600 hover:bg-slate-50"
                >
                  {optLabel}
                  {isSelected && <Check size={14} className="text-indigo-600" />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default function TransactionsToolbar({
  search,
  onSearchChange,
  type,
  onTypeChange,
  category,
  onCategoryChange,
  paymentMethod,
  onPaymentMethodChange,
  showTypeFilter = true,
}) {
  const supabase = useSupabaseClient();
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    if (!user) return;
    Promise.all([getCategories(supabase), getPaymentMethods(supabase)])
      .then(([cats, methods]) => {
        setCategories(cats);
        setPaymentMethods(methods);
      })
      .catch((err) => console.error("Failed to load filter options:", err));
  }, [supabase, user]);

  return (
    <div className="mb-5 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center">
      <div className="relative col-span-2 min-w-0 sm:min-w-[220px] sm:flex-1">
        <Search
          size={15}
          strokeWidth={2}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search transactions..."
          className="h-[38px] w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
        />
      </div>

      {showTypeFilter && (
        <Dropdown
          icon={SlidersHorizontal}
          label="Types"
          options={TYPE_OPTIONS}
          value={type}
          onChange={onTypeChange}
        />
      )}

      <Dropdown
        icon={Tag}
        label="Categories"
        options={categories}
        value={category}
        onChange={onCategoryChange}
        getOptionLabel={(c) => c.name}
      />

      <Dropdown
        icon={CreditCard}
        label="Methods"
        options={paymentMethods}
        value={paymentMethod}
        onChange={onPaymentMethodChange}
        getOptionLabel={(m) => m.name}
      />

      <button className="flex h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto">
        <Filter size={15} strokeWidth={2} className="text-slate-400" />
        More Filters
      </button>
    </div>
  );
}