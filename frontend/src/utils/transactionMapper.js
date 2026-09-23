import * as LucideIcons from "lucide-react";
import gcash from "../assets/gcash.png";

// Local image assets for payment methods whose icon is an image rather
// than an emoji glyph. Add more entries here as you add image-based
// payment methods (keyed by payment_methods.icon_key in Supabase).
const PAYMENT_METHOD_IMAGES = {
  gcash,
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":").map(Number);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function resolveCategoryIcon(iconName) {
  return LucideIcons[iconName] || LucideIcons.Tag;
}

function resolveMethodIcon(paymentMethod) {
  if (!paymentMethod) return { type: "emoji", value: "💳" };

  if (paymentMethod.is_image) {
    const src = PAYMENT_METHOD_IMAGES[paymentMethod.icon_key];
    if (src) return { type: "image", src };
    // Fallback if the image asset isn't registered locally yet
    return { type: "emoji", value: "💳" };
  }

  return { type: "emoji", value: paymentMethod.icon_key || "💳" };
}

// Converts a raw Supabase transaction row (joined with categories and
// payment_methods, as returned by getTransactions/createTransaction)
// into the shape TransactionRow expects.
export function mapTransactionRow(row) {
  const category = row.categories;
  const paymentMethod = row.payment_methods;
  const isExpense = row.type === "Expense";

  return {
    id: row.id,
    date: formatDate(row.transaction_date),
    time: formatTime(row.transaction_time),
    title: row.title,
    subtitle: row.subtitle ?? "",
    icon: category ? resolveCategoryIcon(category.icon_name) : LucideIcons.Tag,
    iconBg: category?.icon_bg ?? "bg-slate-100",
    iconColor: category?.icon_color ?? "text-slate-500",
    category: category?.name ?? "Uncategorized",
    categoryBg: category?.icon_bg ?? "bg-slate-100",
    categoryColor: category?.icon_color ?? "text-slate-500",
    method: paymentMethod?.name ?? "—",
    methodIcon: resolveMethodIcon(paymentMethod),
    type: row.type,
    amount: isExpense ? -Math.abs(row.amount) : Math.abs(row.amount),
  };
}