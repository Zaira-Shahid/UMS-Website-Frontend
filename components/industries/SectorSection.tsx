import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { quoteHref } from "@/content/navigation";
import { serviceBySlug } from "@/content/services";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { Industry } from "@/types";

/** One anchored sector section (/industries#<slug>) with the sector's related projects. */
export function SectorSection({ industry: i, index }: { industry: Industry; index: number }) {
  const related = projects.filter((p) => p.sector === i.slug);
  const flip = index % 2 === 1;
  const serviceList = i.services.map((s) => serviceBySlug(s)).filter((s) => !!s);

  return (
    <section
      id={i.slug}
      aria-labelledby={`${i.slug}-title`}
      // Clears the fixed header (64px) and the sticky sector switcher (~57px).
      className={cn("scroll-mt-32 py-16 md:py-24", index % 2 === 0 ? "bg-white" : "bg-offwhite")}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className={cn("lg:col-span-6", flip && "lg:order-2")}>
          <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#00608c]">
            <span aria-hidden className="h-px w-8 bg-cyan" />
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")} /</span> Sector
          </p>
          <h2 id={`${i.slug}-title`} className="mt-4 text-navy">
            {i.name}
          </h2>
          <p className="mt-4 text-lg text-muted">{i.summary}</p>

          <h3 className="mt-8 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
            Services typically needed
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {serviceList.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex rounded-full border border-navy/30 px-3.5 py-1.5 text-sm font-medium text-navy transition-colors hover:border-cyan hover:bg-cyan hover:text-white"
                >
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
            Related projects
          </h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex items-center justify-between gap-4 py-3 text-navy transition-colors hover:text-cyan"
                >
                  <span className="font-medium">{p.name}</span>
                  <ArrowRight aria-hidden className="size-4 text-muted transition-all group-hover:translate-x-1 group-hover:text-cyan" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Button
              href={quoteHref({ sector: i.slug, service: i.services.join(",") })}
              variant="primary"
              size="lg"
              magnetic
              arrow
              className="w-full sm:w-auto"
            >
              Request a quote for {i.name}
            </Button>
          </div>
        </Reveal>

        <Reveal className={cn("lg:col-span-6", flip && "lg:order-1")}>
          <CornerBrackets>
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-900 lg:aspect-[4/5]">
              <SiteImage asset={i.image} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />
            </div>
          </CornerBrackets>
        </Reveal>
      </div>
    </section>
  );
}
