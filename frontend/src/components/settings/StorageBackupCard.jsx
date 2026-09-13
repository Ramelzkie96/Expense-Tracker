import { HardDrive, CheckCircle2, Cloud, ChevronRight } from "lucide-react";
import { backupInfo } from "../../data/settings";

export default function StorageBackupCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
          <HardDrive size={16} strokeWidth={2} className="text-slate-500" />
        </div>
        <h3 className="text-[14.5px] font-bold text-slate-800">Storage & Backup</h3>
      </div>

      <p className="mb-4 text-[12.5px] leading-relaxed text-slate-500">
        Your data is automatically saved, but you can also create a backup for
        extra security.
      </p>

      {backupInfo.autoBackupEnabled && (
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-semibold text-emerald-600">
          <CheckCircle2 size={13} strokeWidth={2.4} />
          Auto Backup Enabled
        </div>
      )}

      <div className="mb-4">
        <p className="text-[12px] text-slate-500">Last Backup</p>
        <p className="text-[13px] font-semibold text-slate-700">{backupInfo.lastBackup}</p>
      </div>

      <button className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50">
        <span className="flex items-center gap-2">
          <Cloud size={15} strokeWidth={2} className="text-slate-500" />
          Manage Backup
        </span>
        <ChevronRight size={15} className="text-slate-400" />
      </button>
    </div>
  );
}