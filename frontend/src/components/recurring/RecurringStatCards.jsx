import { statCards, formatPesoPlain } from "../../data/recurring";

export default function RecurringStatCards() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        const displayValue =
          typeof card.value === "number" ? formatPesoPlain(card.value) : card.value;

        return (
          <div
            key={card.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${card.iconBg}`}>
                <Icon size={18} strokeWidth={2} className={card.iconColor} />
              </div>
              <p className="text-[13px] text-slate-500">{card.label}</p>
            </div>

            <p className="text-[19px] font-bold text-slate-800">{displayValue}</p>

            <p className={`mt-1 text-[12.5px] font-medium ${card.footerColor}`}>
              {card.footer}
            </p>
          </div>
        );
      })}
    </div>
  );
}