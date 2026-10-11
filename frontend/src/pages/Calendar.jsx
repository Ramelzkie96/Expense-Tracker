import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/clerk-react";
import { format, addMonths, subMonths } from "date-fns";
import DashboardLayout from "../components/layout/DashboardLayout";
import CalendarStatCards from "../components/calendar/CalendarStatCards";
import CalendarToolbar from "../components/calendar/CalendarToolbar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarLegend from "../components/calendar/CalendarLegend";
import MonthSummaryCard from "../components/calendar/MonthSummaryCard";
import { useSupabaseClient } from "../hooks/useSupabaseClient";
import { getTransactions } from "../services/transactions";
import { mapTransactionRow } from "../utils/transactionMapper";
import { buildCalendarWeeks, computeCalendarStats } from "../utils/calendarGrid";

export default function Calendar() {
  const supabase = useSupabaseClient();
  const { user } = useUser();

  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [view, setView] = useState("Month");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    getTransactions(supabase, user.id)
      .then((rows) => setTransactions(rows.map(mapTransactionRow)))
      .catch((err) => console.error("Failed to load calendar transactions:", err))
      .finally(() => setIsLoading(false));
  }, [supabase, user]);

  // All transactions are already loaded, so switching months just
  // re-filters client-side — no refetch needed.
  const calendarWeeks = useMemo(
    () => buildCalendarWeeks(transactions, currentMonth),
    [transactions, currentMonth]
  );

  const calendarStats = useMemo(
    () => computeCalendarStats(transactions, currentMonth),
    [transactions, currentMonth]
  );

  const monthLabel = format(currentMonth, "MMMM yyyy");

  const handlePrevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const handleNextMonth = () => setCurrentMonth((m) => addMonths(m, 1));

  return (
    <DashboardLayout>
      <CalendarStatCards stats={calendarStats} />

      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <CalendarToolbar
              monthLabel={monthLabel}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              view={view}
              onViewChange={setView}
            />
            {isLoading ? (
              <p className="py-10 text-center text-[13px] text-slate-400">
                Loading calendar...
              </p>
            ) : (
              <CalendarGrid weeks={calendarWeeks} monthLabel={monthLabel} />
            )}
            <CalendarLegend />
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full shrink-0 space-y-5 xl:w-[300px]">
          <MonthSummaryCard stats={calendarStats} />

        </div>
      </div>
    </DashboardLayout>
  );
}