import {
  Download,
  CloudUpload,
  Trash2,
  LogOut,
  Crown,
  Cloud,
  Smartphone,
  Clock,
  Monitor,
} from "lucide-react";

export const userProfile = {
  name: "Ramel Gulane",
  email: "ramel.dev@gmail.com",
  phone: "+63 9XX XXX XXXX",
  memberSince: "September 2026",
  avatarUrl: "/images/profile.jpg",
};

export const quickActions = [
  {
    id: 1,
    action: "export",
    icon: Download,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Export Data",
    subtitle: "Download your transactions & reports",
  },
  {
    id: 2,
    action: "backup",
    icon: CloudUpload,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    title: "Backup Data",
    subtitle: "Keep your data safe and secure",
  },
  {
    id: 3,
    action: "delete",
    icon: Trash2,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    title: "Delete Account",
    subtitle: "Permanently delete your account",
  },
  {
    id: 4,
    action: "logout",
    icon: LogOut,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    title: "Log Out",
    subtitle: "Sign out from your account",
  },
];

export const accountInfo = {
  accountType: "Free Plan",
  storageUsedMb: 2.4,
  storageLimitMb: 100,
  appVersion: "v1.0.0",
  lastLogin: "Sep 7, 2026 · 10:24 AM",
  device: "Windows · Chrome",
};

export const backupInfo = {
  autoBackupEnabled: true,
  lastBackup: "Sep 7, 2026 · 10:00 AM",
};

export const accountInfoIcons = {
  accountType: Crown,
  storage: Cloud,
  appVersion: Smartphone,
  lastLogin: Clock,
  device: Monitor,
};