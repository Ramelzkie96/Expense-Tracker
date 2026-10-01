import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { format, getDaysInMonth } from "date-fns";
import { useSupabaseClient } from "../../hooks/useSupabaseClient";
import { getDashboardTransactions } from "../../services/transactions";
import { formatPeso } from "../../utils/dashboardSummary";

const TICK_COUNT = 5; // 5 intervals => 6 gridlines/labels (0 ... max)

// Picks a "nice" chart ceiling (1, 2 or 5 x 10^n per interval) so the
// Y-axis labels are round numbers like ₱2K, ₱4K, ₱6K.
function niceMax(value) {
  if (value <= 0) return 1000;
  const rough = value / TICK_COUNT;
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalized = rough / magnitude;
  const step =
    (normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10) *
    magnitude;
  return step * TICK_COUNT;
}

function formatAxis(n) {
  if (n === 0) return "₱0";
  if (n >= 1000) return `₱${Number((n / 1000).toFixed(1))}K`;
  return `₱${n}`;
}

function buildChart(transactions, now = new Date()) {
  const monthKey = format(now, "yyyy-MM");
  const daysInMonth = getDaysInMonth(now);

  const days = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: 0,
    expense: 0,
  }));

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((t) => {
    if (!t.transaction_date?.startsWith(monthKey)) return;
    const day = Number(t.transaction_date.slice(8, 10));
    const bucket = days[day - 1];
    if (!bucket) return;
    const amount = Math.abs(Number(t.amount));

    if (t.type === "Income") {
      bucket.income += amount;
      totalIncome += amount;
    } else if (t.type === "Expense") {
      bucket.expense += amount;
      totalExpenses += amount;
    }
  });

  const highest = Math.max(0, ...days.map((d) => Math.max(d.income, d.expense)));
  const maxValue = niceMax(highest);

  // X-axis labels every 3 days, plus the last day if it isn't too close
  const labelDays = [];
  for (let d = 1; d <= daysInMonth; d += 3) labelDays.push(d);
  if (daysInMonth - labelDays[labelDays.length - 1] >= 2) {
    labelDays.push(daysInMonth);
  }

  return {
    days,
    daysInMonth,
    maxValue,
    labelDays,
    monthLabel: format(now, "MMM"),
    totalIncome,
    totalExpenses,
    netSavings: totalIncome - totalExpenses,
    hasData: totalIncome > 0 || totalExpenses > 0,
  };
}

export default function IncomeExpenseChart() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getDashboardTransactions(supabase, user.id)
      .then(setTransactions)
      .catch((err) => console.error("Failed to load chart data:", err))
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  const chart = useMemo(() => buildChart(transactions), [transactions]);
  const {
    days,
    daysInMonth,
    maxValue,
    labelDays,
    monthLabel,
    totalIncome,
    totalExpenses,
    netSavings,
    hasData,
  } = chart;

  const overlayMessage = isLoading
    ? "Loading chart..."
    : !hasData
    ? "No transactions this month."
    : null;

  const yTicks = Array.from({ length: TICK_COUNT + 1 }, (_, i) => ({
    value: maxValue - (maxValue / TICK_COUNT) * i,
    top: (i / TICK_COUNT) * 100,
  }));

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-base font-semibold text-slate-800">
          Income vs Expense
        </h2>

        {/* Legend */}
        <div className="mt-5 flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-sm bg-emerald-500" />
            <span className="text-xs font-medium text-slate-600">Income</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-4 rounded-sm bg-red-500" />
            <span className="text-xs font-medium text-slate-600">Expense</span>
          </div>
        </div>
      </div>

      {/* Chart + Summary */}
      <div className="mt-4 flex gap-6">
        {/* Chart */}
        <div className="min-w-0 flex-1">
          <div className="flex">
            {/* Y Axis */}
            <div className="relative h-[190px] w-10 shrink-0">
              {yTicks.map((tick) => (
                <div
                  key={tick.top}
                  className="absolute right-2 -translate-y-1/2 text-[10px] text-slate-500"
                  style={{ top: `${tick.top}%` }}
                >
                  {formatAxis(tick.value)}
                </div>
              ))}
            </div>

            {/* Chart Area */}
            <div className="relative h-[190px] min-w-0 flex-1">
              {/* Grid Lines */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                {yTicks.map((tick) => (
                  <div
                    key={tick.top}
                    className="border-t border-dashed border-gray-200"
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="absolute inset-0 flex items-end justify-between gap-[2px] px-1">
                {days.map((item) => {
                  const incomeHeight = (item.income / maxValue) * 100;
                  const expenseHeight = (item.expense / maxValue) * 100;

                  return (
                    <div
                      key={item.day}
                      className="flex h-full flex-1 items-end justify-center gap-[2px]"
                    >
                      {/* Income */}
                      <div
                        className="w-[5px] rounded-t-sm bg-emerald-500 transition-all duration-300 hover:opacity-75"
                        style={{ height: `${incomeHeight}%` }}
                        title={`${monthLabel} ${item.day}: Income ${formatPeso(
                          item.income
                        )}`}
                      />

                      {/* Expense */}
                      <div
                        className="w-[5px] rounded-t-sm bg-red-500 transition-all duration-300 hover:opacity-75"
                        style={{ height: `${expenseHeight}%` }}
                        title={`${monthLabel} ${item.day}: Expense ${formatPeso(
                          item.expense
                        )}`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Empty / loading message */}
              {overlayMessage && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="rounded-md bg-white/80 px-3 py-1 text-[12.5px] text-slate-400">
                    {overlayMessage}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* X Axis */}
          <div className="relative ml-10 mt-2 h-4">
            <div className="absolute inset-y-0 left-1 right-1">
              {labelDays.map((day) => (
                <span
                  key={day}
                  className="absolute -translate-x-1/2 whitespace-nowrap text-[10px] text-slate-500"
                  style={{ left: `${((day - 0.5) / daysInMonth) * 100}%` }}
                >
                  {monthLabel} {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="flex w-[150px] shrink-0 items-center">
          <div className="w-full rounded-lg border border-gray-100 bg-slate-50/50 p-4">
            {/* Total Income */}
            <div>
              <p className="text-[11px] text-slate-500">Total Income</p>
              <p className="mt-1 text-sm font-semibold text-emerald-500">
                {formatPeso(totalIncome)}
              </p>
            </div>

            {/* Total Expenses */}
            <div className="mt-5">
              <p className="text-[11px] text-slate-500">Total Expenses</p>
              <p className="mt-1 text-sm font-semibold text-red-500">
                {formatPeso(totalExpenses)}
              </p>
            </div>

            {/* Net Savings */}
            <div className="mt-5">
              <p className="text-[11px] text-slate-500">Net Savings</p>
              <p
                className={`mt-1 text-sm font-semibold ${
                  netSavings < 0 ? "text-red-500" : "text-blue-600"
                }`}
              >
                {netSavings < 0 ? "-" : ""}
                {formatPeso(netSavings)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}