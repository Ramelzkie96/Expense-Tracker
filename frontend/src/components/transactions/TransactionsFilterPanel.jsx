import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

export default function TransactionsFilterPanel({ dateRange, onApply, onClear }) {
  const [pendingRange, setPendingRange] = useState(dateRange);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Keep local pending selection in sync if the parent's applied range
  // changes from elsewhere (e.g. a "Clear All" button on the page).
  useEffect(() => {
    setPendingRange(dateRange);
  }, [dateRange]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const label = (() => {
    if (pendingRange?.from && pendingRange?.to) {
      return `${format(pendingRange.from, "MMM d")} – ${format(
        pendingRange.to,
        "MMM d, yyyy"
      )}`;
    }
    if (pendingRange?.from) {
      return format(pendingRange.from, "MMM d, yyyy");
    }
    return "Select date range";
  })();

  const handleApply = () => {
    onApply(pendingRange);
    setIsOpen(false);
  };

  const handleClear = () => {
    setPendingRange(undefined);
    onClear();
    setIsOpen(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[15px] font-bold text-slate-800">Filters</h3>
        <button
          onClick={handleClear}
          className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700"
        >
          Clear
        </button>
      </div>

      <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-600">
        Date Range
      </label>

      <div className="relative" ref={popoverRef}>
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="mb-4 flex h-[38px] w-full items-center gap-2 rounded-lg border border-slate-200 px-3 text-left text-[12.5px] text-slate-600 transition-colors hover:bg-slate-50"
        >
          <Calendar size={14} className="shrink-0 text-slate-400" />
          <span className="truncate">{label}</span>
        </button>

        {isOpen && (
          <div className="absolute left-0 top-[42px] z-30 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
            <DayPicker
              mode="range"
              selected={pendingRange}
              onSelect={setPendingRange}
              numberOfMonths={1}
              defaultMonth={pendingRange?.from ?? new Date()}
            />
          </div>
        )}
      </div>

      <button
        onClick={handleApply}
        className="h-[42px] w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
      >
        Apply
      </button>
    </div>
  );
}