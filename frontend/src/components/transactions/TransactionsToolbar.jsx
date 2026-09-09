import {Search,SlidersHorizontal,Tag,CreditCard,Filter,ChevronDown,} from "lucide-react";

function ToolbarDropdown({ icon: Icon, label, caret = true }) {
  return (
    <button className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50">
      <Icon size={15} strokeWidth={2} className="text-slate-400" />
      {label}
      {caret && <ChevronDown size={14} strokeWidth={2} className="text-slate-400" />}
    </button>
  );
}

export default function TransactionsToolbar({ search, onSearchChange }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5">
      <div className="relative min-w-[220px] flex-1">
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

      <ToolbarDropdown icon={SlidersHorizontal} label="Type" />
      <ToolbarDropdown icon={Tag} label="Category" />
      <ToolbarDropdown icon={CreditCard} label="Payment Method" />
      <ToolbarDropdown icon={Filter} label="More Filters" caret={false} />
    </div>
  );
}