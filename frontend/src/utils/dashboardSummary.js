import {
  startOfMonth,
  endOfMonth,
  subMonths,
  isWithinInterval,
  parseISO,
} from "date-fns";

function sumByType(transactions, type, interval) {
  return transactions
    .filter((t) => t.type === type)
    .filter((t) => isWithinInterval(parseISO(t.transaction_date), interval))
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
}

// Literal-direction comparison: increase = "up" (green), decrease = "down" (red),
// regardless of whether that's financially good news for this particular metric.
function computeChange(current, previous) {
  if (previous === 0) {
    if (current === 0) return { percentage: 0, trend: "up" };
    return { percentage: 100, trend: "up" };
  }
  const diff = current - previous;
  const percentage = Math.abs((diff / previous) * 100);
  const trend = diff >= 0 ? "up" : "down";
  return { percentage, trend };
}

// transactions: [{ type: "Income" | "Expense", amount: number, transaction_date: "YYYY-MM-DD" }]
export function computeDashboardSummary(transactions, referenceDate = new Date()) {
  const thisMonthInterval = {
    start: startOfMonth(referenceDate),
    end: endOfMonth(referenceDate),
  };
  const lastMonthDate = subMonths(referenceDate, 1);
  const lastMonthInterval = {
    start: startOfMonth(lastMonthDate),
    end: endOfMonth(lastMonthDate),
  };

  const thisMonthIncome = sumByType(transactions, "Income", thisMonthInterval);
  const thisMonthExpenses = sumByType(transactions, "Expense", thisMonthInterval);
  const lastMonthIncome = sumByType(transactions, "Income", lastMonthInterval);
  const lastMonthExpenses = sumByType(transactions, "Expense", lastMonthInterval);

  const thisMonthRemaining = thisMonthIncome - thisMonthExpenses;
  const lastMonthRemaining = lastMonthIncome - lastMonthExpenses;

  // All-time balance: net of every transaction ever, not scoped to a month.
  const totalBalance = transactions.reduce((sum, t) => {
    const amt = Math.abs(Number(t.amount));
    return sum + (t.type === "Income" ? amt : -amt);
  }, 0);
  const balanceLastMonth = totalBalance - thisMonthRemaining;

  return {
    totalBalance,
    totalIncome: thisMonthIncome,
    totalExpenses: thisMonthExpenses,
    remainingMoney: thisMonthRemaining,
    balanceChange: computeChange(totalBalance, balanceLastMonth),
    incomeChange: computeChange(thisMonthIncome, lastMonthIncome),
    expensesChange: computeChange(thisMonthExpenses, lastMonthExpenses),
    remainingChange: computeChange(thisMonthRemaining, lastMonthRemaining),
  };
}

export function formatPeso(amount) {
  return `₱${Math.abs(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}