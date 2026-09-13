import { ArrowRight } from "lucide-react";
import { upcomingPayments, formatPesoPlain } from "../../data/calendar";

export default function UpcomingPaymentsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">Upcoming Payments</h3>
        <button className="flex items-center gap-1 text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
          View All
          <ArrowRight size={13} />
        </button>
      </div>

      <div className="space-y-4">
        {upcomingPayments.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${p.iconBg}`}>
                <Icon size={16} strokeWidth={2} className={p.iconColor} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold text-slate-800">{p.label}</p>
                <p className={`text-[12.5px] font-medium ${p.iconColor}`}>
                  {formatPesoPlain(p.amount)}
                </p>
              </div>

              <span className="shrink-0 text-[12px] text-slate-400">{p.date}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}