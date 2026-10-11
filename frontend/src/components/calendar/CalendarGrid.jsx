import { useState, useEffect, useMemo } from "react";
import CalendarDayCell from "./CalendarDayCell";
import { EVENT_KIND_STYLES, formatPesoSigned } from "../../data/calendar";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({ weeks, monthLabel = "" }) {
  // Mobile: tapping a day shows its transactions below the grid.
  const todayKey = useMemo(() => {
    for (let wi = 0; wi < weeks.length; wi++) {
      for (let di = 0; di < weeks[wi].length; di++) {
        if (weeks[wi][di].isToday) return `${wi}-${di}`;
      }
    }
    return null;
  }, [weeks]);

  const [selectedKey, setSelectedKey] = useState(todayKey);

  // Reset the selection when the month (or data) changes
  useEffect(() => {
    setSelectedKey(todayKey);
  }, [weeks]); // eslint-disable-line react-hooks/exhaustive-deps

  let selectedDay = null;
  if (selectedKey) {
    const [wi, di] = selectedKey.split("-").map(Number);
    selectedDay = weeks[wi]?.[di] ?? null;
  }

  const monthName = monthLabel.split(" ")[0];
  const heading = selectedDay
    ? selectedDay.inCurrentMonth
      ? `${monthName} ${selectedDay.date}`
      : `Day ${selectedDay.date}`
    : "";

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-100">
        {/* Weekday header */}
        <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/60">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="border-r border-slate-100 py-2 text-center text-[11px] font-semibold text-slate-500 last:border-r-0 md:py-2.5 md:text-[12.5px]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="grid grid-cols-7 border-l border-slate-100">
          {weeks.map((week, wi) =>
            week.map((day, di) => {
              const key = `${wi}-${di}`;
              return (
                <CalendarDayCell
                  key={key}
                  day={day}
                  isSelected={selectedKey === key}
                  onSelect={() => setSelectedKey(key)}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Mobile: selected day details */}
      <div className="mt-4 md:hidden">
        {selectedDay ? (
          <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
            <p className="mb-2.5 text-[13px] font-semibold text-slate-800">{heading}</p>
            {selectedDay.events.length === 0 ? (
              <p className="text-[12.5px] text-slate-400">No transactions on this day.</p>
            ) : (
              <div className="space-y-2.5">
                {selectedDay.events.map((event, i) => {
                  const style = EVENT_KIND_STYLES[event.kind];
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`} />
                      <span className="min-w-0 flex-1 truncate text-[13px] text-slate-600">
                        {event.label}
                      </span>
                      <span className={`shrink-0 text-[13px] font-semibold ${style.text}`}>
                        {formatPesoSigned(event.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-[12.5px] text-slate-400">
            Tap a day to see its transactions.
          </p>
        )}
      </div>
    </>
  );
}