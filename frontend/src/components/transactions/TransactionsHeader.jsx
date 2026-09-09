import { Download, Plus, ChevronDown } from "lucide-react";

export default function TransactionsHeader({
  title = "All Transactions",
  subtitle = "Manage all your income and expenses",
}) {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h2 className="text-[17px] font-bold text-slate-800">{title}</h2>
        <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2.5">
        <button className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50">
          <Download size={15} strokeWidth={2.2} />
          Export
        </button>
        <button className="flex h-[38px] items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 pl-3.5 pr-2.5 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95">
          <Plus size={15} strokeWidth={2.4} />
          Add Transaction
          <ChevronDown size={14} strokeWidth={2.4} className="ml-1 opacity-80" />
        </button>
      </div>
    </div>
  );
}