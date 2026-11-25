import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { quoteHref } from "@/content/navigation";
import { serviceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

/**
 * One anchored sector (/industries#<slug>): the sector's name and summary beside the services it typically needs,
 * each with the reason taken from that service's own "applications" content.
 */
export function SectorSection({ industry: i, index }: { industry: Industry; index: number }) {
  const rows = i.services
    .map((slug) => {
      const s = serviceBySlug(slug);
      if (!s) return null;
      return { service: s, note: s.applications.find((a) => a.industry === i.slug)?.note };
    })
    .filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <section id={i.slug} aria-labelledby={`${i.slug}-title`} className={cn("scroll-mt-32 py-10 md:py-14", index % 2 === 0 ? "bg-white" : "bg-[#f2f7fb]")}>
      <div className="wrap grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <span aria-hidden className="accent-bar" />
          <h2 id={`${i.slug}-title`} className="mt-4 text-[clamp(1.75rem,1rem+2.2vw,2.75rem)] font-extrabold leading-tight text-navy">
            {i.name}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy md:text-lg">{i.summary}</p>
          <Button href={quoteHref({ sector: i.slug, service: i.services.join(",") })} size="lg" className="mt-6 h-auto min-h-12 whitespace-normal py-3 text-center">
            Request a quote for {i.name}
          </Button>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-navy">Services typically needed</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {rows.map(({ service: s, note }) => {
              const color = serviceColor(s.slug);
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full gap-3 rounded-card border border-blue/50 bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-lg" style={{ background: `color-mix(in srgb, ${color} 14%, white)`, color }}>
                      <ServiceIcon slug={s.slug} className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 font-heading font-bold text-navy group-hover:text-blue-700">
                        {s.name}
                        <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      </span>
                      {note && <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{note}</span>}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
