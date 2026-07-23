import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ListChecks,
  Hammer,
  Users,
  Home,
  Banknote,
  Layers,
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
  { label: "Todos", href: "/todos", icon: ListChecks, enabled: true },
  { label: "Jobs", href: "/jobs", icon: Hammer, enabled: true },
  { label: "Customers / CRM", href: "/crm", icon: Users, enabled: true },
  { label: "Properties", href: "/properties", icon: Home, enabled: true },
  { label: "Payments", href: "/payments", icon: Banknote, enabled: true },
  { label: "Collections", href: "/collections", icon: Layers, enabled: true },
  { label: "Documents", href: "/documents", icon: FileText, enabled: false },
  { label: "Forms", href: "/forms", icon: FileSignature, enabled: false },
  { label: "Marketing", href: "/marketing", icon: Megaphone, enabled: false },
  { label: "Olive Branch Foundation", href: "/foundation", icon: Leaf, enabled: true },
  { label: "Admin", href: "/admin", icon: Settings, enabled: false },
];
