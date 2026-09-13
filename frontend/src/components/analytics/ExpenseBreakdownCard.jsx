import { PieChart, Pie, Cell } from "recharts";
import { expenseCategories, formatPesoPlain } from "../../data/analytics";

export default function ExpenseBreakdownCard() {
  const totalExpenses = expenseCategories.reduce((sum, c) => sum + c.amount, 0);
  const chartData = expenseCategories.map((c) => ({
    name: c.name,
    value: c.amount,
    color: c.color,
  }));

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-[16px] font-bold text-slate-800">Expense Breakdown</h3>
      <p className="mt-0.5 mb-5 text-[13px] text-slate-500">Where your money goes.</p>

      <div className="flex flex-col items-center gap-6 lg:flex-row">
        <div className="relative shrink-0" style={{ width: 190, height: 190 }}>
          <PieChart width={190} height={190}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={88}
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
            <p className="text-[16px] font-bold text-slate-800">
              {formatPesoPlain(totalExpenses)}
            </p>
            <p className="text-[11.5px] text-slate-500">Total Expenses</p>
          </div>
        </div>

        <div className="w-full flex-1 space-y-2.5">
          {expenseCategories.map((c) => (
            <div key={c.id} className="flex items-center gap-2.5 text-[13px]">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: c.color }}
              />
              <span className="flex-1 truncate font-medium text-slate-700">{c.name}</span>
              <span className="shrink-0 font-semibold text-slate-800">
                {formatPesoPlain(c.amount)}
              </span>
              <span className="w-8 shrink-0 text-right text-slate-500">{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}