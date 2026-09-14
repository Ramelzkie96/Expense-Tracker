import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import BudgetOverviewCards from "../components/budgets/BudgetOverviewCards";
import SpendingByCategoryCard from "../components/budgets/SpendingByCategoryCard";
import BudgetCategoriesTable from "../components/budgets/BudgetCategoriesTable";
import BudgetProgressCard from "../components/budgets/BudgetProgressCard";
import RecentBudgetActivityCard from "../components/budgets/RecentBudgetActivityCard";
import AddBudgetModal from "../components/ui/budgets/AddBudgetModal";
import {
  budgetCategories,
  budgetSummary,
  recentBudgetActivity,
} from "../data/budgets";

export default function Budgets() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalSpent = budgetCategories.reduce((sum, c) => sum + c.spent, 0);
  const remaining = budgetSummary.monthlyBudget - totalSpent;
  const spentPct = Math.round((totalSpent / budgetSummary.monthlyBudget) * 100);

  const handleSaveBudget = (formData) => {
    // TODO: push formData into real budget storage/state once wired to a backend
    console.log("New budget:", formData);
  };

  return (
    <DashboardLayout>
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
            onAddBudget={() => setIsModalOpen(true)}
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

      <AddBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBudget}
      />
    </DashboardLayout>
  );
}