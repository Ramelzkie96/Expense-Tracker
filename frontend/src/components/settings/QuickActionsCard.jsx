import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { toast } from "sonner";
import { quickActions } from "../../data/settings";

export default function QuickActionsCard() {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleActionClick = async (action) => {
    switch (action) {
      case "logout":
        try {
          await signOut();
          toast.success("Logged out successfully.");
          navigate("/login");
        } catch (err) {
          toast.error("Failed to log out. Please try again.");
        }
        break;
      case "export":
        // TODO: wire up real export logic
        console.log("Export Data clicked");
        break;
      case "backup":
        // TODO: wire up real backup logic
        console.log("Backup Data clicked");
        break;
      case "delete":
        // TODO: wire up real delete-account logic (should confirm first!)
        console.log("Delete Account clicked");
        break;
      default:
        break;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-[16px] font-bold text-slate-800">Quick Actions</h3>
      <p className="mt-0.5 mb-5 text-[13px] text-slate-500">
        Manage your account and data.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.action)}
              className="flex cursor-pointer flex-col items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 text-left transition-colors hover:bg-slate-100"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${action.iconBg}`}>
                <Icon size={16} strokeWidth={2} className={action.iconColor} />
              </div>
              <div>
                <p className="text-[13.5px] font-semibold text-slate-800">{action.title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-slate-500">
                  {action.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}