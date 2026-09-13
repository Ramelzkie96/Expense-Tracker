import DashboardLayout from "../components/layout/DashboardLayout";
import AnalyticsStatCards from "../components/analytics/AnalyticsStatCards";
import SpendingTrendChart from "../components/analytics/SpendingTrendChart";
import ExpenseBreakdownCard from "../components/analytics/ExpenseBreakdownCard";
import SpendingByCategoryChart from "../components/analytics/SpendingByCategoryChart";
import MonthlyComparisonChart from "../components/analytics/MonthlyComparisonChart";
import RecentTransactionsCard from "../components/analytics/RecentTransactionsCard";
import SpendingByDayChart from "../components/analytics/SpendingByDayChart";
import QuickInsightsCard from "../components/analytics/QuickInsightsCard";
import BudgetProgressList from "../components/analytics/BudgetProgressList";

export default function Analytics() {
  return (
    <DashboardLayout>
      <AnalyticsStatCards />

      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1 space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SpendingTrendChart />
            <ExpenseBreakdownCard />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SpendingByCategoryChart />
            <MonthlyComparisonChart />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RecentTransactionsCard />
            <SpendingByDayChart />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 space-y-5">
          <QuickInsightsCard />
          <BudgetProgressList />
        </div>
      </div>
    </DashboardLayout>
  );
}