import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Alert } from "@/lib/notifications";

export default function NotificationsStrip({ alerts }: { alerts: Alert[] }) {
  if (alerts.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-sm border border-brand-gold/15 bg-brand-green-light/20 px-4 py-2.5 text-sm text-brand-ivory/40">
        <CheckCircle2 size={15} strokeWidth={1.5} />
        All clear — nothing needs attention right now.
      </div>
    );
  }

  return (
    <div className="surface-static flex flex-col gap-2 rounded-sm border border-brand-gold/25 bg-brand-green-light/40 px-4 py-3">
      {alerts.map((alert) => (
        <Link
          key={alert.id}
          href={alert.href}
          className="flex items-center gap-2 text-sm text-brand-gold-soft transition-colors duration-200 ease-out hover:text-brand-gold"
        >
          <AlertTriangle size={14} strokeWidth={1.5} />
          {alert.message}
        </Link>
      ))}
    </div>
  );
}
