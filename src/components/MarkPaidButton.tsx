"use client";

import { markPaymentPaid } from "@/app/actions/payments";

export default function MarkPaidButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={() => markPaymentPaid(id)}
      className="press rounded-sm border border-brand-gold/30 px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-brand-gold-soft transition-all duration-200 ease-out hover:border-brand-gold/60 hover:bg-brand-gold/10"
    >
      Mark paid
    </button>
  );
}
