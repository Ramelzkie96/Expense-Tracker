import {
  Utensils,
  Car,
  Zap,
  Gamepad2,
  ShoppingBag,
  MoreHorizontal,
  Briefcase,
} from "lucide-react";

export const budgetCategories = [
  {
    id: 1,
    name: "Food & Dining",
    icon: Utensils,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    color: "#4f46e5",
    monthlyBudget: 5000,
    spent: 4200,
    remaining: 800,
    progress: 84,
    status: "On Track",
  },
  {
    id: 2,
    name: "Transportation",
    icon: Car,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    color: "#10b981",
    monthlyBudget: 3000,
    spent: 2150,
    remaining: 850,
    progress: 72,
    status: "On Track",
  },
  {
    id: 3,
    name: "Bills & Utilities",
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    color: "#f59e0b",
    monthlyBudget: 3500,
    spent: 1850,
    remaining: 1650,
    progress: 53,
    status: "On Track",
  },
  {
    id: 4,
    name: "Entertainment",
    icon: Gamepad2,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    color: "#8b5cf6",
    monthlyBudget: 2000,
    spent: 1200,
    remaining: 800,
    progress: 60,
    status: "On Track",
  },
  {
    id: 5,
    name: "Shopping",
    icon: ShoppingBag,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    color: "#ec4899",
    monthlyBudget: 1500,
    spent: 1050,
    remaining: 450,
    progress: 70,
    status: "On Track",
  },
  {
    id: 6,
    name: "Others",
    icon: MoreHorizontal,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    color: "#64748b",
    monthlyBudget: 1500,
    spent: 1000,
    remaining: 500,
    progress: 67,
    status: "On Track",
  },
];

export const budgetSummary = {
  monthlyBudget: 20000,
  totalIncome: 25000,
  totalExpenses: 12450,
};

export const recentBudgetActivity = [
  {
    id: 1,
    label: "Food & Dining",
    icon: Utensils,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    date: "Sep 5, 2026",
    amount: -320,
  },
  {
    id: 2,
    label: "Transportation",
    icon: Car,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    date: "Sep 4, 2026",
    amount: -150,
  },
  {
    id: 3,
    label: "Salary",
    icon: Briefcase,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    date: "Sep 1, 2026",
    amount: 25000,
  },
  {
    id: 4,
    label: "Bills & Utilities",
    icon: Zap,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    date: "Aug 28, 2026",
    amount: -1299,
  },
  {
    id: 5,
    label: "Shopping",
    icon: ShoppingBag,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    date: "Aug 26, 2026",
    amount: -450,
  },
];

export function formatPeso(amount) {
  const abs = Math.abs(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? "-" : "+"} ₱${abs}`;
}

export function formatPesoPlain(amount) {
  return `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;
}