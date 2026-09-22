import DashboardLayout from "../components/layout/DashboardLayout";
import SummaryCard from "../components/dashboard/SummaryCard";
import MonthlySummary from "../components/dashboard/MonthlySummary";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";

import {
  Wallet,
  ArrowDown,
  ArrowUp,
  WalletCards,
} from "lucide-react";

export default function Dashboard() {
  
  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* ============================= */}
        {/* Summary Cards */}
        {/* ============================= */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            title="Total Balance"
            amount="₱28,450.00"
            subtitle="All accounts"
            icon={Wallet}
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            lineColor="text-blue-500"
            percentage="12.5%"
            trend="up"
          />

          <SummaryCard
            title="Total Income"
            amount="₱45,000.00"
            subtitle="This month"
            icon={ArrowDown}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            lineColor="text-emerald-500"
            percentage="8.3%"
            trend="up"
          />

          <SummaryCard
            title="Total Expenses"
            amount="₱16,550.00"
            subtitle="This month"
            icon={ArrowUp}
            iconBg="bg-red-100"
            iconColor="text-red-500"
            lineColor="text-red-500"
            percentage="15.7%"
            trend="up"
          />

          <SummaryCard
            title="Remaining Money"
            amount="₱28,450.00"
            subtitle="This month"
            icon={WalletCards}
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
            lineColor="text-orange-500"
            percentage="5.2%"
            trend="up"
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