import { ArrowUp, ArrowDown } from "lucide-react";
import { statCards, formatPesoPlain } from "../../data/calendar";

export default function CalendarStatCards() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        const isUp = card.change.startsWith("+");
        const TrendIcon = isUp ? ArrowUp : ArrowDown;

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

            <p className="text-[20px] font-bold text-slate-800">
              {card.isPercent ? card.value : formatPesoPlain(card.value)}
            </p>

            <p className={`mt-1 flex items-center gap-1 text-[12.5px] font-medium ${card.changeColor}`}>
              <TrendIcon size={12} strokeWidth={2.5} />
              {card.change} {card.changeLabel}
            </p>
          </div>
        );
      })}
    </div>
  );
}