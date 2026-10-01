import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  subMonths,
  parseISO,
  format,
} from "date-fns";

// transactions: MAPPED rows (via mapTransactionRow) — needs rawDate, title, type, amount
export function buildCalendarWeeks(transactions, referenceMonth = new Date()) {
  const monthStart = startOfMonth(referenceMonth);
  const monthEnd = endOfMonth(referenceMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday, matches WEEKDAYS
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const today = new Date();

  // Group transactions by ISO date ("YYYY-MM-DD") for quick lookup per cell
  const byDate = new Map();
  transactions.forEach((t) => {
    if (!byDate.has(t.rawDate)) byDate.set(t.rawDate, []);
    byDate.get(t.rawDate).push(t);
  });

  const days = allDays.map((d) => {
    const iso = format(d, "yyyy-MM-dd");
    const dayTransactions = byDate.get(iso) ?? [];

    return {
      date: d.getDate(),
      inCurrentMonth: isSameMonth(d, referenceMonth),
      isToday: isSameDay(d, today),
      events: dayTransactions.map((t) => ({
        label: t.title,
        // Real data only distinguishes Income/Expense — see note above
        // about "bill"/"transfer" kinds having no real-world equivalent yet.
        kind: t.type === "Income" ? "income" : "expense",
        amount: t.amount,
      })),
    };
  });

  // Chunk the flat day list into weeks of 7, matching calendarWeeks' shape
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}
function sumByTypeForMonth(transactions, type, month) {
  return transactions
    .filter((t) => t.type === type && isSameMonth(parseISO(t.rawDate), month))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
}

// Percentage change, current vs previous. 100% if previous was zero and
// current isn't (can't divide by zero); 0% if both are zero.
function pctChange(current, previous) {
  if (previous === 0) return current === 0 ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

// transactions: MAPPED rows (via mapTransactionRow) — needs rawDate, type, amount
// referenceMonth: whatever month the calendar is currently showing (not
// necessarily the real "today")
export function computeCalendarStats(transactions, referenceMonth = new Date()) {
  const lastMonth = subMonths(referenceMonth, 1);

  const income = sumByTypeForMonth(transactions, "Income", referenceMonth);
  const expenses = sumByTypeForMonth(transactions, "Expense", referenceMonth);
  const lastIncome = sumByTypeForMonth(transactions, "Income", lastMonth);
  const lastExpenses = sumByTypeForMonth(transactions, "Expense", lastMonth);

  const netSavings = income - expenses;
  const lastNetSavings = lastIncome - lastExpenses;

  const savingsRate = income ? (netSavings / income) * 100 : 0;
  const lastSavingsRate = lastIncome ? (lastNetSavings / lastIncome) * 100 : 0;

  return {
    income,
    expenses,
    netSavings,
    savingsRate,
    incomeChangePct: pctChange(income, lastIncome),
    expensesChangePct: pctChange(expenses, lastExpenses),
    netSavingsChangePct: pctChange(netSavings, lastNetSavings),
    // Percentage-POINT difference (e.g. 50% -> 56% = +6), not a relative %
    // change of the rate itself — matches how savings rate is usually read.
    savingsRateChangePct: savingsRate - lastSavingsRate,
  };
}