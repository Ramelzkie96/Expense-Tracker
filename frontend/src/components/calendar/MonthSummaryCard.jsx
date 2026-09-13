import { ArrowUp, ArrowDown, Wallet, Percent, ArrowRight } from "lucide-react";
import { monthSummary, formatPesoPlain } from "../../data/calendar";

const rows = [
  {
    key: "income",
    label: "Income",
    icon: ArrowUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    key: "expenses",
    label: "Expenses",
    icon: ArrowDown,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
  {
    key: "savings",
    label: "Savings",
    icon: Wallet,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    key: "savingsRate",
    label: "Savings Rate",
    icon: Percent,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    isPercent: true,
  },
];

export default function MonthSummaryCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">This Month Summary</h3>
        <button className="flex items-center gap-1 text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
          View Report
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="space-y-3.5">
        {rows.map((row) => {
          const Icon = row.icon;
          const value = monthSummary[row.key];
          return (
            <div key={row.key} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${row.iconBg}`}>
                <Icon size={16} strokeWidth={2} className={row.iconColor} />
              </div>
              <span className="flex-1 text-[13px] text-slate-600">{row.label}</span>
              <span className="text-[13.5px] font-bold text-slate-800">
                {row.isPercent ? value : formatPesoPlain(value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}