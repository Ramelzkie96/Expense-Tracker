import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import CalendarStatCards from "../components/calendar/CalendarStatCards";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarLegend from "../components/calendar/CalendarLegend";
import MonthSummaryCard from "../components/calendar/MonthSummaryCard";
import UpcomingPaymentsCard from "../components/calendar/UpcomingPaymentsCard";
import QuickActionsGrid from "../components/calendar/QuickActionsGrid";
import { calendarWeeks } from "../data/calendar";

export default function Calendar() {
  const [monthLabel] = useState("September 2026");
  const [view, setView] = useState("Month");

  // Mock data is hardcoded to September 2026, so prev/next month
  // navigation is a no-op for now until real date logic is wired up.
  const handlePrevMonth = () => {};
  const handleNextMonth = () => {};

  return (
    <DashboardLayout>
      <CalendarStatCards />

      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <CalendarToolbar
              monthLabel={monthLabel}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              view={view}
              onViewChange={setView}
            />
            <CalendarGrid weeks={calendarWeeks} />
            <CalendarLegend />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 space-y-5">
          <MonthSummaryCard />
          <UpcomingPaymentsCard />
          <QuickActionsGrid />
        </div>
      </div>
    </DashboardLayout>
  );
}