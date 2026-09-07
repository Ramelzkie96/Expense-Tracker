import {
  ShoppingCart,
  Banknote,
  Car,
  Wifi,
  Coffee,
  ArrowRight,
} from "lucide-react";

const transactions = [
  {
    name: "Groceries",
    category: "Food & Dining",
    date: "Sep 17, 2026",
    amount: "- ₱650.00",
    type: "expense",
    icon: ShoppingCart,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Salary",
    category: "Income",
    date: "Sep 15, 2026",
    amount: "+ ₱45,000.00",
    type: "income",
    icon: Banknote,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    name: "Grab Ride",
    category: "Transportation",
    date: "Sep 15, 2026",
    amount: "- ₱125.00",
    type: "expense",
    icon: Car,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    name: "Internet Bill",
    category: "Bills & Utilities",
    date: "Sep 14, 2026",
    amount: "- ₱1,299.00",
    type: "expense",
    icon: Wifi,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    name: "Coffee",
    category: "Food & Dining",
    date: "Sep 13, 2026",
    amount: "- ₱120.00",
    type: "expense",
    icon: Coffee,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

export default function RecentTransactions() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Recent Transactions
        </h2>

        <button
          type="button"
          className="text-xs font-medium text-blue-600 transition hover:text-blue-700"
        >
          View All
        </button>
      </div>

      {/* Transactions */}
      <div className="mt-4">

        {transactions.map((transaction, index) => {
          const Icon = transaction.icon;

          return (
            <div
              key={transaction.name}
              className={`flex items-center gap-3 py-3 ${
                index !== transactions.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
            >

              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${transaction.iconBg}`}
              >
                <Icon
                  className={`h-5 w-5 ${transaction.iconColor}`}
                />
              </div>

              {/* Transaction Details */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {transaction.name}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {transaction.category}
                </p>
              </div>

              {/* Date */}
              <div className="hidden text-right sm:block">
                <p className="text-xs text-slate-400">
                  {transaction.date}
                </p>
              </div>

              {/* Amount */}
              <div className="w-[105px] text-right">
                <p
                  className={`text-xs font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.amount}
                </p>
              </div>

            </div>
          );
        })}

      </div>

      {/* Bottom Button */}
      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-100 bg-slate-50 py-3 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
      >
        View All Transactions
        <ArrowRight className="h-3.5 w-3.5" />
      </button>

    </div>
  );
}