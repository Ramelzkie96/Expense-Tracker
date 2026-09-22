import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePendingToast } from "../../hooks/usePendingToast";

export default function DashboardLayout({ children }) {
  usePendingToast();
  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="ml-[242px] min-h-screen">
        
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="px-8 py-6">
          {children}
        </main>

      </div>
    </div>
  );
}