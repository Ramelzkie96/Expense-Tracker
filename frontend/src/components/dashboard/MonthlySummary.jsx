import {
  ShoppingCart,
  Car,
  Receipt,
  ShoppingBag,
  Tv,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const categories = [
  {
    name: "Food & Dining",
    amount: "₱6,120.00",
    value: 37,
    color: "#4f46e5",
    icon: ShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Transportation",
    amount: "₱3,800.00",
    value: 23,
    color: "#10b981",
    icon: Car,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Bills & Utilities",
    amount: "₱2,480.00",
    value: 15,
    color: "#f97316",
    icon: Receipt,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    name: "Shopping",
    amount: "₱1,650.00",
    value: 10,
    color: "#a855f7",
    icon: ShoppingBag,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    name: "Entertainment",
    amount: "₱1,320.00",
    value: 8,
    color: "#ef4444",
    icon: Tv,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    name: "Others",
    amount: "₱1,180.00",
    value: 7,
    color: "#06b6d4",
    icon: MoreHorizontal,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-500",
  },
];

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
          <div className="relative flex h-56 w-56 items-center justify-center overflow-visible">
            <PieChart width={224} height={224}>
              <Pie
                data={categories}
                dataKey="value"
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
                  {category.value}%
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