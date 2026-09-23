import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsToolbar from "../components/transactions/TransactionsToolbar";
import TransactionsTable from "../components/transactions/TransactionsTable";
import TransactionsPagination from "../components/transactions/TransactionsPagination";
import TransactionsFilterPanel from "../components/transactions/TransactionsFilterPanel";
import TransactionsSummaryPanel from "../components/transactions/TransactionsSummaryPanel";
import AddTransactionModal from "../components/ui/transactions/AddTransactionModal";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { getTransactions } from "../services/transactions";
import { mapTransactionRow } from "../utils/transactionMapper";

export default function Transactions() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: wire up real server-side pagination once the transaction list grows;
  // for now everything returned by getTransactions is shown on one page.
  const totalPages = 1;
  const totalResults = transactions.length;

  const loadTransactions = useCallback(() => {
    if (!user) return;
    setIsLoading(true);
    getTransactions(supabase, user.id)
      .then((rows) => setTransactions(rows.map(mapTransactionRow)))
      .catch((err) => {
        console.error("Failed to load transactions:", err);
        toast.error("Failed to load transactions.");
      })
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netTotal = totalIncome - totalExpenses;
  const savedPct = totalIncome ? Math.round((netTotal / totalIncome) * 100) : 0;

  const handleSaveTransaction = () => {
    // Re-fetch so ordering and joined category/payment-method data stay correct.
    loadTransactions();
  };

  return (
    <DashboardLayout>
      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <TransactionsHeader onAddTransaction={() => setIsModalOpen(true)} />
            <TransactionsToolbar search={search} onSearchChange={setSearch} />
            {isLoading ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                Loading transactions...
              </p>
            ) : transactions.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                No transactions yet. Click "Add Transaction" to create one.
              </p>
            ) : (
              <TransactionsTable transactions={transactions} />
            )}
            <TransactionsPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              shownCount={transactions.length}
              totalResults={totalResults}
            />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[280px] shrink-0 space-y-5">
          <TransactionsFilterPanel />
          <TransactionsSummaryPanel
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netTotal={netTotal}
            savedPct={savedPct}
          />
        </div>
      </div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </DashboardLayout>
  );
}