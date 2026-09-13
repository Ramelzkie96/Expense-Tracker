import { useState } from "react";
import { ShieldCheck, Lock, ShieldPlus, ChevronRight } from "lucide-react";

export default function SecurityCard() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
          <ShieldCheck size={16} strokeWidth={2} className="text-slate-500" />
        </div>
        <div>
          <h3 className="text-[14.5px] font-bold text-slate-800">Security</h3>
          <p className="text-[12px] text-slate-500">Keep your account safe and secure.</p>
        </div>
      </div>

      <div className="space-y-1">
        <button className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-slate-50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
            <Lock size={15} strokeWidth={2} className="text-slate-500" />
          </div>
          <span className="flex-1 text-[13.5px] font-semibold text-slate-700">
            Change Password
          </span>
          <ChevronRight size={15} className="text-slate-400" />
        </button>

        <div className="flex items-start gap-3 rounded-xl px-2 py-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
            <ShieldPlus size={15} strokeWidth={2} className="text-slate-500" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[13.5px] font-semibold leading-snug text-slate-700">
              Two-Factor Authentication
            </p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-slate-500">
              Add an extra layer of security.
            </p>
          </div>

          {/* Purely visual toggle — no auth logic wired up */}
          <button
            role="switch"
            aria-checked={twoFactorEnabled}
            onClick={() => setTwoFactorEnabled((v) => !v)}
            className={`mt-0.5 flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
              twoFactorEnabled ? "bg-indigo-600" : "bg-slate-200"
            }`}
          >
            <span
              className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                twoFactorEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}