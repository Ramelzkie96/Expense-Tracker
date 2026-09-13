import { HelpCircle, ExternalLink } from "lucide-react";

export default function NeedHelpCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50">
          <HelpCircle size={16} strokeWidth={2} className="text-indigo-600" />
        </div>
        <div>
          <h3 className="text-[14.5px] font-bold text-slate-800">Need Help?</h3>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
            Visit our Help Center for guides and support.
          </p>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-[13px] font-semibold text-indigo-600 transition-colors hover:bg-slate-50">
        Go to Help Center
        <ExternalLink size={14} />
      </button>
    </div>
  );
}