import { PieChart, Pie, Cell } from "recharts";
import { recurringSummary, formatPesoPlain } from "../../data/recurring";

export default function RecurringSummaryCard() {
  const { expenses, income, transfers } = recurringSummary;
  const total = expenses + income + transfers;
  const netMonthly = income - expenses + transfers;

  const chartData = [
    { name: "Expenses", value: expenses, color: "#f43f5e" },
    { name: "Income", value: income, color: "#10b981" },
    { name: "Transfers", value: transfers, color: "#4f46e5" },
  ];

  const legend = chartData.map((d) => ({
    ...d,
    pct: Math.round((d.value / total) * 100),
  }));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[15px] font-bold text-slate-800">Recurring Summary</h3>

      <div className="relative mx-auto mb-5" style={{ width: 190, height: 190 }}>
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
          <p className="text-[17px] font-bold text-slate-800">
            {formatPesoPlain(netMonthly)}
          </p>
          <p className="text-[11.5px] text-slate-500">Net Monthly</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {legend.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-[13px]">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              {d.name}
            </span>
            <span className="font-semibold text-slate-800">{formatPesoPlain(d.value)}</span>
            <span className="w-8 text-right text-slate-500">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}