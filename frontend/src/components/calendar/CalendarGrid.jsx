import CalendarDayCell from "./CalendarDayCell";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ weeks }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100">
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/60">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="border-r border-slate-100 py-2.5 text-center text-[12.5px] font-semibold text-slate-500 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Weeks */}
      <div className="grid grid-cols-7 border-l border-slate-100">
        {weeks.map((week, wi) =>
          week.map((day, di) => (
            <CalendarDayCell key={`${wi}-${di}`} day={day} />
          ))
        )}
      </div>
    </div>
  );
}