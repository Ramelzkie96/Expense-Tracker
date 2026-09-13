import { Sprout, Wallet } from "lucide-react";

export default function FinanceTipBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
      <div className="mb-1 flex items-center gap-2">
        <Sprout size={18} strokeWidth={2} className="text-indigo-600" />
        <h3 className="text-[14.5px] font-bold text-slate-800">
          Keep your finances on track!
        </h3>
      </div>

      <p className="mb-4 text-[12.5px] leading-relaxed text-slate-600">
        Set your preferences, customize your experience, and make the most out
        of your expense tracker.
      </p>

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
        <Wallet size={22} strokeWidth={2} className="text-white" />
      </div>
    </div>
  );
}