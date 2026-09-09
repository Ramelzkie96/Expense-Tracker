import TransactionRow from "./TransactionRow";

export default function TransactionsTable({ transactions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-left text-[12px] font-semibold text-slate-400">
            <th className="pb-3 pr-4 font-semibold">Date</th>
            <th className="pb-3 pr-4 font-semibold">Description</th>
            <th className="pb-3 pr-4 font-semibold">Category</th>
            <th className="pb-3 pr-4 font-semibold">Payment Method</th>
            <th className="pb-3 pr-4 font-semibold">Type</th>
            <th className="pb-3 pr-4 text-right font-semibold">Amount</th>
            <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>
    </div>
  );
}