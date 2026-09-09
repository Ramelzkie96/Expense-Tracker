import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TransactionsPagination({
  page,
  totalPages,
  onPageChange,
  shownCount,
  totalResults,
}) {
  return (
    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
      <p className="text-[13px] text-slate-500">
        Showing 1 to {shownCount} of {totalResults} transactions
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
          disabled={page === 1}
        >
          <ChevronLeft size={15} />
        </button>

        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => onPageChange(n)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${
              page === n
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {n}
          </button>
        ))}

        <span className="px-1 text-slate-400">…</span>

        <button
          onClick={() => onPageChange(totalPages)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${
            page === totalPages
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          {totalPages}
        </button>

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
          disabled={page === totalPages}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}