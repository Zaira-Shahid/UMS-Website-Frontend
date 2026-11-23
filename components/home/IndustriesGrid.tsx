"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import type { IndustrySlug } from "@/types";

/**
 * Six sector tiles. Hovering or focusing a tile lights up the services that
 * apply, in the rail above the grid and inside the tile itself (always shown on
 * touch devices, where there is no hover).
 */
export function IndustriesGrid() {
  const [activeSlug, setActiveSlug] = useState<IndustrySlug | null>(null);
  const active = industries.find((i) => i.slug === activeSlug);

  return (
    <section aria-labelledby="industries-title" className="bg-offwhite py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="industries-title">
          <SectionHeading
            index="03"
            label="Industries"
            title="Engineered for the way each sector works"
            description="Hover or focus a sector to see which services apply."
          />
        </div>

        {/* Service rail */}
        <ul
          aria-label="Services applicable to the highlighted sector"
          className="mt-10 flex flex-wrap gap-2"
        >
          {services.map((s) => {
            const on = active?.services.includes(s.slug);
            const dim = active && !on;
            const fire = s.accent === "fire";
            return (
              <li key={s.slug}>
                <span
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300",
                    on
                      ? fire
                        ? "border-fire bg-fire text-white"
                        : "border-cyan bg-cyan text-white"
                      : "border-line bg-white text-ink",
                    dim && "opacity-35",
                  )}
                >
                  {s.shortName}
                </span>
              </li>
            );
          })}
        </ul>

        <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => {
            const isActive = ind.slug === activeSlug;
            return (
              <RevealItem key={ind.slug}>
                <Link
                  href={`/industries#${ind.slug}`}
                  onMouseEnter={() => setActiveSlug(ind.slug)}
                  onMouseLeave={() => setActiveSlug(null)}
                  onFocus={() => setActiveSlug(ind.slug)}
                  onBlur={() => setActiveSlug(null)}
                  className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden bg-navy-900 text-white sm:aspect-[5/4] lg:aspect-[4/3]"
                >
                  {/* TODO: replace with approved UMS photography */}
                  <SiteImage
                    asset={ind.image}
                    fill
                    sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
                    className={cn(
                      "object-cover transition duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105",
                      isActive ? "opacity-45" : "opacity-65",
                    )}
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-cyan-300 transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                  <span className="absolute left-5 top-5 font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-white/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="absolute right-5 top-5 size-5 text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
                  />
                  <span className="relative p-5 sm:p-6">
                    <span className="block font-heading text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] font-bold uppercase leading-[1.05]">
                      {ind.name}
                    </span>
                    <span className="mt-2 block max-w-sm text-sm text-white/80 line-clamp-2">
                      {ind.summary}
                    </span>
                    <span
                      className={cn(
                        "mt-3 block text-xs uppercase tracking-[0.1em] text-cyan-300 transition-all duration-300",
                        "[@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0",
                        "[@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100",
                        "[@media(hover:hover)]:group-focus-visible:translate-y-0 [@media(hover:hover)]:group-focus-visible:opacity-100",
                      )}
                    >
                      {ind.services
                        .map((s) => services.find((x) => x.slug === s)?.shortName)
                        .join(" · ")}
                    </span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
