import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { formatPeso } from "../../data/transactions";

const MENU_HEIGHT = 92; // approx. height, used to decide whether to open upward

export default function TransactionRow({ transaction: t, onEdit, onDelete }) {
  const CategoryIcon = t.icon;
  const MethodIcon = t.methodIcon.type === "icon" ? t.methodIcon.Icon : null;

  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPos, setMenuPos] = useState(null); // null = closed
  const isMenuOpen = menuPos !== null;

  const closeMenu = () => setMenuPos(null);

  const toggleMenu = () => {
    if (isMenuOpen) return closeMenu();

    const rect = buttonRef.current.getBoundingClientRect();
    const openUp = rect.bottom + MENU_HEIGHT > window.innerHeight;
    setMenuPos({
      right: window.innerWidth - rect.right,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  };

  // Close on outside click, Escape, scroll, or resize
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleMouseDown(e) {
      if (
        menuRef.current?.contains(e.target) ||
        buttonRef.current?.contains(e.target)
      ) {
        return;
      }
      closeMenu();
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") closeMenu();
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", closeMenu, true);
    window.addEventListener("resize", closeMenu);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", closeMenu, true);
      window.removeEventListener("resize", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <p className="text-[13px] font-medium text-slate-700">{t.date}</p>
        <p className="text-[12px] text-slate-400">{t.time}</p>
      </td>

      <td className="py-4 pr-4 align-top">
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-slate-800">
            {t.title}
          </p>
          <p className="truncate text-[12px] text-slate-400">{t.subtitle}</p>
        </div>
      </td>

      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full ${t.categoryBg} px-2.5 py-1 text-[12px] font-medium ${t.categoryColor}`}
        >
          <CategoryIcon size={12} strokeWidth={2} />
          {t.category}
        </span>
      </td>

      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
          {t.methodIcon.type === "image" ? (
            <img
              src={t.methodIcon.src}
              alt={t.method}
              className="h-4 w-4 object-contain"
            />
          ) : t.methodIcon.type === "icon" ? (
            <MethodIcon size={14} strokeWidth={2} className="text-slate-500" />
          ) : (
            <span>{t.methodIcon.value}</span>
          )}
          {t.method}
        </span>
      </td>

      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
            t.type === "Income"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-500"
          }`}
        >
          {t.type}
        </span>
      </td>

      <td
        className={`whitespace-nowrap py-4 pr-4 text-right align-top text-[13.5px] font-semibold ${
          t.amount < 0 ? "text-rose-500" : "text-emerald-600"
        }`}
      >
        {formatPeso(t.amount)}
      </td>

      <td className="whitespace-nowrap py-4 pl-4 text-right align-top">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          aria-label="Transaction actions"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          className={`rounded-md p-1.5 transition-colors hover:bg-slate-100 hover:text-slate-600 ${
            isMenuOpen ? "bg-slate-100 text-slate-600" : "text-slate-400"
          }`}
        >
          <MoreVertical size={16} />
        </button>

        {isMenuOpen &&
          createPortal(
            <div
              ref={menuRef}
              role="menu"
              style={{ position: "fixed", ...menuPos }}
              className="z-50 w-32 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  closeMenu();
                  onEdit?.(t);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <Pencil size={14} className="text-slate-400" />
                Edit
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  closeMenu();
                  onDelete?.(t);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] font-medium text-rose-500 transition-colors hover:bg-rose-50"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>,
            document.body
          )}
      </td>
    </tr>
  );
}