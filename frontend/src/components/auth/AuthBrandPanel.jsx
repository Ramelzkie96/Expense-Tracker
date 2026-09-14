import { Wallet } from "lucide-react";
import { authFeatures } from "../../data/auth";

export default function AuthBrandPanel() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-l-2xl bg-indigo-50/40 p-8 lg:w-[320px]">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 shadow-sm">
          <Wallet size={18} strokeWidth={2.2} className="text-white" />
        </div>
        <span className="text-[17px] font-bold tracking-[-0.3px] text-slate-800">
          Expense Tracker
        </span>
      </div>

      <p className="mb-8 text-[14px] leading-relaxed text-slate-600">
        Take control of your money, build a better tomorrow.
      </p>

      {/* Illustration placeholder — swap src for your actual asset */}
      <div className="mb-10 flex flex-1 items-center justify-center">
        <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full bg-white/60">
          <Wallet size={64} strokeWidth={1.5} className="text-indigo-300" />
        </div>
      </div>

      <div className="space-y-5">
        {authFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.id} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                <Icon size={16} strokeWidth={2} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-800">{feature.title}</p>
                <p className="text-[12px] text-slate-500">{feature.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative wave at the bottom, matching the mockup */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-indigo-100/60 to-transparent" />
    </div>
  );
}