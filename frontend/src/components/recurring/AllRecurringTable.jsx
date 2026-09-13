import { useState } from "react";
import { Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { allRecurringTransactions, formatPeso } from "../../data/recurring";

function statusStyles(status) {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-600";
    case "Paused":
      return "bg-amber-50 text-amber-600";
    case "Cancelled":
      return "bg-slate-100 text-slate-500";
    default:
      return "bg-slate-100 text-slate-500";
  }
}

export default function AllRecurringTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const totalPages = 3;
  const totalResults = 12;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[16px] font-bold text-slate-800">
          All Recurring Transactions
        </h3>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search
              size={15}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recurring transactions..."
              className="h-[38px] w-[240px] rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
            />
          </div>

          <button className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50">
            <Filter size={15} strokeWidth={2} className="text-slate-400" />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[12px] font-semibold text-slate-400">
              <th className="pb-3 pr-4 font-semibold">Description</th>
              <th className="pb-3 pr-4 font-semibold">Category</th>
              <th className="pb-3 pr-4 font-semibold">Frequency</th>
              <th className="pb-3 pr-4 font-semibold">Amount</th>
              <th className="pb-3 pr-4 font-semibold">Next Payment</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allRecurringTransactions.map((t) => {
              const Icon = t.icon;
              return (
                <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="whitespace-nowrap py-4 pr-4 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${t.iconBg}`}>
                        {t.isTextIcon ? (
                          <span className={`text-[12px] font-bold ${t.iconColor}`}>{Icon()}</span>
                        ) : (
                          <Icon size={15} strokeWidth={2} className={t.iconColor} />
                        )}
                      </div>
                      <span className="text-[13.5px] font-semibold text-slate-800">{t.title}</span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full ${t.categoryBg} px-2.5 py-1 text-[12px] font-medium ${t.categoryColor}`}
                    >
                      {t.category}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle text-[13.5px] text-slate-600">
                    {t.frequency}
                  </td>

                  <td
                    className={`whitespace-nowrap py-4 pr-4 align-middle text-[13.5px] font-semibold ${
                      t.amount < 0 ? "text-rose-500" : "text-emerald-600"
                    }`}
                  >
                    {formatPeso(t.amount)}
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle text-[13.5px] text-slate-600">
                    {t.nextPayment}
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${statusStyles(t.status)}`}>
                      {t.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-4 text-right align-middle">
                    <button className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <p className="text-[13px] text-slate-500">
          Showing 1 to {allRecurringTransactions.length} of {totalResults} recurring transactions
        </p>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
            disabled={page === 1}
          >
            <ChevronLeft size={15} />
          </button>

          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${
                page === n
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
            disabled={page === totalPages}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}