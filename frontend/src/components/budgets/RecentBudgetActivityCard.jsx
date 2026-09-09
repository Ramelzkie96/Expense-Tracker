import { formatPeso } from "../../data/budgets";

export default function RecentBudgetActivityCard({ activity }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">Recent Budget Activity</h3>
        <button className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activity.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.id} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${a.iconBg}`}>
                <Icon size={16} strokeWidth={2} className={a.iconColor} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-slate-800">
                  {a.label}
                </p>
                <p className="text-[12px] text-slate-400">{a.date}</p>
              </div>

              <span
                className={`shrink-0 text-[13.5px] font-semibold ${
                  a.amount < 0 ? "text-rose-500" : "text-emerald-600"
                }`}
              >
                {formatPeso(a.amount)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}