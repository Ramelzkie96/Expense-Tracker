import {
  ShoppingCart,
  Car,
  Receipt,
  ShoppingBag,
  Tv,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";

const categories = [
  {
    name: "Food & Dining",
    amount: "₱6,120.00",
    percentage: 37,
    color: "bg-blue-600",
    icon: ShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Transportation",
    amount: "₱3,800.00",
    percentage: 23,
    color: "bg-emerald-500",
    icon: Car,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Bills & Utilities",
    amount: "₱2,480.00",
    percentage: 15,
    color: "bg-orange-500",
    icon: Receipt,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    name: "Shopping",
    amount: "₱1,650.00",
    percentage: 10,
    color: "bg-purple-500",
    icon: ShoppingBag,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    name: "Entertainment",
    amount: "₱1,320.00",
    percentage: 8,
    color: "bg-red-500",
    icon: Tv,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    name: "Others",
    amount: "₱1,180.00",
    percentage: 7,
    color: "bg-cyan-500",
    icon: MoreHorizontal,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-500",
  },
];

export default function MonthlySummary() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Current Month Summary
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-gray-50"
        >
          This Month
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>

      {/* Chart + Categories */}
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">

        {/* Donut Chart */}
        <div className="flex shrink-0 justify-center lg:w-[48%]">
          <div
            className="relative flex h-56 w-56 items-center justify-center rounded-full"
            style={{
              background:
                "conic-gradient(#4f46e5 0% 37%, #10b981 37% 60%, #f97316 60% 75%, #a855f7 75% 85%, #ef4444 85% 93%, #06b6d4 93% 100%)",
            }}
          >
            {/* White center */}
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-xs text-slate-500">
                Total Expenses
              </span>

              <span className="mt-1 text-lg font-bold text-slate-800">
                ₱16,550.00
              </span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="w-full space-y-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.name}
                className="flex items-center gap-3"
              >
                {/* Icon */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${category.iconBg}`}
                >
                  <Icon
                    className={`h-4 w-4 ${category.iconColor}`}
                  />
                </div>

                {/* Category Name */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700">
                    {category.name}
                  </p>
                </div>

                {/* Amount */}
                <span className="text-xs font-medium text-slate-600">
                  {category.amount}
                </span>

                {/* Percentage */}
                <span className="w-7 text-right text-xs text-slate-400">
                  {category.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="mt-6 grid grid-cols-3 divide-x rounded-lg border border-gray-100 bg-slate-50/50 py-4">

        {/* Daily Average */}
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Daily Average
          </p>

          <p className="mt-1 text-sm font-bold text-slate-800">
            ₱551.67
          </p>
        </div>

        {/* Highest Expense */}
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Highest Expense
          </p>

          <p className="mt-1 text-sm font-bold text-slate-800">
            ₱1,250.00
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            Sep 12, 2026
          </p>
        </div>

        {/* Transactions */}
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Transactions
          </p>

          <p className="mt-1 text-sm font-bold text-slate-800">
            48
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            This month
          </p>
        </div>

      </div>
    </div>
  );
}