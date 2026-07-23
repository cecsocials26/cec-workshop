import { createOneKindDay } from "@/app/actions/one-kind-day";
import OneKindDayForm from "../OneKindDayForm";

export default function NewOneKindDayPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
          New One Kind Day
        </h2>
        <p className="mt-2 text-sm text-brand-ivory/50">
          Log a new visit for the timeline.
        </p>
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <OneKindDayForm action={createOneKindDay} submitLabel="Create entry" />
      </div>
    </div>
  );
}
