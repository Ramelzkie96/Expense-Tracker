import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePendingToast } from "../../hooks/usePendingToast";

export default function DashboardLayout({ children }) {
  usePendingToast();
  return (
    <div className="min-h-screen bg-[#f8f9fc]">

      {/* Sidebar (drawer on mobile, fixed column on desktop) */}
      <Sidebar />

      {/* Main Area */}
      <div className="min-h-screen min-w-0 pt-14 lg:ml-[242px] lg:pt-0">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
          {children}
        </main>

      </div>
    </div>
  );
}