import { ChevronDown } from "lucide-react";

export default function TransactionsSummaryPanel({
  totalIncome,
  totalExpenses,
  netTotal,
  savedPct,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">Summary</h3>
        <button className="flex items-center gap-1 text-[12.5px] font-medium text-slate-500 hover:text-slate-700">
          This Month
          <ChevronDown size={13} />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-slate-500">Total Income</span>
          <span className="text-[14px] font-bold text-emerald-600">
            ₱{totalIncome.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-slate-500">Total Expenses</span>
          <span className="text-[14px] font-bold text-rose-500">
            ₱{totalExpenses.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="border-t border-slate-100 pt-3">
          <span className="block text-[13px] text-slate-500">Net Total</span>
          <span className="text-[19px] font-bold text-slate-800">
            ₱{netTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Gauge */}
      <div className="mt-5 flex flex-col items-center">
        <svg width="150" height="90" viewBox="0 0 150 90">
          <path
            d="M 15 85 A 60 60 0 0 1 135 85"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M 15 85 A 60 60 0 0 1 135 85"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(savedPct / 100) * 188.5} 188.5`}
          />
        </svg>
        <p className="-mt-6 text-[20px] font-bold text-slate-800">{savedPct}%</p>
        <p className="text-[12px] text-slate-500">of income saved</p>
      </div>
    </div>
  );
}