import { MapPin } from "lucide-react";
import type { Office } from "@/types";

/** Office card: address, click-to-call phone, mailto email, hours and a Google Maps link. */
export function OfficeCard({ office, compact = false }: { office: Office; compact?: boolean }) {
  const rows: [string, string, string?][] = [
    ["Address", office.address],
    ["Phone", office.phone, `tel:${office.phone.replace(/[^\d+]/g, "")}`],
    ["Email", office.email, `mailto:${office.email}`],
    ["Hours", office.hours],
  ];
  return (
    <article aria-label={`${office.city} office`} className="border border-line bg-white">
      <div className="border-t-2 border-navy p-5">
        <h3 className="flex items-center gap-2 font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">
          <MapPin aria-hidden className="size-4 text-cyan" />
          {office.city} · {office.label}
        </h3>
        <dl className={compact ? "mt-3 space-y-1.5" : "mt-4 space-y-2.5"}>
          {rows.map(([label, value, href]) => (
            <div key={label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
              <dt className="w-16 shrink-0 text-muted">{label}</dt>
              <dd>
                {href ? (
                  <a href={href} className="text-navy underline-offset-4 hover:text-cyan hover:underline">
                    {value}
                  </a>
                ) : (
                  <span className="text-ink">{value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <a
          href={office.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block text-sm font-medium text-cyan underline-offset-4 hover:underline"
        >
          Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
