import { Crown, Cloud, Smartphone, Clock, Monitor } from "lucide-react";
import { accountInfo } from "../../data/settings";

function InfoRow({ icon: Icon, iconBg, iconColor, label, value, extra }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <Icon size={16} strokeWidth={2} className={iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] text-slate-500">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-[13.5px] font-semibold text-slate-800">{value}</p>
          {extra}
        </div>
      </div>
    </div>
  );
}

export default function AccountInformationCard() {
  const storagePct = Math.round(
    (accountInfo.storageUsedMb / accountInfo.storageLimitMb) * 100
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-[16px] font-bold text-slate-800">Account Information</h3>
      <p className="mt-0.5 mb-5 text-[13px] text-slate-500">
        View your account details and app version.
      </p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-5">
          <InfoRow
            icon={Crown}
            iconBg="bg-amber-50"
            iconColor="text-amber-500"
            label="Account Type"
            value={accountInfo.accountType}
            extra={
              <button className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11.5px] font-semibold text-indigo-600 transition-colors hover:bg-indigo-100">
                Upgrade to Premium
              </button>
            }
          />

          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50">
                <Cloud size={16} strokeWidth={2} className="text-sky-600" />
              </div>
              <div>
                <p className="text-[12.5px] text-slate-500">Storage Usage</p>
                <p className="text-[13.5px] font-semibold text-slate-800">
                  {accountInfo.storageUsedMb} MB / {accountInfo.storageLimitMb} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pl-12">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${storagePct}%` }}
                />
              </div>
              <span className="text-[12px] text-slate-500">{storagePct}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <InfoRow
            icon={Smartphone}
            iconBg="bg-slate-100"
            iconColor="text-slate-500"
            label="App Version"
            value={accountInfo.appVersion}
          />
          <InfoRow
            icon={Clock}
            iconBg="bg-slate-100"
            iconColor="text-slate-500"
            label="Last Login"
            value={accountInfo.lastLogin}
          />
          <InfoRow
            icon={Monitor}
            iconBg="bg-slate-100"
            iconColor="text-slate-500"
            label="Device"
            value={accountInfo.device}
          />
        </div>
      </div>
    </div>
  );
}