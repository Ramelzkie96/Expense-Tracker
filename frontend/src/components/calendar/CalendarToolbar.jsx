import { ChevronLeft, ChevronRight } from "lucide-react";

const VIEWS = ["Month", "Week", "Day"];

export default function CalendarToolbar({
  monthLabel,
  onPrevMonth,
  onNextMonth,
  view,
  onViewChange,
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <h2 className="text-[18px] font-bold text-slate-800">{monthLabel}</h2>
      </div>

      <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1">
        {VIEWS.map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v)}
            className={`rounded-md px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              view === v
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}