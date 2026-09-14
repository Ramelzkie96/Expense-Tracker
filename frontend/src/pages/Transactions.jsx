import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsToolbar from "../components/transactions/TransactionsToolbar";
import TransactionsTable from "../components/transactions/TransactionsTable";
import TransactionsPagination from "../components/transactions/TransactionsPagination";
import TransactionsFilterPanel from "../components/transactions/TransactionsFilterPanel";
import TransactionsSummaryPanel from "../components/transactions/TransactionsSummaryPanel";
import AddTransactionModal from "../components/ui/transactions/AddTransactionModal";
import { transactions } from "../data/transactions";

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalPages = 6;
  const totalResults = 48;

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netTotal = totalIncome - totalExpenses;
  const savedPct = totalIncome ? Math.round((netTotal / totalIncome) * 100) : 0;

  const handleSaveTransaction = (formData) => {
    // TODO: push formData into real transaction storage/state once wired to a backend
    console.log("New transaction:", formData);
  };

  return (
    <DashboardLayout>
      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <TransactionsHeader onAddTransaction={() => setIsModalOpen(true)} />
            <TransactionsToolbar search={search} onSearchChange={setSearch} />
            <TransactionsTable transactions={transactions} />
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