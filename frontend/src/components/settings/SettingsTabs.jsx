import { User, SlidersHorizontal, Coins, Bell, Palette } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  { id: "currency", label: "Currency", icon: Coins },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsTabs({ activeTab, onTabChange }) {
  return (
    <div className="w-[200px] shrink-0 space-y-1 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13.5px] font-semibold transition-colors ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Icon
              size={17}
              strokeWidth={2}
              className={isActive ? "text-indigo-600" : "text-slate-400"}
            />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}