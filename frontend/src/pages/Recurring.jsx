import DashboardLayout from "../components/layout/DashboardLayout";
import RecurringStatCards from "../components/recurring/RecurringStatCards";
import UpcomingPaymentsTable from "../components/recurring/UpcomingPaymentsTable";
import AllRecurringTable from "../components/recurring/AllRecurringTable";
import RecurringSummaryCard from "../components/recurring/RecurringSummaryCard";
import QuickActionsCard from "../components/recurring/QuickActionsCard";
import StayOnTrackCard from "../components/recurring/StayOnTrackCard";

export default function Recurring() {
  return (
    <DashboardLayout>
      <RecurringStatCards />

      <div className="flex items-start gap-6">
        {/* Main column */}
        <div className="min-w-0 flex-1 space-y-6">
          <UpcomingPaymentsTable />
          <AllRecurringTable />
        </div>

        {/* Right sidebar */}
        <div className="w-[300px] shrink-0 space-y-5">
          <RecurringSummaryCard />
          <QuickActionsCard />
          <StayOnTrackCard />
        </div>
      </div>
    </DashboardLayout>
  );
}