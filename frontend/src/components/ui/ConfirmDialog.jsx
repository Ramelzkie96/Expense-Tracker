import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Trash2 } from "lucide-react";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  loadingLabel = "Deleting...",
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  // Close on Escape (but not while a request is running)
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape" && !isLoading) onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 p-4"
      onMouseDown={(e) => {
        // Clicking the dark overlay (not the card) cancels
        if (e.target === e.currentTarget && !isLoading) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50">
          <Trash2 size={20} className="text-rose-500" />
        </div>

        <h3 className="mt-4 text-[16px] font-bold text-slate-800">{title}</h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-500">
          {message}
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex h-[40px] cursor-pointer items-center rounded-lg border border-slate-200 bg-white px-4 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex h-[40px] cursor-pointer items-center rounded-lg bg-rose-500 px-4 text-[13.5px] font-semibold text-white shadow-sm transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}