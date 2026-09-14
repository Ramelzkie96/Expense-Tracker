import { MinusCircle, PlusCircle } from "lucide-react";

export default function TransactionTypeToggle({ type, onTypeChange }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onTypeChange("Expense")}
        className={`flex h-[44px] items-center justify-center gap-2 rounded-lg text-[13.5px] font-semibold transition-colors ${
          type === "Expense"
            ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm"
            : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }`}
      >
        <MinusCircle size={16} strokeWidth={2} />
        Expense
      </button>

      <button
        type="button"
        onClick={() => onTypeChange("Income")}
        className={`flex h-[44px] items-center justify-center gap-2 rounded-lg text-[13.5px] font-semibold transition-colors ${
          type === "Income"
            ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm"
            : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
        }`}
      >
        <PlusCircle size={16} strokeWidth={2} />
        Income
      </button>
    </div>
  );
}