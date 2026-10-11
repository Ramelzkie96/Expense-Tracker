import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const MENU_HEIGHT = 92; // approx. height, used to decide whether to open upward

export default function TransactionActionsMenu({ transaction: t, onEdit, onDelete }) {
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
    <>
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
    </>
  );
}