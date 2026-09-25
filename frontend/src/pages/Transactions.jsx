import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "sonner";
import { format } from "date-fns";
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

const PAGE_SIZE = 10;

export default function Transactions() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dateRange, setDateRange] = useState(undefined); // { from: Date, to: Date } | undefined
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const filteredTransactions = transactions.filter((t) => {
    if (type && t.type !== type) return false;
    if (category && t.category !== category.name) return false;
    if (paymentMethod && t.method !== paymentMethod.name) return false;

    if (dateRange?.from) {
      const fromStr = format(dateRange.from, "yyyy-MM-dd");
      const toStr = format(dateRange.to ?? dateRange.from, "yyyy-MM-dd");
      if (t.rawDate < fromStr || t.rawDate > toStr) return false;
    }

    if (search) {
      const q = search.toLowerCase();
      const amountStr = Math.abs(t.amount).toFixed(2);
      const matches =
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.method.toLowerCase().includes(q) ||
        amountStr.includes(q);
      if (!matches) return false;
    }

    return true;
  });

  const totalResults = filteredTransactions.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

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

  // If the list shrinks (e.g. after filtering/deleting) and the current
  // page no longer exists, snap back to the last valid page.
  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  // Any filter change should reset back to page 1
  useEffect(() => {
    setPage(1);
  }, [search, type, category, paymentMethod, dateRange]);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netTotal = totalIncome - totalExpenses;
  const savedPct = totalIncome ? Math.round((netTotal / totalIncome) * 100) : 0;

  const handleSaveTransaction = () => {
    // Re-fetch so ordering and joined category/payment-method data stay correct.
    loadTransactions();
    setPage(1);
  };

  return (
    <DashboardLayout>
      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <TransactionsHeader onAddTransaction={() => setIsModalOpen(true)} />
            <TransactionsToolbar
              search={search}
              onSearchChange={setSearch}
              type={type}
              onTypeChange={setType}
              category={category}
              onCategoryChange={setCategory}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
            {isLoading ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                Loading transactions...
              </p>
            ) : transactions.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                No transactions yet. Click "Add Transaction" to create one.
              </p>
            ) : filteredTransactions.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                No transactions match your filters.
              </p>
            ) : (
              <TransactionsTable transactions={paginatedTransactions} />
            )}
            <TransactionsPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              shownCount={paginatedTransactions.length}
              totalResults={totalResults}
              pageSize={PAGE_SIZE}
            />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[280px] shrink-0 space-y-5">
          <TransactionsFilterPanel
            dateRange={dateRange}
            onApply={setDateRange}
            onClear={() => setDateRange(undefined)}
          />
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