import { ArrowUp, ArrowDown, Wallet, Percent } from "lucide-react";
import { formatPesoPlain } from "../../data/calendar";

// formatPesoPlain doesn't handle negatives specially (it would print
// "₱-650.00"); this puts the sign before the currency symbol instead.
function formatSignedPeso(amount) {
  return amount < 0 ? `-${formatPesoPlain(Math.abs(amount))}` : formatPesoPlain(amount);
}

function formatChangePct(pct) {
  const rounded = Math.round(pct * 10) / 10;
  return `${rounded > 0 ? "+" : ""}${rounded}%`;
}

export default function CalendarStatCards({ stats }) {
  const cards = [
    {
      id: 1,
      label: "Total Income",
      value: formatPesoPlain(stats.income),
      icon: ArrowUp,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      changePct: stats.incomeChangePct,
    },
    {
      id: 2,
      label: "Total Expenses",
      value: formatPesoPlain(stats.expenses),
      icon: ArrowDown,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
      changePct: stats.expensesChangePct,
    },
    {
      id: 3,
      label: "Net Savings",
      value: formatSignedPeso(stats.netSavings),
      icon: Wallet,
      iconBg: "bg-sky-50",
      iconColor: "text-sky-600",
      changePct: stats.netSavingsChangePct,
    },
    {
      id: 4,
      label: "Savings Rate",
      value: `${stats.savingsRate.toFixed(1)}%`,
      icon: Percent,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      changePct: stats.savingsRateChangePct,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isUp = card.changePct >= 0;
        const TrendIcon = isUp ? ArrowUp : ArrowDown;
        const changeColor = isUp ? "text-emerald-600" : "text-rose-500";

        return (
          <div
            key={card.id}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}
              >
                <Icon size={18} strokeWidth={2} className={card.iconColor} />
              </div>
              <p className="text-[13px] text-slate-500">{card.label}</p>
            </div>

            <p className="break-words text-[17px] font-bold text-slate-800 sm:text-[20px]">{card.value}</p>

            <p
              className={`mt-1 flex flex-wrap items-center gap-1 text-[11.5px] font-medium sm:text-[12.5px] ${changeColor}`}
            >
              <TrendIcon size={12} strokeWidth={2.5} />
              {formatChangePct(card.changePct)} vs last month
            </p>
          </div>
        );
      })}
    </div>
  );
}