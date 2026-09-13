import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionExpenses from "./pages/TransactionExpenses";
import TransactionIncome from "./pages/TransactionIncome";
import Budgets from "./pages/Budgets";
import Analytics from "./pages/Analytics";
import Recurring from "./pages/Recurring";
import CalendarPage from "./pages/Calendar";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Transactions */}
        <Route path="/transactions" element={<Transactions />} />
        <Route
          path="/transactions/expenses"
          element={<TransactionExpenses />}
        />
        <Route
          path="/transactions/income"
          element={<TransactionIncome />}
        />

        {/* Budget */}
        <Route path="/budgets" element={<Budgets />} />

        {/* Analytics */}
        <Route path="/analytics" element={<Analytics />} />

        <Route path="/recurring" element={<Recurring />} />


        <Route path="/calendar" element={<CalendarPage />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;