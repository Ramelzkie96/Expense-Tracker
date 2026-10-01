import { useState, useEffect, useMemo, useRef } from "react";
import { MoreHorizontal, ChevronDown, Check } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useUser } from "@clerk/clerk-react";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  differenceInCalendarDays,
  isWithinInterval,
  parseISO,
  format,
} from "date-fns";
import { useSupabaseClient } from "../../hooks/useSupabaseClient";
import { getTransactions } from "../../services/transactions";
import { mapTransactionRow } from "../../utils/transactionMapper";
import { formatPeso } from "../../utils/dashboardSummary";

// The DB stores Tailwind classes (e.g. "text-emerald-600") but recharts needs
// hex colors, so map the Tailwind color name to a hex value.
const TAILWIND_HEX = {
  slate: "#64748b",
  gray: "#6b7280",
  red: "#ef4444",
  orange: "#f97316",
  amber: "#f59e0b",
  yellow: "#eab308",
  lime: "#84cc16",
  green: "#22c55e",
  emerald: "#10b981",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  sky: "#0ea5e9",
  blue: "#3b82f6",
  indigo: "#4f46e5",
  violet: "#8b5cf6",
  purple: "#a855f7",
  fuchsia: "#d946ef",
  pink: "#ec4899",
  rose: "#f43f5e",
};
const FALLBACK_COLORS = ["#4f46e5", "#10b981", "#f97316", "#a855f7", "#ef4444", "#06b6d4"];

function colorToHex(iconColorClass, index) {
  const match = /text-([a-z]+)-\d{3}/.exec(iconColorClass ?? "");
  return (match && TAILWIND_HEX[match[1]]) || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

const MAX_ROWS = 6; // show top 5 categories + "Others" when there are more than 6

const PERIODS = {
  week: { label: "This Week", title: "Current Week Summary", noun: "week" },
  month: { label: "This Month", title: "Current Month Summary", noun: "month" },
  year: { label: "This Year", title: "Current Year Summary", noun: "year" },
};
const PERIOD_ORDER = ["week", "month", "year"];

function getInterval(period, referenceDate) {
  if (period === "week") {
    // Weeks run Monday to Sunday
    return {
      start: startOfWeek(referenceDate, { weekStartsOn: 1 }),
      end: endOfWeek(referenceDate, { weekStartsOn: 1 }),
    };
  }
  if (period === "year") {
    return { start: startOfYear(referenceDate), end: endOfYear(referenceDate) };
  }
  return { start: startOfMonth(referenceDate), end: endOfMonth(referenceDate) };
}

function buildSummary(allTransactions, period = "month", referenceDate = new Date()) {
  const interval = getInterval(period, referenceDate);

  const monthTransactions = allTransactions.filter((t) =>
    isWithinInterval(parseISO(t.rawDate), interval)
  );
  const monthExpenses = monthTransactions.filter((t) => t.type === "Expense");

  const totalExpenses = monthExpenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);

  // Group expenses by category
  const byCategory = new Map();
  monthExpenses.forEach((t) => {
    const current = byCategory.get(t.category) ?? {
      name: t.category,
      total: 0,
      icon: t.icon,
      iconBg: t.iconBg,
      iconColor: t.iconColor,
    };
    current.total += Math.abs(t.amount);
    byCategory.set(t.category, current);
  });

  let rows = [...byCategory.values()].sort((a, b) => b.total - a.total);

  if (rows.length > MAX_ROWS) {
    const top = rows.slice(0, MAX_ROWS - 1);
    const othersTotal = rows.slice(MAX_ROWS - 1).reduce((sum, r) => sum + r.total, 0);
    top.push({
      name: "Others",
      total: othersTotal,
      icon: MoreHorizontal,
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-500",
    });
    rows = top;
  }

  const categories = rows.map((r, i) => ({
    ...r,
    color: colorToHex(r.iconColor, i),
    amount: formatPeso(r.total),
    value: totalExpenses ? Math.round((r.total / totalExpenses) * 100) : 0,
  }));

  // Bottom stats
  // Average over the days elapsed so far in the selected week/month/year
  const daysElapsed = Math.max(
    1,
    differenceInCalendarDays(referenceDate, interval.start) + 1
  );
  const dailyAverage = totalExpenses / daysElapsed;

  const highest = monthExpenses.reduce(
    (max, t) => (!max || Math.abs(t.amount) > Math.abs(max.amount) ? t : max),
    null
  );

  return {
    categories,
    totalExpenses,
    dailyAverage,
    highest,
    transactionCount: monthTransactions.length,
  };
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const category = payload[0].payload;

  return (
    <div className="w-[160px] rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <p className="truncate text-[12.5px] font-semibold text-slate-700">
          {category.name}
        </p>
      </div>
      <p className="mt-1 text-[12px] text-slate-500">
        {category.amount} · {category.value}%
      </p>
    </div>
  );
}

function PeriodDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-gray-50"
      >
        {PERIODS[value].label}
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 mt-1.5 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {PERIOD_ORDER.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                onChange(key);
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-between px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50"
            >
              {PERIODS[key].label}
              {value === key && <Check size={14} className="text-indigo-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MonthlySummary() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [period, setPeriod] = useState("month");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getTransactions(supabase, user.id)
      .then((rows) => setTransactions(rows.map(mapTransactionRow)))
      .catch((err) => console.error("Failed to load monthly summary:", err))
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  const summary = useMemo(
    () => buildSummary(transactions, period),
    [transactions, period]
  );
  const { categories, totalExpenses, dailyAverage, highest, transactionCount } = summary;

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          {PERIODS[period].title}
        </h2>

        <PeriodDropdown value={period} onChange={setPeriod} />
      </div>

      {isLoading ? (
        <p className="py-16 text-center text-[13px] text-slate-400">
          Loading summary...
        </p>
      ) : categories.length === 0 ? (
        <p className="py-16 text-center text-[13px] text-slate-400">
          No expenses recorded this {PERIODS[period].noun}.
        </p>
      ) : (
        /* Chart + Categories */
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
          {/* Donut Chart */}
          <div className="flex shrink-0 justify-center lg:w-[48%]">
            <div className="relative flex h-56 w-56 items-center justify-center overflow-visible">
              <PieChart width={224} height={224}>
                <Pie
                  data={categories}
                  dataKey="total"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={64}
                  outerRadius={100}
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                  isAnimationActive={true}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {categories.map((category) => (
                    <Cell key={category.name} fill={category.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={false}
                  position={{ x: 230, y: 70 }}
                  allowEscapeViewBox={{ x: true, y: true }}
                  wrapperStyle={{ zIndex: 20, pointerEvents: "none" }}
                />
              </PieChart>

              {/* White center */}
              <div className="pointer-events-none absolute flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-sm">
                <span className="text-xs text-slate-500">Total Expenses</span>
                <span className="mt-1 text-lg font-bold text-slate-800">
                  {formatPeso(totalExpenses)}
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="w-full space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <div key={category.name} className="flex items-center gap-3">
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${category.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${category.iconColor}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-slate-700">
                      {category.name}
                    </p>
                  </div>

                  <span className="text-xs font-medium text-slate-600">
                    {category.amount}
                  </span>

                  <span className="w-7 text-right text-xs text-slate-400">
                    {category.value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Statistics */}
      <div className="mt-6 grid grid-cols-3 divide-x rounded-lg border border-gray-100 bg-slate-50/50 py-4">
        {/* Daily Average */}
        <div className="text-center">
          <p className="text-xs text-slate-400">Daily Average</p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            {formatPeso(dailyAverage)}
          </p>
        </div>

        {/* Highest Expense */}
        <div className="text-center">
          <p className="text-xs text-slate-400">Highest Expense</p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            {highest ? formatPeso(highest.amount) : "—"}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            {highest ? format(parseISO(highest.rawDate), "MMM d, yyyy") : ""}
          </p>
        </div>

        {/* Transactions */}
        <div className="text-center">
          <p className="text-xs text-slate-400">Transactions</p>
          <p className="mt-1 text-sm font-bold text-slate-800">
            {transactionCount}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            {PERIODS[period].label}
          </p>
        </div>
      </div>
    </div>
  );
}