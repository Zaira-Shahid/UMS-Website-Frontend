import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";

/** Short names used on project cards (mockup 19). */
const chipLabel: Record<ServiceSlug, string> = {
  "integrated-mep": "MEP",
  hvac: "HVAC",
  "fire-fighting": "Fire",
  plumbing: "Plumbing",
  "electrical-elv": "Electrical",
  "pools-fountains": "Pools",
};

/** Small outlined service chips with the service's coloured icon. Renders nothing when there are no services. */
export function ServiceChips({ services, className }: { services: ServiceSlug[]; className?: string }) {
  if (!services.length) return null;
  return (
    <ul aria-label="Services" className={cn("flex flex-wrap gap-2", className)}>
      {services.map((s) => (
        <li key={s} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 text-sm font-semibold text-navy">
          <span style={{ color: serviceColor(s) }} className="flex">
            <ServiceIcon slug={s} className="size-4" />
          </span>
          {chipLabel[s]}
        </li>
      ))}
    </ul>
  );
}
