"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { industries } from "@/content/industries";
import { serviceBySlug } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { IndustrySlug } from "@/types";

/**
 * Light section. The six sectors as an index: name, one line, and a dot for every discipline that applies.
 * On wide screens a sticky picture follows the sector that is hovered or focused. Each row links to its anchor
 * on /industries.
 */
export function IndustriesSection() {
  const [active, setActive] = useState<IndustrySlug>(industries[0].slug);

  return (
    <section aria-labelledby="industries-title" className="bg-offwhite py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="industries-title">
          <SectionHeading
            index="03"
            label="Industries"
            title="Buildings with different demands"
            description="The disciplines that matter most differ from one sector to the next."
          />
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <ol className="divide-y divide-line border-y border-line lg:col-span-7">
            {industries.map((i, n) => {
              const on = active === i.slug;
              return (
                <li key={i.slug}>
                  <Link
                    href={`/industries#${i.slug}`}
                    onMouseEnter={() => setActive(i.slug)}
                    onFocus={() => setActive(i.slug)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:py-7"
                  >
                    <span className="mono-label pt-2 text-muted tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                    <span>
                      <span
                        className={cn(
                          "block font-heading text-[clamp(1.5rem,1.1rem+1.3vw,2.25rem)] font-bold uppercase leading-tight transition-colors duration-300",
                          on ? "text-navy" : "text-navy/70",
                        )}
                      >
                        {i.name}
                      </span>
                      <span className="mt-2 block max-w-xl text-muted">{i.summary}</span>
                      <span className="mt-3 flex items-center gap-1.5">
                        {i.services.map((s) => (
                          <span
                            key={s}
                            className="size-2 rounded-full"
                            style={{ background: disciplineColor[s] }}
                            title={serviceBySlug(s)?.shortName}
                          >
                            <span className="sr-only">{serviceBySlug(s)?.shortName}</span>
                          </span>
                        ))}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="mt-2 size-6 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                    />
                  </Link>
                </li>
              );
            })}
          </ol>

          <div aria-hidden className="relative hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-sm bg-navy-900">
              {industries.map((i) => (
                <SiteImage
                  key={i.slug}
                  asset={i.image}
                  fill
                  sizes="(min-width:1024px) 40vw, 0px"
                  className={cn(
                    "object-cover transition-opacity duration-500 motion-reduce:transition-none",
                    active === i.slug ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
