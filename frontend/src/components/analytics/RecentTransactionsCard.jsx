import { ArrowRight } from "lucide-react";
import { recentTransactions, formatPeso } from "../../data/analytics";

export default function RecentTransactionsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800">Recent Transactions</h3>
          <p className="mt-0.5 text-[13px] text-slate-500">
            Latest income and expense activities.
          </p>
        </div>
        <button className="flex items-center gap-1 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="table-scrollbar overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[12px] font-semibold text-slate-400">
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 pr-4 font-semibold">Description</th>
              <th className="pb-3 pr-4 font-semibold">Category</th>
              <th className="pb-3 pr-4 font-semibold">Amount</th>
              <th className="pb-3 pl-4 font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            {recentTransactions.map((t) => {
              const Icon = t.icon;
              return (
                <tr key={t.id} className="border-b border-slate-50 last:border-0">
                  <td className="whitespace-nowrap py-3 pr-4 align-middle text-[13px] text-slate-600">
                    {t.date}
                  </td>

                  <td className="py-3 pr-4 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${t.iconBg}`}>
                        <Icon size={13} strokeWidth={2} className={t.iconColor} />
                      </div>
                      <span className="text-[13.5px] font-medium text-slate-800">{t.title}</span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-3 pr-4 align-middle text-[13px] text-slate-600">
                    {t.category}
                  </td>

                  <td
                    className={`whitespace-nowrap py-3 pr-4 align-middle text-[13.5px] font-semibold ${
                      t.amount < 0 ? "text-rose-500" : "text-emerald-600"
                    }`}
                  >
                    {formatPeso(t.amount)}
                  </td>

                  <td className="whitespace-nowrap py-3 pl-4 align-middle">
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}