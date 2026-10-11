import TransactionActionsMenu from "./TransactionActionsMenu";
import { formatPeso } from "../../data/transactions";

// Compact card used instead of a table row on small screens
export default function TransactionCard({ transaction: t, onEdit, onDelete }) {
  const CategoryIcon = t.icon;

  return (
    <div className="flex items-start gap-3 border-b border-slate-100 py-3.5 last:border-0">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.categoryBg} ${t.categoryColor}`}
      >
        <CategoryIcon size={18} strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-slate-800">
          {t.title}
        </p>
        <p className="truncate text-[12px] text-slate-500">
          {t.category} · {t.method}
        </p>
        <p className="text-[11.5px] text-slate-400">
          {t.date} · {t.time}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={`text-[13.5px] font-semibold ${
            t.amount < 0 ? "text-rose-500" : "text-emerald-600"
          }`}
        >
          {formatPeso(t.amount)}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
            t.type === "Income"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-500"
          }`}
        >
          {t.type}
        </span>
      </div>

      <div className="-mr-1.5 shrink-0">
        <TransactionActionsMenu transaction={t} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}