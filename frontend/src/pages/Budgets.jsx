import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import BudgetOverviewCards from "../components/budgets/BudgetOverviewCards";
import SpendingByCategoryCard from "../components/budgets/SpendingByCategoryCard";
import BudgetCategoriesTable from "../components/budgets/BudgetCategoriesTable";
import BudgetProgressCard from "../components/budgets/BudgetProgressCard";
import RecentBudgetActivityCard from "../components/budgets/RecentBudgetActivityCard";
import AddBudgetModal from "../components/ui/budgets/AddBudgetModal";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { getBudgets } from "../services/budgets";
import { getTransactions } from "../services/transactions";
import { mapTransactionRow } from "../utils/transactionMapper";
import {
  computeBudgetOverview,
  computeCategorySpending,
  computeBudgetCategoryRows,
  computeRecentBudgetActivity,
} from "../utils/budgetSummary";

export default function Budgets() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(() => {
    if (!user) return;
    setIsLoading(true);
    Promise.all([
      getBudgets(supabase, user.id),
      getTransactions(supabase, user.id),
    ])
      .then(([budgetRows, transactionRows]) => {
        setBudgets(budgetRows);
        setTransactions(transactionRows.map(mapTransactionRow));
      })
      .catch((err) => {
        console.error("Failed to load budget data:", err);
        toast.error("Failed to load budget data.");
      })
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const overview = computeBudgetOverview(budgets, transactions);
  const categorySpending = computeCategorySpending(transactions);
  const categoryRows = computeBudgetCategoryRows(budgets, transactions);
  const recentActivity = computeRecentBudgetActivity(transactions);

  const handleSaveBudget = () => {
    // Re-fetch so the Overview cards reflect the newly saved/updated budget.
    loadData();
  };

  return (
    <DashboardLayout>
      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          {isLoading ? (
            <p className="py-10 text-center text-[13px] text-slate-400">
              Loading budgets...
            </p>
          ) : (
            <BudgetOverviewCards
              monthlyBudget={overview.monthlyBudget}
              totalSpent={overview.totalSpent}
              totalIncome={overview.totalIncome}
              totalExpenses={overview.totalExpenses}
              remaining={overview.remaining}
              spentPct={overview.spentPct}
            />
          )}

          <SpendingByCategoryCard
            categories={categorySpending}
            totalSpent={overview.totalSpent}
          />

          <BudgetCategoriesTable
            categories={categoryRows}
            onAddBudget={() => setIsModalOpen(true)}
          />
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 space-y-5">
          <BudgetProgressCard
            spent={overview.totalSpent}
            remaining={overview.remaining}
            spentPct={overview.spentPct}
          />
          <RecentBudgetActivityCard activity={recentActivity} />
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