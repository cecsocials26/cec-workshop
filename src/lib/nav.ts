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
  room?: string;
};

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: LayoutDashboard, enabled: true, room: "Mission Control" },
  { label: "Todos", href: "/todos", icon: ListChecks, enabled: true },
  { label: "Jobs", href: "/jobs", icon: Hammer, enabled: true, room: "Operations Room" },
  {
    label: "Customers / CRM",
    href: "/crm",
    icon: Users,
    enabled: true,
    room: "Relationship Office",
  },
  {
    label: "Properties",
    href: "/properties",
    icon: Home,
    enabled: true,
    room: "Archive Room",
  },
  { label: "Payments", href: "/payments", icon: Banknote, enabled: true },
  {
    label: "Collections",
    href: "/collections",
    icon: Layers,
    enabled: true,
    room: "The Library",
  },
  {
    label: "Documents",
    href: "/documents",
    icon: FileText,
    enabled: false,
    room: "Records Office",
  },
  { label: "Forms", href: "/forms", icon: FileSignature, enabled: false },
  { label: "Marketing", href: "/marketing", icon: Megaphone, enabled: false },
  {
    label: "Olive Branch Foundation",
    href: "/foundation",
    icon: Leaf,
    enabled: true,
    room: "Foundation Office",
  },
  { label: "Admin", href: "/admin", icon: Settings, enabled: false },
];
