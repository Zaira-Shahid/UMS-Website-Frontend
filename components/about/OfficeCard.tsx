import { ArrowRight, MapPin } from "@/components/ui/lucide";
import Link from "next/link";
import type { OfficeConfig } from "@/content/site";

/** Office card (mockup 12): a small map tile with a pin, the city and only the details that are filled in `content/site.ts`. */
export function OfficeCard({ office }: { office: OfficeConfig }) {
  const link = office.mapUrl
    ? { href: office.mapUrl, label: "Get directions", external: true }
    : { href: "/contact", label: "Contact this office", external: false };
  const cls = "group mt-3 inline-flex items-center gap-2 font-heading font-bold text-blue-700";
  return (
    <div className="flex items-stretch gap-4 rounded-card border border-blue/70 bg-white p-4 shadow-card sm:gap-6 sm:p-5">
      <div
        aria-hidden
        className="relative hidden w-28 shrink-0 items-center justify-center rounded-lg bg-[#eaf3fb] bg-[linear-gradient(#d9e8f5_1px,transparent_1px),linear-gradient(90deg,#d9e8f5_1px,transparent_1px)] bg-[size:18px_18px] sm:flex"
      >
        <MapPin className="size-9 fill-navy text-navy" />
      </div>
      <div className="min-w-0 border-blue/40 sm:border-l sm:pl-6">
        <h3 className="text-[1.5rem] font-bold text-navy">{office.city} Office</h3>
        {office.address && <p className="mt-1 text-base text-navy">{office.address}</p>}
        {office.phone && <p className="mt-1 text-base text-navy">{office.phone}</p>}
        {office.email && <p className="mt-1 break-words text-base text-navy">{office.email}</p>}
        {office.email2 && <p className="mt-1 break-words text-base text-navy">{office.email2}</p>}
        {link.external ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
            {link.label}
            <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link href={link.href} className={cls}>
            {link.label}
            <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
