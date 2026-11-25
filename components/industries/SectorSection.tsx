import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { quoteHref } from "@/content/navigation";
import { serviceBySlug } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

/**
 * One anchored sector (/industries#<slug>): the sector's name and summary on the left, the services it typically
 * needs on the right as a ruled list, each with the reason taken from that service's own "applications" content.
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
    <section
      id={i.slug}
      aria-labelledby={`${i.slug}-title`}
      // Clears the fixed header (64px) and the sticky sector switcher (~57px).
      className={cn("scroll-mt-32 py-16 md:py-24", index % 2 === 0 ? "bg-white" : "bg-offwhite")}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="min-w-0 lg:col-span-5">
          <div className="lg:sticky lg:top-44">
            <p className="mono-label flex items-center gap-3 text-[#00608c]">
              <span aria-hidden className="h-px w-8 bg-blue" />
              <span className="tabular-nums text-navy">{String(index + 1).padStart(2, "0")}</span>
              Sector
            </p>
            <h2 id={`${i.slug}-title`} className="mt-4 text-navy">
              {i.name}
            </h2>
            <p className="mt-4 text-lg text-muted">{i.summary}</p>
            <div className="mt-8">
              <Button
                href={quoteHref({ sector: i.slug, service: i.services.join(",") })}
                variant="primary"
                size="lg"
                arrow
                className="h-auto min-h-14 w-full whitespace-normal py-3 text-center sm:w-auto"
              >
                Request a quote for {i.name}
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="min-w-0 lg:col-span-7">
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">Services typically needed</h3>
          <Reveal stagger as="ul" className="mt-3 divide-y divide-navy/15 border-y border-navy/15">
            {rows.map(({ service: s, note }) => (
              <RevealItem key={s.slug} as="li">
                <Link href={`/services/${s.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-4 py-5">
                  <span aria-hidden className="mt-2 size-2.5 rounded-full" style={{ background: disciplineColor[s.slug] }} />
                  <span>
                    <span className="block font-heading text-xl font-bold uppercase text-navy transition-colors group-hover:text-blue">{s.name}</span>
                    {note && <span className="mt-1 block text-[0.9375rem] text-muted">{note}</span>}
                  </span>
                  <ArrowUpRight aria-hidden className="mt-1.5 size-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
