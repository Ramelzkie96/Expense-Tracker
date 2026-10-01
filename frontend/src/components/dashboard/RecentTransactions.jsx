import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";
import { useSupabaseClient } from "../../hooks/useSupabaseClient";
import { getTransactions } from "../../services/transactions";
import { mapTransactionRow } from "../../utils/transactionMapper";
import { formatPeso } from "../../data/transactions";

const RECENT_COUNT = 5;

export default function RecentTransactions() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getTransactions(supabase, user.id)
      .then((rows) =>
        // getTransactions already returns newest first
        setTransactions(rows.slice(0, RECENT_COUNT).map(mapTransactionRow))
      )
      .catch((err) => console.error("Failed to load recent transactions:", err))
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-800">
          Recent Transactions
        </h2>

      </div>

      {/* Transactions */}
      <div className="mt-4">
        {isLoading ? (
          <p className="py-10 text-center text-[13px] text-slate-400">
            Loading transactions...
          </p>
        ) : transactions.length === 0 ? (
          <p className="py-10 text-center text-[13px] text-slate-400">
            No transactions yet.
          </p>
        ) : (
          transactions.map((t, index) => {
            const Icon = t.icon;

            return (
              <div
                key={t.id}
                className={`flex items-center gap-3 py-3 ${
                  index !== transactions.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${t.iconColor}`} />
                </div>

                {/* Transaction Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {t.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">{t.category}</p>
                </div>

                {/* Date */}
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-slate-400">{t.date}</p>
                </div>

                {/* Amount */}
                <div className="w-[105px] text-right">
                  <p
                    className={`text-xs font-semibold ${
                      t.type === "Income" ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    {formatPeso(t.amount)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Button */}
      <Link
        to="/transactions"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-100 bg-slate-50 py-3 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
      >
        View All Transactions
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}