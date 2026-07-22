import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateProperty, deleteProperty } from "@/app/actions/properties";
import type { Property } from "@/lib/properties";
import type { Customer } from "@/lib/customers";
import type { ServiceCategory } from "@/lib/jobs";
import ServiceStamps from "@/components/ServiceStamps";
import PropertyForm from "../PropertyForm";

const COMPLETED_STATUSES = ["completed", "invoiced", "paid"];

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: property }, { data: customers }, { data: completedJobs }] =
    await Promise.all([
      supabase
        .from("properties")
        .select("*, customer:customers(*)")
        .eq("id", id)
        .maybeSingle<Property>(),
      supabase
        .from("customers")
        .select("*")
        .order("full_name", { ascending: true })
        .returns<Customer[]>(),
      supabase
        .from("jobs")
        .select("service_category")
        .eq("property_id", id)
        .in("status", COMPLETED_STATUSES)
        .not("service_category", "is", null)
        .returns<{ service_category: ServiceCategory }[]>(),
    ]);

  if (!property) notFound();

  const collectedStamps = Array.from(
    new Set((completedJobs ?? []).map((j) => j.service_category)),
  );

  const updatePropertyWithId = updateProperty.bind(null, property.id);
  const deletePropertyWithId = deleteProperty.bind(null, property.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-3xl tracking-wide text-brand-ivory">
            {property.address}
          </h2>
          <p className="mt-2 text-sm text-brand-ivory/50">
            {property.customer?.full_name ?? "—"}
          </p>
        </div>
        <form action={deletePropertyWithId}>
          <button
            type="submit"
            className="press rounded-sm border border-brand-gold/25 px-4 py-2 text-xs uppercase tracking-wider text-brand-ivory/50 transition-all duration-200 ease-out hover:border-brand-gold/50 hover:text-brand-gold-soft"
          >
            Delete property
          </button>
        </form>
      </div>

      <div className="surface-static max-w-3xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-brand-ivory/55">
          Service stamps
        </p>
        <ServiceStamps collected={collectedStamps} />
      </div>

      <div className="surface-static max-w-2xl rounded-sm border border-brand-gold/20 bg-brand-green-light/20 px-6 py-6">
        <PropertyForm
          action={updatePropertyWithId}
          property={property}
          customers={customers ?? []}
          submitLabel="Save changes"
        />
      </div>
    </div>
  );
}
