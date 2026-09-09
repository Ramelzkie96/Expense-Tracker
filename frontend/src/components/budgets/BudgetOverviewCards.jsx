import { Target, ArrowUp, ArrowDown, Wallet } from "lucide-react";
import { formatPesoPlain } from "../../data/budgets";

export default function BudgetOverviewCards({
  monthlyBudget,
  totalSpent,
  totalIncome,
  totalExpenses,
  remaining,
}) {
  const spentPct = Math.round((totalSpent / monthlyBudget) * 100);
  const remainingPct = 100 - spentPct;

  return (
    <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
      {/* Monthly Budget */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50">
            <Target size={20} strokeWidth={2} className="text-indigo-600" />
          </div>
          <div>
            <p className="text-[13px] text-slate-500">Monthly Budget</p>
            <p className="text-[20px] font-bold text-slate-800">
              {formatPesoPlain(monthlyBudget)}
            </p>
          </div>
        </div>

        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600"
            style={{ width: `${spentPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-slate-500">{formatPesoPlain(totalSpent)} spent</span>
          <span className="font-semibold text-slate-500">{spentPct}%</span>
          <span className="text-slate-500">{formatPesoPlain(remaining)} remaining</span>
        </div>
      </div>

      {/* Total Income */}
      <StatCard
        icon={ArrowUp}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-600"
        label="Total Income"
        value={formatPesoPlain(totalIncome)}
        cardBg="bg-emerald-50/50"
      />

      {/* Total Expenses */}
      <StatCard
        icon={ArrowDown}
        iconBg="bg-rose-100"
        iconColor="text-rose-500"
        label="Total Expenses"
        value={formatPesoPlain(totalExpenses)}
        cardBg="bg-rose-50/50"
      />

      {/* Remaining */}
      <StatCard
        icon={Wallet}
        iconBg="bg-indigo-100"
        iconColor="text-indigo-600"
        label="Remaining"
        value={formatPesoPlain(remaining)}
        cardBg="bg-indigo-50/50"
        footer={`${remainingPct}%`}
        footerColor="text-indigo-600"
      />
    </div>
  );
}

function StatCard({ icon: Icon, iconBg, iconColor, label, value, cardBg, footer, footerColor }) {
  return (
    <div className={`rounded-2xl border border-slate-200 ${cardBg} p-5 shadow-sm`}>
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full ${iconBg}`}>
        <Icon size={17} strokeWidth={2.2} className={iconColor} />
      </div>
      <p className="text-[13px] text-slate-500">{label}</p>
      <p className="mt-0.5 text-[18px] font-bold text-slate-800">{value}</p>
      {footer && (
        <p className={`mt-1 text-[12.5px] font-semibold ${footerColor}`}>{footer}</p>
      )}
    </div>
  );
}