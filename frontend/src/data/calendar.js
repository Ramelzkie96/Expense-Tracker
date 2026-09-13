import {
  ArrowUp,
  ArrowDown,
  Wallet,
  Percent,
  Home,
  Wifi,
  Smartphone,
  Tv,
  Plus,
  RefreshCw,
  Target,
  BarChart3,
} from "lucide-react";

export const statCards = [
  {
    id: 1,
    label: "Total Income",
    value: 25000,
    icon: ArrowUp,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    change: "+12%",
    changeLabel: "vs last month",
    changeColor: "text-emerald-600",
  },
  {
    id: 2,
    label: "Total Expenses",
    value: 12450,
    icon: ArrowDown,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    change: "-8%",
    changeLabel: "vs last month",
    changeColor: "text-emerald-600",
  },
  {
    id: 3,
    label: "Net Savings",
    value: 12550,
    icon: Wallet,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    change: "+18%",
    changeLabel: "vs last month",
    changeColor: "text-emerald-600",
  },
  {
    id: 4,
    label: "Savings Rate",
    value: "50.2%",
    isPercent: true,
    icon: Percent,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    change: "+6%",
    changeLabel: "vs last month",
    changeColor: "text-emerald-600",
  },
];

// Event "kind" drives the dot/text color via EVENT_KIND_STYLES below.
// kinds: income | expense | bill | transfer | other

export const EVENT_KIND_STYLES = {
  income: { dot: "bg-emerald-500", text: "text-emerald-600" },
  expense: { dot: "bg-rose-500", text: "text-rose-500" },
  bill: { dot: "bg-amber-500", text: "text-amber-600" },
  transfer: { dot: "bg-sky-500", text: "text-sky-600" },
  other: { dot: "bg-violet-500", text: "text-violet-600" },
};

export const legendItems = [
  { label: "Income", kind: "income" },
  { label: "Expense", kind: "expense" },
  { label: "Bills", kind: "bill" },
  { label: "Transfer", kind: "transfer" },
  { label: "Other", kind: "other" },
];

// Hardcoded September 2026 grid: 30 (prev month) + 31 (prev month) lead-in,
// 1-30 for September, then 1, 2, 3 (next month) trailing.
export const calendarWeeks = [
  [
    { date: 30, inCurrentMonth: false, events: [] },
    { date: 31, inCurrentMonth: false, events: [] },
    {
      date: 1,
      inCurrentMonth: true,
      events: [{ label: "Salary", kind: "income", amount: 25000 }],
    },
    {
      date: 2,
      inCurrentMonth: true,
      events: [{ label: "Grocery", kind: "expense", amount: -650 }],
    },
    {
      date: 3,
      inCurrentMonth: true,
      events: [{ label: "Transportation", kind: "transfer", amount: -150 }],
    },
    {
      date: 4,
      inCurrentMonth: true,
      events: [{ label: "Bills & Utilities", kind: "bill", amount: -1850 }],
    },
    {
      date: 5,
      inCurrentMonth: true,
      events: [{ label: "Entertainment", kind: "other", amount: -200 }],
    },
  ],
  [
    {
      date: 6,
      inCurrentMonth: true,
      events: [{ label: "Food & Dining", kind: "expense", amount: -320 }],
    },
    {
      date: 7,
      inCurrentMonth: true,
      isToday: true,
      events: [
        { label: "Food & Dining", kind: "expense", amount: -450 },
        { label: "Groceries", kind: "transfer", amount: -890 },
      ],
    },
    {
      date: 8,
      inCurrentMonth: true,
      events: [{ label: "Transportation", kind: "transfer", amount: -120 }],
    },
    {
      date: 9,
      inCurrentMonth: true,
      events: [{ label: "Shopping", kind: "expense", amount: -1050 }],
    },
    {
      date: 10,
      inCurrentMonth: true,
      events: [{ label: "Internet Bill", kind: "bill", amount: -1299 }],
    },
    {
      date: 11,
      inCurrentMonth: true,
      events: [{ label: "Coffee", kind: "bill", amount: -120 }],
    },
    {
      date: 12,
      inCurrentMonth: true,
      events: [{ label: "Entertainment", kind: "other", amount: -450 }],
    },
  ],
  [
    {
      date: 13,
      inCurrentMonth: true,
      events: [{ label: "Freelance Project", kind: "income", amount: 5000 }],
    },
    {
      date: 14,
      inCurrentMonth: true,
      events: [{ label: "Food & Dining", kind: "expense", amount: -380 }],
    },
    {
      date: 15,
      inCurrentMonth: true,
      events: [{ label: "Rent", kind: "expense", amount: -7500 }],
    },
    {
      date: 16,
      inCurrentMonth: true,
      events: [{ label: "Transportation", kind: "transfer", amount: -180 }],
    },
    {
      date: 17,
      inCurrentMonth: true,
      events: [{ label: "Bills & Utilities", kind: "bill", amount: -1850 }],
    },
    {
      date: 18,
      inCurrentMonth: true,
      events: [{ label: "Groceries", kind: "bill", amount: -620 }],
    },
    {
      date: 19,
      inCurrentMonth: true,
      events: [{ label: "Family", kind: "expense", amount: -1000 }],
    },
  ],
  [
    {
      date: 20,
      inCurrentMonth: true,
      events: [{ label: "Mobile Plan", kind: "expense", amount: -999 }],
    },
    {
      date: 21,
      inCurrentMonth: true,
      events: [{ label: "Food & Dining", kind: "expense", amount: -540 }],
    },
    {
      date: 22,
      inCurrentMonth: true,
      events: [{ label: "Transportation", kind: "transfer", amount: -160 }],
    },
    {
      date: 23,
      inCurrentMonth: true,
      events: [{ label: "Entertainment", kind: "other", amount: -200 }],
    },
    {
      date: 24,
      inCurrentMonth: true,
      events: [{ label: "Shopping", kind: "expense", amount: -1200 }],
    },
    {
      date: 25,
      inCurrentMonth: true,
      events: [{ label: "Salary", kind: "income", amount: 25000 }],
    },
    {
      date: 26,
      inCurrentMonth: true,
      events: [{ label: "Food & Dining", kind: "expense", amount: -410 }],
    },
  ],
  [
    {
      date: 27,
      inCurrentMonth: true,
      events: [{ label: "Groceries", kind: "expense", amount: -780 }],
    },
    {
      date: 28,
      inCurrentMonth: true,
      events: [{ label: "Transportation", kind: "transfer", amount: -140 }],
    },
    {
      date: 29,
      inCurrentMonth: true,
      events: [{ label: "Bills & Utilities", kind: "bill", amount: -1750 }],
    },
    {
      date: 30,
      inCurrentMonth: true,
      events: [{ label: "Entertainment", kind: "other", amount: -300 }],
    },
    { date: 1, inCurrentMonth: false, events: [] },
    { date: 2, inCurrentMonth: false, events: [] },
    { date: 3, inCurrentMonth: false, events: [] },
  ],
];

export const monthSummary = {
  income: 25000,
  expenses: 12450,
  savings: 12550,
  savingsRate: "50.2%",
};

export const upcomingPayments = [
  {
    id: 1,
    label: "Rent",
    icon: Home,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    amount: 7500,
    date: "Sep 15, 2026",
  },
  {
    id: 2,
    label: "Internet Bill",
    icon: Wifi,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    amount: 1299,
    date: "Sep 15, 2026",
  },
  {
    id: 3,
    label: "Mobile Plan",
    icon: Smartphone,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    amount: 999,
    date: "Sep 20, 2026",
  },
  {
    id: 4,
    label: "Netflix",
    icon: Tv,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    amount: 200,
    date: "Sep 25, 2026",
  },
];

export const quickActions = [
  {
    id: 1,
    icon: Plus,
    iconColor: "text-indigo-600",
    label: "Add Transaction",
  },
  {
    id: 2,
    icon: RefreshCw,
    iconColor: "text-indigo-600",
    label: "Add Recurring",
  },
  {
    id: 3,
    icon: Target,
    iconColor: "text-indigo-600",
    label: "Set Budget",
  },
  {
    id: 4,
    icon: BarChart3,
    iconColor: "text-indigo-600",
    label: "View Reports",
  },
];

export function formatPesoPlain(amount) {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}

export function formatPesoSigned(amount) {
  const abs = Math.abs(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? "-" : "+"}₱${abs}`;
}