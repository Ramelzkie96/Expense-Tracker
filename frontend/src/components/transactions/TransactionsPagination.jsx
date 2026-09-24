import { ChevronLeft, ChevronRight } from "lucide-react";

// Builds a page-number list with ellipses, e.g. [1, '...', 4, 5, 6, '...', 10].
// Always shows the first and last page, plus a window of `siblingCount`
// pages around the current page.
function buildPageList(page, totalPages, siblingCount = 1) {
  const totalNumbersShown = siblingCount * 2 + 5; // first, last, current, 2 ellipses, siblings

  if (totalPages <= totalNumbersShown) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const pages = [1];

  if (showLeftEllipsis) pages.push("ellipsis-left");
  for (let n = leftSibling; n <= rightSibling; n++) {
    if (n !== 1 && n !== totalPages) pages.push(n);
  }
  if (showRightEllipsis) pages.push("ellipsis-right");

  pages.push(totalPages);

  return pages;
}

export default function TransactionsPagination({
  page,
  totalPages,
  onPageChange,
  shownCount,
  totalResults,
  pageSize = 10,
}) {
  const startIndex = totalResults === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex = totalResults === 0 ? 0 : startIndex + shownCount - 1;

  const pageList = buildPageList(page, totalPages);

  return (
    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
      <p className="text-[13px] text-slate-500">
        Showing {startIndex} to {endIndex} of {totalResults} transactions
      </p>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
          disabled={page === 1}
        >
          <ChevronLeft size={15} />
        </button>

        {pageList.map((n) =>
          typeof n === "number" ? (
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
          ) : (
            <span key={n} className="px-1 text-slate-400">
              …
            </span>
          )
        )}

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