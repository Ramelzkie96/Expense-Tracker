import { ArrowRight } from "lucide-react";
import { legendItems, EVENT_KIND_STYLES } from "../../data/calendar";

export default function CalendarLegend() {
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-5">
        {legendItems.map((item) => (
          <span key={item.kind} className="flex items-center gap-1.5 text-[12.5px] text-slate-600">
            <span className={`h-2.5 w-2.5 rounded-full ${EVENT_KIND_STYLES[item.kind].dot}`} />
            {item.label}
          </span>
        ))}
      </div>

      <button className="flex items-center gap-1 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">
        View All Transactions
        <ArrowRight size={14} />
      </button>
    </div>
  );
}