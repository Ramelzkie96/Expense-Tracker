import DashboardLayout from "../components/layout/DashboardLayout";
import { useState } from "react";
import {
  Download,
  Plus,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Tag,
  CreditCard,
  Filter,
  Calendar,
  ShoppingCart,
  Car,
  Wifi,
  Utensils,
  Coffee,
  Ticket,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    date: "Sep 17, 2026",
    time: "09:30 AM",
    title: "Grocery Shopping",
    subtitle: "Robinsons Supermarket",
    icon: ShoppingCart,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    category: "Food & Dining",
    categoryColor: "text-emerald-600",
    categoryBg: "bg-emerald-50",
    method: "GCash",
    methodIcon: "🇨",
    type: "Expense",
    amount: -650,
  },
  {
    id: 2,
    date: "Sep 16, 2026",
    time: "08:45 AM",
    title: "Salary",
    subtitle: "September Salary",
    icon: Briefcase,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    category: "Income",
    categoryColor: "text-indigo-600",
    categoryBg: "bg-indigo-50",
    method: "Bank Transfer",
    methodIcon: "🏦",
    type: "Income",
    amount: 45000,
  },
  {
    id: 3,
    date: "Sep 15, 2026",
    time: "07:20 PM",
    title: "Grab Ride",
    subtitle: "To Ayala Center Cebu",
    icon: Car,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    category: "Transportation",
    categoryColor: "text-sky-600",
    categoryBg: "bg-sky-50",
    method: "GrabPay",
    methodIcon: "🟢",
    type: "Expense",
    amount: -125,
  },
  {
    id: 4,
    date: "Sep 15, 2026",
    time: "12:15 PM",
    title: "Internet Bill",
    subtitle: "PLDT Home Fiber",
    icon: Wifi,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    category: "Bills & Utilities",
    categoryColor: "text-orange-600",
    categoryBg: "bg-orange-50",
    method: "Bank Transfer",
    methodIcon: "🏦",
    type: "Expense",
    amount: -1299,
  },
  {
    id: 5,
    date: "Sep 14, 2026",
    time: "06:40 PM",
    title: "Dinner",
    subtitle: "Food Panda",
    icon: Utensils,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    category: "Food & Dining",
    categoryColor: "text-emerald-600",
    categoryBg: "bg-emerald-50",
    method: "GCash",
    methodIcon: "🇨",
    type: "Expense",
    amount: -320,
  },
  {
    id: 6,
    date: "Sep 13, 2026",
    time: "11:30 AM",
    title: "Freelance Project",
    subtitle: "Logo Design",
    icon: ShoppingCart,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    category: "Income",
    categoryColor: "text-indigo-600",
    categoryBg: "bg-indigo-50",
    method: "PayPal",
    methodIcon: "🅿️",
    type: "Income",
    amount: 5000,
  },
  {
    id: 7,
    date: "Sep 12, 2026",
    time: "03:25 PM",
    title: "Movie Tickets",
    subtitle: "SM Cinema",
    icon: Ticket,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    category: "Entertainment",
    categoryColor: "text-violet-600",
    categoryBg: "bg-violet-50",
    method: "Credit Card",
    methodIcon: "💳",
    type: "Expense",
    amount: -450,
  },
  {
    id: 8,
    date: "Sep 12, 2026",
    time: "09:15 AM",
    title: "Coffee",
    subtitle: "Bo's Coffee",
    icon: Coffee,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    category: "Food & Dining",
    categoryColor: "text-emerald-600",
    categoryBg: "bg-emerald-50",
    method: "Cash",
    methodIcon: "💵",
    type: "Expense",
    amount: -120,
  },
];

function formatPeso(amount) {
  const abs = Math.abs(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? "-" : "+"} ₱${abs}`;
}

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const totalPages = 6;
  const totalResults = 48;

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netTotal = totalIncome - totalExpenses;
  const savedPct = totalIncome
    ? Math.round((netTotal / totalIncome) * 100)
    : 0;

  return (
    <DashboardLayout>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold tracking-[-0.4px] text-slate-800">
          Transactions
        </h1>
        <div className="mt-1 flex items-center gap-2 text-[13px] text-slate-500">
          <span>Home</span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700">Transactions</span>
        </div>
      </div>

      <div className="flex items-start gap-6">
        {/* ================= Main column ================= */}
        <div className="min-w-0 flex-1">
          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Card header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-[17px] font-bold text-slate-800">
                  All Transactions
                </h2>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  Manage all your income and expenses
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                  <Download size={15} strokeWidth={2.2} />
                  Export
                </button>
                <button className="flex h-[38px] items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 pl-3.5 pr-2.5 text-[13px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95">
                  <Plus size={15} strokeWidth={2.4} />
                  Add Transaction
                  <ChevronDown size={14} strokeWidth={2.4} className="ml-1 opacity-80" />
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mb-5 flex flex-wrap items-center gap-2.5">
              <div className="relative min-w-[220px] flex-1">
                <Search
                  size={15}
                  strokeWidth={2}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search transactions..."
                  className="h-[38px] w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-[13px] text-slate-700 placeholder:text-slate-400 outline-none transition-colors focus:border-indigo-400"
                />
              </div>

              <ToolbarDropdown icon={SlidersHorizontal} label="Type" />
              <ToolbarDropdown icon={Tag} label="Category" />
              <ToolbarDropdown icon={CreditCard} label="Payment Method" />
              <ToolbarDropdown icon={Filter} label="More Filters" caret={false} />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-[12px] font-semibold text-slate-400">
                    <th className="pb-3 pr-4 font-semibold">Date</th>
                    <th className="pb-3 pr-4 font-semibold">Description</th>
                    <th className="pb-3 pr-4 font-semibold">Category</th>
                    <th className="pb-3 pr-4 font-semibold">Payment Method</th>
                    <th className="pb-3 pr-4 font-semibold">Type</th>
                    <th className="pb-3 pr-4 text-right font-semibold">Amount</th>
                    <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => {
                    const Icon = t.icon;
                    return (
                      <tr
                        key={t.id}
                        className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="whitespace-nowrap py-4 pr-4 align-top">
                          <p className="text-[13px] font-medium text-slate-700">{t.date}</p>
                          <p className="text-[12px] text-slate-400">{t.time}</p>
                        </td>

                        <td className="py-4 pr-4 align-top">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.iconBg}`}
                            >
                              <Icon size={16} strokeWidth={2} className={t.iconColor} />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-[13.5px] font-semibold text-slate-800">
                                {t.title}
                              </p>
                              <p className="truncate text-[12px] text-slate-400">
                                {t.subtitle}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="whitespace-nowrap py-4 pr-4 align-top">
                          <span
                            className={`inline-flex items-center rounded-full ${t.categoryBg} px-2.5 py-1 text-[12px] font-medium ${t.categoryColor}`}
                          >
                            {t.category}
                          </span>
                        </td>

                        <td className="whitespace-nowrap py-4 pr-4 align-top">
                          <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
                            <span>{t.methodIcon}</span>
                            {t.method}
                          </span>
                        </td>

                        <td className="whitespace-nowrap py-4 pr-4 align-top">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
                              t.type === "Income"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-rose-50 text-rose-500"
                            }`}
                          >
                            {t.type}
                          </span>
                        </td>

                        <td
                          className={`whitespace-nowrap py-4 pr-4 text-right align-top text-[13.5px] font-semibold ${
                            t.amount < 0 ? "text-rose-500" : "text-emerald-600"
                          }`}
                        >
                          {formatPeso(t.amount)}
                        </td>

                        <td className="whitespace-nowrap py-4 pl-4 text-right align-top">
                          <button className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-[13px] text-slate-500">
                Showing 1 to {transactions.length} of {totalResults} transactions
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
                  disabled={page === 1}
                >
                  <ChevronLeft size={15} />
                </button>

                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${
                      page === n
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <span className="px-1 text-slate-400">…</span>

                <button
                  onClick={() => setPage(6)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${
                    page === 6
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  6
                </button>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-40"
                  disabled={page === totalPages}
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Right sidebar ================= */}
        <div className="w-[280px] shrink-0 space-y-5">
          {/* Filters card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-800">Filters</h3>
              <button className="text-[12.5px] font-semibold text-indigo-600 hover:text-indigo-700">
                Clear All
              </button>
            </div>

            <FilterField label="Date Range">
              <div className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 px-3 text-[12.5px] text-slate-600">
                <Calendar size={14} className="shrink-0 text-slate-400" />
                <span className="truncate">Sep 1 – Sep 30, 2026</span>
              </div>
            </FilterField>

            <FilterField label="Type">
              <SelectBox value="All Types" />
            </FilterField>

            <FilterField label="Category">
              <SelectBox value="All Categories" />
            </FilterField>

            <FilterField label="Payment Method" last>
              <SelectBox value="All Methods" />
            </FilterField>

            <button className="mt-1 h-[42px] w-full rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-[13.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95">
              Apply Filters
            </button>
          </div>

          {/* Summary card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-slate-800">Summary</h3>
              <button className="flex items-center gap-1 text-[12.5px] font-medium text-slate-500 hover:text-slate-700">
                This Month
                <ChevronDown size={13} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-500">Total Income</span>
                <span className="text-[14px] font-bold text-emerald-600">
                  ₱{totalIncome.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-slate-500">Total Expenses</span>
                <span className="text-[14px] font-bold text-rose-500">
                  ₱{totalExpenses.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <span className="block text-[13px] text-slate-500">Net Total</span>
                <span className="text-[19px] font-bold text-slate-800">
                  ₱{netTotal.toLocaleString("en-PH", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Gauge */}
            <div className="mt-5 flex flex-col items-center">
              <svg width="150" height="90" viewBox="0 0 150 90">
                <path
                  d="M 15 85 A 60 60 0 0 1 135 85"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M 15 85 A 60 60 0 0 1 135 85"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${(savedPct / 100) * 188.5} 188.5`}
                />
              </svg>
              <p className="-mt-6 text-[20px] font-bold text-slate-800">{savedPct}%</p>
              <p className="text-[12px] text-slate-500">of income saved</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ToolbarDropdown({ icon: Icon, label, caret = true }) {
  return (
    <button className="flex h-[38px] items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50">
      <Icon size={15} strokeWidth={2} className="text-slate-400" />
      {label}
      {caret && <ChevronDown size={14} strokeWidth={2} className="text-slate-400" />}
    </button>
  );
}

function FilterField({ label, children, last = false }) {
  return (
    <div className={last ? "mb-4" : "mb-4"}>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectBox({ value }) {
  return (
    <button className="flex h-[38px] w-full items-center justify-between rounded-lg border border-slate-200 px-3 text-[12.5px] text-slate-600 transition-colors hover:bg-slate-50">
      {value}
      <ChevronDown size={14} className="text-slate-400" />
    </button>
  );
}