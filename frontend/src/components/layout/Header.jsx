import { CalendarDays, Bell, Moon, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { pageMeta, defaultPageMeta } from "../../config/pageMeta";

export default function Header() {
  const location = useLocation();
  const meta = pageMeta[location.pathname] ?? defaultPageMeta;

  return (
    <header className="flex h-[88px] items-center justify-between border-b border-slate-100 bg-[#f8f9fc] px-8">
      {/* Page Title */}
      <div>
        <h1 className="text-[22px] font-bold tracking-[-0.4px] text-slate-900">
          {meta.title}
        </h1>

        {meta.subtitle && (
          <p className="mt-0.5 text-[14px] text-slate-600">{meta.subtitle}</p>
        )}

        {meta.breadcrumbs && (
          <div className="mt-0.5 flex items-center gap-2 text-[13px] text-slate-500">
            {meta.breadcrumbs.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-2">
                {i > 0 && <span className="text-slate-300">›</span>}
                <span className={i === meta.breadcrumbs.length - 1 ? "text-slate-700" : ""}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        {/* Month Selector */}
        <button className="flex h-[44px] min-w-[204px] items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 shadow-sm transition hover:border-slate-300">
          <CalendarDays size={18} strokeWidth={1.8} className="text-slate-600" />
          <span className="flex-1 text-left text-[13px] font-semibold text-slate-700">
            September 2026
          </span>
          <ChevronDown size={16} className="text-slate-500" />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <Bell size={19} strokeWidth={1.8} />
        </button>

        {/* Dark Mode */}
        <button
          aria-label="Toggle dark mode"
          className="flex h-[44px] w-[44px] items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <Moon size={19} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}