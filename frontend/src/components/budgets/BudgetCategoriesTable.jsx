import { Plus, MoreVertical } from "lucide-react";
import { formatPesoPlain } from "../../data/budgets";

function statusStyles(status) {
  switch (status) {
    case "On Track":
      return "bg-emerald-50 text-emerald-600";
    case "Near Limit":
      return "bg-amber-50 text-amber-600";
    case "Over Budget":
      return "bg-rose-50 text-rose-500";
    default:
      return "bg-slate-100 text-slate-500";
  }
}

export default function BudgetCategoriesTable({ categories, onAddBudget }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-slate-800">Budget Categories</h3>
        <button
          onClick={onAddBudget}
          className="flex h-[36px] items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-3.5 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
        >
          <Plus size={15} strokeWidth={2.4} />
          Add Budget
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-left text-[12px] font-semibold text-slate-400">
              <th className="pb-3 pr-4 font-semibold">Category</th>
              <th className="pb-3 pr-4 font-semibold">Monthly Budget</th>
              <th className="pb-3 pr-4 font-semibold">Spent</th>
              <th className="pb-3 pr-4 font-semibold">Remaining</th>
              <th className="pb-3 pr-4 font-semibold">Progress</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => {
              const Icon = c.icon;
              return (
                <tr key={c.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                  <td className="whitespace-nowrap py-4 pr-4 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${c.iconBg}`}>
                        <Icon size={15} strokeWidth={2} className={c.iconColor} />
                      </div>
                      <span className="text-[13.5px] font-semibold text-slate-800">
                        {c.name}
                      </span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle text-[13.5px] text-slate-600">
                    {formatPesoPlain(c.monthlyBudget)}
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle text-[13.5px] text-slate-600">
                    {formatPesoPlain(c.spent)}
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle text-[13.5px] text-slate-600">
                    {formatPesoPlain(c.remaining)}
                  </td>

                  <td className="py-4 pr-4 align-middle">
                    <div className="flex items-center gap-2.5">
                      <div className="h-1.5 w-[110px] overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${c.progress}%`, backgroundColor: c.color }}
                        />
                      </div>
                      <span className="text-[12.5px] text-slate-500">{c.progress}%</span>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-4 pr-4 align-middle">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${statusStyles(c.status)}`}>
                      {c.status}
                    </span>
                  </td>

                  <td className="whitespace-nowrap py-4 pl-4 text-right align-middle">
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