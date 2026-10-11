import { PieChart, Pie, Cell } from "recharts";
import { formatPesoPlain } from "../../data/budgets";

export default function SpendingByCategoryCard({ categories, totalSpent }) {
  const chartData = categories.map((c) => ({
    name: c.name,
    value: c.spent,
    color: c.color,
  }));

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="mb-5 text-[16px] font-bold text-slate-800">
        Spending by Category
      </h3>

      {categories.length === 0 ? (
        <p className="py-10 text-center text-[13px] text-slate-400">
          No expenses recorded this month.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center">
          {/* Donut */}
          <div className="relative shrink-0" style={{ width: 220, height: 220 }}>
            <PieChart width={220} height={220}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[19px] font-bold text-slate-800">
                {formatPesoPlain(totalSpent)}
              </p>
              <p className="text-[12.5px] text-slate-500">Total Spent</p>
            </div>
          </div>

          {/* Legend */}
          <div className="w-full min-w-0 flex-1 space-y-4">
            {categories.map((c) => {
              const Icon = c.icon;
              const pct = totalSpent ? Math.round((c.spent / totalSpent) * 100) : 0;
              return (
                <div key={c.id} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />

                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${c.iconBg}`}
                  >
                    <Icon size={13} strokeWidth={2} className={c.iconColor} />
                  </div>

                  <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-slate-700 sm:w-[130px] sm:flex-none">
                    {c.name}
                  </span>

                  <span className="shrink-0 text-[13.5px] font-semibold text-slate-800 sm:w-[85px]">
                    {formatPesoPlain(c.spent)}
                  </span>

                  <span className="w-9 shrink-0 text-right text-[12.5px] text-slate-500 sm:text-left">
                    {pct}%
                  </span>

                  {/* Bar drops to its own full-width line when space is tight */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 sm:w-auto sm:min-w-[60px] sm:flex-1">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: c.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}