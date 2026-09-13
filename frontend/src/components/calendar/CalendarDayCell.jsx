import { EVENT_KIND_STYLES, formatPesoSigned } from "../../data/calendar";

const MAX_VISIBLE_EVENTS = 3;

export default function CalendarDayCell({ day }) {
  const visibleEvents = day.events.slice(0, MAX_VISIBLE_EVENTS);
  const overflowCount = day.events.length - visibleEvents.length;

  return (
    <div
      className={`min-h-[110px] border-b border-r border-slate-100 p-2.5 ${
        day.inCurrentMonth ? "bg-white" : "bg-slate-50/50"
      }`}
    >
      <span
        className={`mb-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[13px] font-semibold ${
          day.isToday
            ? "bg-indigo-600 text-white"
            : day.inCurrentMonth
            ? "text-slate-700"
            : "text-slate-300"
        }`}
      >
        {day.date}
      </span>

      <div className="space-y-1.5">
        {visibleEvents.map((event, i) => {
          const style = EVENT_KIND_STYLES[event.kind];
          return (
            <div key={i}>
              <div className="flex items-center gap-1.5 text-[11.5px] leading-tight">
                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                <span className="min-w-0 flex-1 truncate text-slate-600">{event.label}</span>
              </div>
              <p className={`pl-3 text-[11.5px] font-semibold ${style.text}`}>
                {formatPesoSigned(event.amount)}
              </p>
            </div>
          );
        })}

        {overflowCount > 0 && (
          <p className="pl-3 text-[11px] font-medium text-slate-400">
            +{overflowCount} more
          </p>
        )}
      </div>
    </div>
  );
}