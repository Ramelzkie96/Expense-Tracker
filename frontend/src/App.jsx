import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionExpenses from "./pages/TransactionExpenses";
import TransactionIncome from "./pages/TransactionIncome";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;