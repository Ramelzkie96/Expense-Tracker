import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsToolbar from "../components/transactions/TransactionsToolbar";
import TransactionsTable from "../components/transactions/TransactionsTable";
import TransactionsPagination from "../components/transactions/TransactionsPagination";
import TransactionsFilterPanel from "../components/transactions/TransactionsFilterPanel";
import TransactionsSummaryPanel from "../components/transactions/TransactionsSummaryPanel";
import { transactions } from "../data/transactions";

export default function TransactionExpenses() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const expenses = transactions.filter((t) => t.type === "Expense");

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netTotal = totalIncome - totalExpenses;
  const savedPct = totalIncome ? Math.round((netTotal / totalIncome) * 100) : 0;

  const totalPages = 1;

  return (
    <DashboardLayout>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold tracking-[-0.4px] text-slate-800">
          Expenses
        </h1>
        <div className="mt-1 flex items-center gap-2 text-[13px] text-slate-500">
          <span>Home</span>
          <span className="text-slate-300">›</span>
          <span>Transactions</span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700">Expenses</span>
        </div>
      </div>

      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <TransactionsHeader
              title="All Expenses"
              subtitle="Track where your money is going"
            />
            <TransactionsToolbar search={search} onSearchChange={setSearch} />
            <TransactionsTable transactions={expenses} />
            <TransactionsPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              shownCount={expenses.length}
              totalResults={expenses.length}
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
    </DashboardLayout>
  );
}