import { ChevronRight } from "lucide-react";
import { quickActions } from "../../data/recurring";

export default function QuickActionsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[15px] font-bold text-slate-800">Quick Actions</h3>

      <div className="space-y-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors hover:bg-slate-50"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${action.iconBg}`}>
                <Icon size={18} strokeWidth={2} className={action.iconColor} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-slate-800">
                  {action.title}
                </p>
                <p className="truncate text-[12px] text-slate-500">{action.subtitle}</p>
              </div>

              <ChevronRight size={16} className="shrink-0 text-slate-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
}