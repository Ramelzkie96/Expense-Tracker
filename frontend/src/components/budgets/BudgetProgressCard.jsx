import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { formatPesoPlain } from "../../data/budgets";

export default function BudgetProgressCard({ spent, remaining, spentPct }) {
  const remainingPct = 100 - spentPct;

  const data = [{ name: "spent", value: spentPct, fill: "#4f46e5" }];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-[15px] font-bold text-slate-800">Budget Progress</h3>

      <div className="relative mx-auto" style={{ width: 210, height: 210 }}>
        <RadialBarChart
          width={210}
          height={210}
          cx="50%"
          cy="50%"
          innerRadius="78%"
          outerRadius="100%"
          barSize={16}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={8}
            background={{ fill: "#e2e8f0" }}
            clockWise
          />
        </RadialBarChart>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[26px] font-bold text-slate-800">{spentPct}%</p>
          <p className="text-[12.5px] text-slate-500">of budget</p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            Spent
          </span>
          <span className="font-semibold text-slate-800">{formatPesoPlain(spent)}</span>
          <span className="text-slate-500">{spentPct}%</span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <span className="flex items-center gap-2 text-slate-600">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            Remaining
          </span>
          <span className="font-semibold text-slate-800">{formatPesoPlain(remaining)}</span>
          <span className="text-slate-500">{remainingPct}%</span>
        </div>
      </div>
    </div>
  );
}