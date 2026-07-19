import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Hammer,
  Users,
  Banknote,
  FileText,
  FileSignature,
  Megaphone,
  Leaf,
  Settings,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  enabled: boolean;
};

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard, enabled: true },
  { label: "Jobs", href: "/jobs", icon: Hammer, enabled: true },
  { label: "Customers / CRM", href: "/crm", icon: Users, enabled: false },
  { label: "Payments", href: "/payments", icon: Banknote, enabled: false },
  { label: "Documents", href: "/documents", icon: FileText, enabled: false },
  { label: "Forms", href: "/forms", icon: FileSignature, enabled: false },
  { label: "Marketing", href: "/marketing", icon: Megaphone, enabled: false },
  { label: "Foundation", href: "/foundation", icon: Leaf, enabled: false },
  { label: "Admin", href: "/admin", icon: Settings, enabled: false },
];
