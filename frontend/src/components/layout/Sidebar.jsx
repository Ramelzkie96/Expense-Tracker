import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  WalletCards,
  RefreshCw,
  BarChart3,
  CalendarDays,
  FileText,
  Settings,
  ChevronDown,
  Wallet,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Transactions",
    icon: ArrowLeftRight,
    path: "/transactions",
  },
  {
    label: "Budgets",
    icon: WalletCards,
    path: "/budgets",
  },

  {
    label: "Calendar",
    icon: CalendarDays,
    path: "/calendar",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const transactionSubItems = [
  {
    label: "All Transactions",
    path: "/transactions",
  },
  {
    label: "Expenses",
    path: "/transactions/expenses",
  },
  {
    label: "Income",
    path: "/transactions/income",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsMenuOpen(false);

    // Write this FIRST, synchronously, before calling signOut() at all.
    // signOut() triggers a full document reload to /login, which destroys
    // all JS state — but sessionStorage survives a page reload, so as long
    // as this line runs before the reload starts, the value will still be
    // there once the new page loads.
    sessionStorage.setItem("toast:success", "Logged out successfully.");

    try {
      await signOut();
    } catch (err) {
      sessionStorage.setItem("toast:error", "Failed to log out. Please try again.");
      sessionStorage.removeItem("toast:success");
      navigate("/login");
    }
  };

  const isTransactionsActive =
    location.pathname === "/transactions" ||
    location.pathname.startsWith("/transactions/");

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[242px] flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-[82px] shrink-0 items-center border-b border-slate-100 px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 shadow-sm">
            <Wallet size={19} strokeWidth={2.2} className="text-white" />
          </div>
          <span className="text-[17px] font-bold tracking-[-0.3px] text-slate-800">
            Expense Tracker
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-scrollbar flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            if (item.label === "Transactions") {
              return (
                <div key={item.label}>
                  <NavLink
                    to={item.path}
                    className={`
                      group flex h-[45px] items-center gap-3
                      rounded-[10px] px-3.5
                      text-[14px] font-semibold
                      transition-all duration-200
                      ${
                        isTransactionsActive
                          ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm"
                          : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                      }
                    `}
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className={`
                        transition-colors duration-200
                        ${
                          isTransactionsActive
                            ? "text-white"
                            : "text-slate-500 group-hover:text-indigo-600"
                        }
                      `}
                    />
                    <span>{item.label}</span>
                  </NavLink>

                  {isTransactionsActive && (
                    <div className="relative ml-[27px] mt-1 mb-2">
                      <div className="absolute left-[2px] top-[8px] bottom-[8px] w-px bg-slate-200" />
                      <div className="space-y-0.5">
                        {transactionSubItems.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            end={subItem.path === "/transactions"}
                            className={({ isActive }) => `
                              group relative flex h-[40px] items-center
                              pl-[26px] pr-3
                              text-[13px] font-medium
                              transition-colors duration-150
                              ${
                                isActive
                                  ? "text-indigo-600"
                                  : "text-slate-500 hover:text-slate-800"
                              }
                            `}
                          >
                            {({ isActive }) => (
                              <>
                                <span
                                  className={`
                                    absolute left-0
                                    h-[6px] w-[6px]
                                    rounded-full
                                    transition-all duration-150
                                    ${
                                      isActive
                                        ? "bg-indigo-500"
                                        : "bg-slate-300 group-hover:bg-slate-400"
                                    }
                                  `}
                                />
                                <span className={isActive ? "font-semibold" : "font-medium"}>
                                  {subItem.label}
                                </span>
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `
                  group flex h-[45px] items-center gap-3
                  rounded-[10px] px-3.5
                  text-[14px] font-semibold
                  transition-all duration-150
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className={`
                        transition-colors duration-150
                        ${
                          isActive
                            ? "text-white"
                            : "text-slate-500 group-hover:text-indigo-600"
                        }
                      `}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="shrink-0 px-4 pb-4">
        <div className="relative border-t border-slate-100 pt-4" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            className="flex w-full items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200">
              {isLoaded && user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName ?? "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full animate-pulse bg-slate-200" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-bold text-slate-800">
                {isLoaded ? user?.fullName || user?.username || "My Account" : "Loading..."}
              </p>
              <p className="truncate text-[10px] text-slate-500">
                {isLoaded ? user?.primaryEmailAddress?.emailAddress ?? "" : ""}
              </p>
            </div>
            <ChevronDown
              size={16}
              className={`shrink-0 text-slate-500 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute bottom-full left-0 mb-1.5 w-full overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
            >
              <NavLink
                to="/settings"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <UserIcon size={14} className="text-slate-400" />
                Account Settings
              </NavLink>
              <button
                type="button"
                role="menuitem"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] font-medium text-rose-500 transition-colors hover:bg-rose-50"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}