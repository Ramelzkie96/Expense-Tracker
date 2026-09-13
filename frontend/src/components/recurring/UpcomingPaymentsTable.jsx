import { MoreVertical, ArrowRight } from "lucide-react";
import { upcomingPayments, formatPeso } from "../../data/recurring";

export default function UpcomingPaymentsTable() {
  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h3 className="text-[16px] font-bold text-slate-800">
            Upcoming Recurring Payments
          </h3>
          <p className="mt-0.5 text-[13px] text-slate-500">
            Transactions that will occur in the next 7 days
          </p>
        </div>
        <button className="flex items-center gap-1 text-[13px] font-semibold text-indigo-600 hover:text-indigo-700">
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[12px] font-semibold text-slate-400">
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 pr-4 font-semibold">Description</th>
              <th className="pb-3 pr-4 font-semibold">Category</th>
              <th className="pb-3 pr-4 font-semibold">Amount</th>
              <th className="pb-3 pr-4 font-semibold">Type</th>
              <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingPayments.map((p) => {
              const Icon = p.icon;
              return (
                <tr key={p.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="whitespace-nowrap py-4 pr-4 align-top">
                    <p className="text-[13px] font-medium text-slate-700">{p.date}</p>
                    <p className="text-[12px] text-slate-400">{p.day}</p>
                  </td>

                  <td className="py-4 pr-4 align-top">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${p.iconBg}`}>
                        {p.isTextIcon ? (
                          <span className={`text-[13px] font-bold ${p.iconColor}`}>{Icon()}</span>
                        ) : (
                          <Icon size={16} strokeWidth={2} className={p.iconColor} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[13.5px] font-semibold text-slate-800">
                          {p.title}
                        </p>
                        <p className="truncate text-[12px] text-slate-400">{p.subtitle}</p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-top">
                    <span
                      className={`inline-flex items-center rounded-full ${p.categoryBg} px-2.5 py-1 text-[12px] font-medium ${p.categoryColor}`}
                    >
                      {p.category}
                    </span>
                  </td>

                  <td
                    className={`whitespace-nowrap py-4 pr-4 align-top text-[13.5px] font-semibold ${
                      p.amount < 0 ? "text-rose-500" : "text-emerald-600"
                    }`}
                  >
                    {formatPeso(p.amount)}
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-top">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
                        p.type === "Income"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-500"
                      }`}
                    >
                      {p.type}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-4 text-right align-top">
                    <button className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                      <MoreVertical size={16} />
                    </button>
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