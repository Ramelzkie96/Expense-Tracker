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
const LOCKED_TYPE = "Income";

export default function TransactionIncome() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dateRange, setDateRange] = useState(undefined);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const income = transactions.filter((t) => t.type === LOCKED_TYPE);

  const filteredIncome = income.filter((t) => {
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

  const totalResults = filteredIncome.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const paginatedIncome = filteredIncome.slice(
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

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setPage(1);
  }, [search, category, paymentMethod, dateRange]);

  // Summary reflects ALL income/expenses (not just the filtered income
  // list) so "Net Total" and "% saved" stay meaningful on this page.
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netTotal = totalIncome - totalExpenses;
  const savedPct = totalIncome ? Math.round((netTotal / totalIncome) * 100) : 0;

  const handleSaveTransaction = () => {
    loadTransactions();
    setPage(1);
  };

  return (
    <DashboardLayout>
      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <TransactionsHeader
              title="All Income"
              subtitle="Track your earnings and cash inflows"
              addButtonLabel="Add Income"
              onAddTransaction={() => setIsModalOpen(true)}
            />
            <TransactionsToolbar
              search={search}
              onSearchChange={setSearch}
              showTypeFilter={false}
              category={category}
              onCategoryChange={setCategory}
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
            {isLoading ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                Loading income...
              </p>
            ) : income.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                No income yet. Click "Add Income" to create one.
              </p>
            ) : filteredIncome.length === 0 ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                No income matches your filters.
              </p>
            ) : (
              <TransactionsTable transactions={paginatedIncome} />
            )}
            <TransactionsPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              shownCount={paginatedIncome.length}
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
        lockedType="Income"
      />
    </DashboardLayout>
  );
}