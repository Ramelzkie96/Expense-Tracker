import { CalendarClock } from "lucide-react";

export default function StayOnTrackCard() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
      <div className="min-w-0 flex-1">
        <h3 className="text-[14px] font-bold text-slate-800">Stay on Track</h3>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
          Recurring transactions help you plan ahead and keep your finances on track.
        </p>
      </div>

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
        <CalendarClock size={20} strokeWidth={2} className="text-indigo-600" />
      </div>
    </div>
  );
}