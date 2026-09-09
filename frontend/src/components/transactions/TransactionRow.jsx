import { MoreVertical } from "lucide-react";
import { formatPeso } from "../../data/transactions";

export default function TransactionRow({ transaction: t }) {
  const Icon = t.icon;

  return (
    <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <p className="text-[13px] font-medium text-slate-700">{t.date}</p>
        <p className="text-[12px] text-slate-400">{t.time}</p>
      </td>

      <td className="py-4 pr-4 align-top">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${t.iconBg}`}
          >
            <Icon size={16} strokeWidth={2} className={t.iconColor} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13.5px] font-semibold text-slate-800">
              {t.title}
            </p>
            <p className="truncate text-[12px] text-slate-400">{t.subtitle}</p>
          </div>
        </div>
      </td>

      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <span
          className={`inline-flex items-center rounded-full ${t.categoryBg} px-2.5 py-1 text-[12px] font-medium ${t.categoryColor}`}
        >
          {t.category}
        </span>
      </td>

    <td className="whitespace-nowrap py-4 pr-4 align-top">
    <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-600">
        {t.methodIcon.type === "image" ? (
        <img src={t.methodIcon.src} alt={t.method} className="h-4 w-4 object-contain" />
        ) : (
        <span>{t.methodIcon.value}</span>
        )}
        {t.method}
    </span>
    </td>

      <td className="whitespace-nowrap py-4 pr-4 align-top">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${
            t.type === "Income"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-500"
          }`}
        >
          {t.type}
        </span>
      </td>

      <td
        className={`whitespace-nowrap py-4 pr-4 text-right align-top text-[13.5px] font-semibold ${
          t.amount < 0 ? "text-rose-500" : "text-emerald-600"
        }`}
      >
        {formatPeso(t.amount)}
      </td>

      <td className="whitespace-nowrap py-4 pl-4 text-right align-top">
        <button className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}