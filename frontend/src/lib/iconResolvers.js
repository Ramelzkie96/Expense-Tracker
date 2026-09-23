import {
  Utensils,
  Car,
  Zap,
  Ticket,
  Briefcase,
  Laptop,
  Building2,
  TrendingUp,
  Gift,
  PlusCircle,
  Landmark,
  CreditCard,
  Wallet,
  Banknote,
  Tag,
} from "lucide-react";
import gcash from "../assets/gcash.png";

// Maps a lucide-react icon name (stored as text in Supabase) to the
// actual component. Falls back to Tag if a name isn't recognized.
const iconMap = {
  Utensils,
  Car,
  Zap,
  Ticket,
  Briefcase,
  Laptop,
  Building2,
  TrendingUp,
  Gift,
  PlusCircle,
  Landmark,
  CreditCard,
  Wallet,
  Banknote,
};

export function resolveIcon(name) {
  return iconMap[name] || Tag;
}

// Maps a payment method's icon_key to an actual image asset, for methods
// where is_image = true (currently just GCash).
const imageAssets = {
  gcash,
};

export function resolvePaymentImage(iconKey) {
  return imageAssets[iconKey] ?? null;
}