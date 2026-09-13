import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SettingsTabs from "../components/settings/SettingsTabs";
import ProfileInformationCard from "../components/settings/ProfileInformationCard";
import QuickActionsCard from "../components/settings/QuickActionsCard";
import AccountInformationCard from "../components/settings/AccountInformationCard";
import FinanceTipBanner from "../components/settings/FinanceTipBanner";
import StorageBackupCard from "../components/settings/StorageBackupCard";
import SecurityCard from "../components/settings/SecurityCard";
import NeedHelpCard from "../components/settings/NeedHelpCard";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <DashboardLayout>
      <div className="flex items-start gap-6">
        {/* Tabs */}
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main column */}
        <div className="min-w-0 flex-1 space-y-6">
          {activeTab === "profile" ? (
            <>
              <ProfileInformationCard />
              <QuickActionsCard />
              <AccountInformationCard />
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-[13.5px] text-slate-500">
                This section hasn't been built yet.
              </p>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 space-y-5">
          <FinanceTipBanner />
          <StorageBackupCard />
          <SecurityCard />
          <NeedHelpCard />
        </div>
      </div>
    </DashboardLayout>
  );
}