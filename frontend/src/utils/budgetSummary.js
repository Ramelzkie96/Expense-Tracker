import * as LucideIcons from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
  format,
} from "date-fns";

// Same Tailwind-class -> hex mapping used in MonthlySummary.jsx. If you ever
// touch one, touch the other, or better, move this to a shared util.
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

export function colorToHex(iconColorClass, index) {
  const match = /text-([a-z]+)-\d{3}/.exec(iconColorClass ?? "");
  return (match && TAILWIND_HEX[match[1]]) || FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

// budgets: rows from getBudgets, each with monthly_budget, start_date, end_date
// transactions: MAPPED rows (via mapTransactionRow) — { type, amount, rawDate, category, icon, iconBg, iconColor }
export function computeBudgetOverview(budgets, transactions, referenceDate = new Date()) {
  const interval = { start: startOfMonth(referenceDate), end: endOfMonth(referenceDate) };
  const monthStart = format(interval.start, "yyyy-MM-dd");
  const monthEnd = format(interval.end, "yyyy-MM-dd");

  const activeBudgets = budgets.filter((b) => {
    const startsBeforeMonthEnds = b.start_date <= monthEnd;
    const endsAfterMonthStarts = !b.end_date || b.end_date >= monthStart;
    return startsBeforeMonthEnds && endsAfterMonthStarts;
  });
  const monthlyBudget = activeBudgets.reduce(
    (sum, b) => sum + Number(b.monthly_budget),
    0
  );

  const monthTransactions = transactions.filter((t) =>
    isWithinInterval(parseISO(t.rawDate), interval)
  );

  let totalIncome = 0;
  let totalExpenses = 0;
  monthTransactions.forEach((t) => {
    const amount = Math.abs(t.amount);
    if (t.type === "Income") totalIncome += amount;
    else if (t.type === "Expense") totalExpenses += amount;
  });

  const totalSpent = totalExpenses;
  const remaining = monthlyBudget - totalSpent;
  const spentPct = monthlyBudget > 0 ? Math.round((totalSpent / monthlyBudget) * 100) : 0;

  return { monthlyBudget, totalSpent, totalIncome, totalExpenses, remaining, spentPct };
}

// Groups this month's EXPENSE transactions by category, for the
// "Spending by Category" donut + legend. Returns categories sorted by
// spend, highest first.
export function computeCategorySpending(transactions, referenceDate = new Date()) {
  const interval = { start: startOfMonth(referenceDate), end: endOfMonth(referenceDate) };

  const monthExpenses = transactions.filter(
    (t) => t.type === "Expense" && isWithinInterval(parseISO(t.rawDate), interval)
  );

  const byCategory = new Map();
  monthExpenses.forEach((t) => {
    const current = byCategory.get(t.category) ?? {
      id: t.category,
      name: t.category,
      spent: 0,
      icon: t.icon,
      iconBg: t.iconBg,
      iconColor: t.iconColor,
    };
    current.spent += Math.abs(t.amount);
    byCategory.set(t.category, current);
  });

  return [...byCategory.values()]
    .sort((a, b) => b.spent - a.spent)
    .map((r, i) => ({ ...r, color: colorToHex(r.iconColor, i) }));
}

// Status thresholds for the Budget Categories table — adjust here if you
// want a different cutoff for "Near Limit".
const NEAR_LIMIT_THRESHOLD = 80;

function statusFor(progress) {
  if (progress > 100) return "Over Budget";
  if (progress >= NEAR_LIMIT_THRESHOLD) return "Near Limit";
  return "On Track";
}

// Joins each budget active this month with the real amount spent in its
// category this month, for the Budget Categories table.
// budgets: rows from getBudgets (joined with categories: id, name, icon_name, icon_bg, icon_color)
// transactions: MAPPED rows (via mapTransactionRow) — needs categoryId, type, amount, rawDate
export function computeBudgetCategoryRows(budgets, transactions, referenceDate = new Date()) {
  const interval = { start: startOfMonth(referenceDate), end: endOfMonth(referenceDate) };
  const monthStart = format(interval.start, "yyyy-MM-dd");
  const monthEnd = format(interval.end, "yyyy-MM-dd");

  const activeBudgets = budgets.filter((b) => {
    const startsBeforeMonthEnds = b.start_date <= monthEnd;
    const endsAfterMonthStarts = !b.end_date || b.end_date >= monthStart;
    return startsBeforeMonthEnds && endsAfterMonthStarts;
  });

  const monthExpenses = transactions.filter(
    (t) => t.type === "Expense" && isWithinInterval(parseISO(t.rawDate), interval)
  );

  return activeBudgets.map((b, i) => {
    const category = b.categories;
    const spent = monthExpenses
      .filter((t) => t.categoryId === category?.id)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const monthlyBudget = Number(b.monthly_budget);
    const remaining = monthlyBudget - spent;
    const progress = monthlyBudget > 0 ? Math.round((spent / monthlyBudget) * 100) : 0;

    return {
      id: b.id,
      name: category?.name ?? "Uncategorized",
      icon: category ? LucideIcons[category.icon_name] ?? LucideIcons.Tag : LucideIcons.Tag,
      iconBg: category?.icon_bg ?? "bg-slate-100",
      iconColor: category?.icon_color ?? "text-slate-500",
      color: colorToHex(category?.icon_color, i),
      monthlyBudget,
      spent,
      remaining,
      progress,
      status: statusFor(progress),
    };
  });
}

// Turns the most recent MAPPED transactions (any type, any category) into
// the shape RecentBudgetActivityCard expects.
export function computeRecentBudgetActivity(transactions, limit = 5) {
  // transactions is already sorted newest-first by getTransactions()
  return transactions.slice(0, limit).map((t) => ({
    id: t.id,
    label: t.title,
    icon: t.icon,
    iconBg: t.iconBg,
    iconColor: t.iconColor,
    date: t.date,
    amount: t.amount,
  }));
}