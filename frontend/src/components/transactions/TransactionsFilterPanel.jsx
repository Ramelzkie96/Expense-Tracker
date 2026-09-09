import { Calendar, ChevronDown } from "lucide-react";

function FilterField({ label, children }) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectBox({ value }) {
  return (
    <button className="flex h-[38px] w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-[12.5px] text-slate-600 transition-colors hover:bg-slate-50">
      {value}
      <ChevronDown size={14} className="text-slate-400" />
    </button>
  );
}

export default function TransactionsFilterPanel() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">Filters</h3>
        <button className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
          Clear All
        </button>
      </div>

      <FilterField label="Date Range">
        <div className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 px-3 text-[12.5px] text-slate-600">
          <Calendar size={14} className="shrink-0 text-slate-400" />
          <span className="truncate">Sep 1 – Sep 30, 2026</span>
        </div>
      </FilterField>

      <FilterField label="Type">
        <SelectBox value="All Types" />
      </FilterField>

      <FilterField label="Category">
        <SelectBox value="All Categories" />
      </FilterField>

      <FilterField label="Payment Method">
        <SelectBox value="All Methods" />
      </FilterField>

      <button className="mt-1 h-[42px] w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95">
        Apply Filters
      </button>
    </div>
  );
}