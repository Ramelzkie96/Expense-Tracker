import { budgetProgress, formatPesoPlain } from "../../data/analytics";

export default function BudgetProgressList() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">Budget Progress</h3>
        <button className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {budgetProgress.map((b) => {
          const Icon = b.icon;
          return (
            <div key={b.id}>
              <div className="mb-1.5 flex items-center gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${b.iconBg}`}>
                  <Icon size={14} strokeWidth={2} className={b.iconColor} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-slate-800">{b.name}</p>
                  <p className="text-[12px] text-slate-500">
                    {formatPesoPlain(b.spent)} / {formatPesoPlain(b.budget)}
                  </p>
                </div>
                <span className="shrink-0 text-[12.5px] font-semibold text-slate-600">
                  {b.pct}%
                </span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${b.pct}%`, backgroundColor: b.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}