import { PieChart, Pie, Cell } from "recharts";
import { formatPesoPlain } from "../../data/budgets";

export default function SpendingByCategoryCard({ categories, totalSpent }) {
  const chartData = categories.map((c) => ({
    name: c.name,
    value: c.spent,
    color: c.color,
  }));

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-5 text-[16px] font-bold text-slate-800">
        Spending by Category
      </h3>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center">
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
              {chartData.map((entry, i) => (
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
        <div className="w-full flex-1 space-y-3.5">
          {categories.map((c) => {
            const Icon = c.icon;
            const pct = Math.round((c.spent / totalSpent) * 100);
            return (
              <div key={c.id} className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                />

                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${c.iconBg}`}>
                  <Icon size={13} strokeWidth={2} className={c.iconColor} />
                </div>

                <span className="w-[130px] shrink-0 truncate text-[13.5px] font-medium text-slate-700">
                  {c.name}
                </span>

                <span className="w-[85px] shrink-0 text-[13.5px] font-semibold text-slate-800">
                  {formatPesoPlain(c.spent)}
                </span>

                <span className="w-9 shrink-0 text-[12.5px] text-slate-500">{pct}%</span>

                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
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
    </div>
  );
}