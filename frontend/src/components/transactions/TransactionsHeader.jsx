import { Download, Plus, ChevronDown } from "lucide-react";

export default function TransactionsHeader({
  title = "All Transactions",
  subtitle = "Manage all your income and expenses",
  addButtonLabel = "Add Transaction",
  onAddTransaction,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="text-[17px] font-bold text-slate-800">{title}</h2>
        <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>
      </div>

      <div className="flex w-full items-center gap-2.5 sm:w-auto">
        <button
          onClick={onAddTransaction}
          className="flex h-[38px] w-full items-center justify-center gap-2 cursor-pointer sm:w-auto rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 pl-3.5 pr-2.5 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
        >
          <Plus size={15} strokeWidth={2.4} />
          {addButtonLabel}
          <ChevronDown size={14} strokeWidth={2.4} className="ml-1 opacity-80" />
        </button>
      </div>
    </div>
  );
}