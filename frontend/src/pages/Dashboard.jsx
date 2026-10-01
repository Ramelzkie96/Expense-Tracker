import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import MonthlySummary from "../components/dashboard/MonthlySummary";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { getDashboardTransactions } from "../services/transactions";
import { computeDashboardSummary, formatPeso } from "../utils/dashboardSummary";

import { Wallet, ArrowDown, ArrowUp, WalletCards } from "lucide-react";

export default function Dashboard() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getDashboardTransactions(supabase, user.id)
      .then((rows) => setSummary(computeDashboardSummary(rows)))
      .catch((err) => {
        console.error("Failed to load dashboard summary:", err);
        toast.error("Failed to load dashboard summary.");
      })
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  const fmtPct = (n) => `${n.toFixed(1)}%`;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ============================= */}
        {/* Summary Cards */}
        {/* ============================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Balance"
            amount={
              isLoading || !summary ? "—" : formatPeso(summary.totalBalance)
            }
            subtitle="All accounts"
            icon={Wallet}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            lineColor="text-blue-500"
            percentage={
              isLoading || !summary ? "" : fmtPct(summary.balanceChange.percentage)
            }
            trend={summary?.balanceChange.trend ?? "up"}
          />

          <SummaryCard
            title="Total Income"
            amount={
              isLoading || !summary ? "—" : formatPeso(summary.totalIncome)
            }
            subtitle="This month"
            icon={ArrowDown}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            lineColor="text-emerald-500"
            percentage={
              isLoading || !summary ? "" : fmtPct(summary.incomeChange.percentage)
            }
            trend={summary?.incomeChange.trend ?? "up"}
          />

          <SummaryCard
            title="Total Expenses"
            amount={
              isLoading || !summary ? "—" : formatPeso(summary.totalExpenses)
            }
            subtitle="This month"
            icon={ArrowUp}
            iconBg="bg-red-100"
            iconColor="text-red-500"
            lineColor="text-red-500"
            percentage={
              isLoading || !summary ? "" : fmtPct(summary.expensesChange.percentage)
            }
            trend={summary?.expensesChange.trend ?? "up"}
          />

          <SummaryCard
            title="Remaining Money"
            amount={
              isLoading || !summary ? "—" : formatPeso(summary.remainingMoney)
            }
            subtitle="This month"
            icon={WalletCards}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
            lineColor="text-orange-500"
            percentage={
              isLoading || !summary ? "" : fmtPct(summary.remainingChange.percentage)
            }
            trend={summary?.remainingChange.trend ?? "up"}
          />
        </div>

        {/* ============================= */}
        {/* Monthly Summary + Transactions */}
        {/* ============================= */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
          <div className="xl:col-span-3">
            <MonthlySummary />
          </div>

          <div className="xl:col-span-2">
            <RecentTransactions />
          </div>
        </div>

        {/* ============================= */}
        {/* Income vs Expense */}
        {/* ============================= */}
        <IncomeExpenseChart />
      </div>
    </DashboardLayout>
  );
}