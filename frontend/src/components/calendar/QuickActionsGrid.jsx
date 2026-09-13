import { quickActions } from "../../data/calendar";

export default function QuickActionsGrid() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[15px] font-bold text-slate-800">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-4 text-center transition-colors hover:bg-slate-100"
            >
              <Icon size={20} strokeWidth={2} className={action.iconColor} />
              <span className="text-[12.5px] font-semibold text-slate-700">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}