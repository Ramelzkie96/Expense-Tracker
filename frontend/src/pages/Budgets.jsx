import DashboardLayout from "../components/layout/DashboardLayout";
import BudgetOverviewCards from "../components/budgets/BudgetOverviewCards";
import SpendingByCategoryCard from "../components/budgets/SpendingByCategoryCard";
import BudgetCategoriesTable from "../components/budgets/BudgetCategoriesTable";
import BudgetProgressCard from "../components/budgets/BudgetProgressCard";
import RecentBudgetActivityCard from "../components/budgets/RecentBudgetActivityCard";
import {
  budgetCategories,
  budgetSummary,
  recentBudgetActivity,
} from "../data/budgets";

export default function Budgets() {
  const totalSpent = budgetCategories.reduce((sum, c) => sum + c.spent, 0);
  const remaining = budgetSummary.monthlyBudget - totalSpent;
  const spentPct = Math.round((totalSpent / budgetSummary.monthlyBudget) * 100);

  const handleAddBudget = () => {
    // wire up to a modal / form later
  };

  return (
    <DashboardLayout>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold tracking-[-0.4px] text-slate-800">
          Budget
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Set your spending limits and stay on track
        </p>
      </div>

      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <BudgetOverviewCards
            monthlyBudget={budgetSummary.monthlyBudget}
            totalSpent={totalSpent}
            totalIncome={budgetSummary.totalIncome}
            totalExpenses={budgetSummary.totalExpenses}
            remaining={remaining}
          />

          <SpendingByCategoryCard
            categories={budgetCategories}
            totalSpent={totalSpent}
          />

          <BudgetCategoriesTable
            categories={budgetCategories}
            onAddBudget={handleAddBudget}
          />
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 space-y-5">
          <BudgetProgressCard
            spent={totalSpent}
            remaining={remaining}
            spentPct={spentPct}
          />
          <RecentBudgetActivityCard activity={recentBudgetActivity} />
        </div>
      </div>
    </DashboardLayout>
  );
}