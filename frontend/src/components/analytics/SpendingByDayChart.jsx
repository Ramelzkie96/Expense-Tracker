import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { spendingByDay, formatPesoPlain } from "../../data/analytics";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      <p className="text-[12px] font-semibold text-slate-700">{label}</p>
      <p className="text-[12px] text-violet-600">{formatPesoPlain(payload[0].value)}</p>
    </div>
  );
}

export default function SpendingByDayChart() {
  const tickIndexes = [0, 6, 13, 20, 27];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-[16px] font-bold text-slate-800">Spending by Day</h3>
      <p className="mt-0.5 mb-5 text-[13px] text-slate-500">
        Daily spending for the current month.
      </p>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendingByDay} margin={{ top: 20, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="dayFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11.5 }}
              ticks={tickIndexes.map((i) => spendingByDay[i].day)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(v) => `₱${v}`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#dayFill)"
              dot={false}
              activeDot={{ r: 5, fill: "#8b5cf6" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}