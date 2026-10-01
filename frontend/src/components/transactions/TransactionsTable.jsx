import { useState } from "react";
import { toast } from "sonner";
import TransactionRow from "./TransactionRow";
import ConfirmDialog from "../ui/ConfirmDialog";
import AddTransactionModal from "../ui/transactions/AddTransactionModal";
import { useSupabaseClient } from "../../hooks/useSupabaseClient";
import { deleteTransaction } from "../../services/transactions";
import { formatPeso } from "../../data/transactions";

export default function TransactionsTable({ transactions, onDeleted, onUpdated }) {
  const supabase = useSupabaseClient();
  const [pendingDelete, setPendingDelete] = useState(null); // transaction awaiting confirmation
  const [editing, setEditing] = useState(null); // transaction being edited
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    try {
      await deleteTransaction(supabase, pendingDelete.id);
      toast.success("Transaction deleted.");
      setPendingDelete(null);
      onDeleted?.();
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      toast.error("Failed to delete transaction. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
              <TransactionRow
                key={t.id}
                transaction={t}
                onEdit={setEditing}
                onDelete={setPendingDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete transaction?"
        message={
          pendingDelete
            ? `"${pendingDelete.title}" (${formatPeso(
                pendingDelete.amount
              )}) will be permanently deleted. This action can't be undone.`
            : ""
        }
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <AddTransactionModal
        isOpen={editing !== null}
        transaction={editing}
        onClose={() => setEditing(null)}
        onSave={() => onUpdated?.()}
      />
    </>
  );
}