import { MapPin } from "lucide-react";
import { quickInsights } from "../../data/analytics";

export default function QuickInsightsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-[15px] font-bold text-slate-800">
          <MapPin size={15} className="text-indigo-600" />
          Quick Insights
        </h3>
        <button className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {quickInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="flex items-start gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${insight.iconBg}`}>
                <Icon size={16} strokeWidth={2} className={insight.iconColor} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-snug text-slate-700">
                  {insight.title}
                </p>
                <p className="mt-0.5 text-[12px] text-slate-400">{insight.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}