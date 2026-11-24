"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentType } from "react";
import { ArrowRight, BadgeCheck, Building2, ShieldCheck, Target, Users } from "lucide-react";
import { ServiceIcon } from "@/components/home/ServiceIcons";
import { Button } from "@/components/ui/Button";
import { quoteHrefForPath } from "@/content/navigation";
import { services } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

const aboutIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/about": Building2,
  "/about/mission-values": Target,
  "/about/team": Users,
  "/quality-safety-delivery": ShieldCheck,
  "/about/credentials": BadgeCheck,
};

/** About menu: five links, each with an icon and a one-line description. */
export function AboutPanel({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-8 py-8">
      <ul className="grid grid-cols-3 gap-x-8 gap-y-2">
        {links.map((l) => {
          const Icon = aboutIcons[l.href] ?? Building2;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={onNavigate}
                className="group flex gap-4 p-4 transition-colors hover:bg-white/[0.06]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center border border-white/20 text-cyan-300 transition-colors group-hover:border-cyan-300 group-hover:bg-cyan group-hover:text-navy-950">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-heading text-base font-semibold uppercase tracking-[0.06em] text-white">
                    {l.label}
                  </span>
                  {l.description && <span className="mt-0.5 block text-sm text-white/65">{l.description}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Services menu: six disciplines with colour bars and animated icons on the left; the discipline
 * under the pointer (or keyboard focus) is previewed on the right with its systems and a quote link.
 */
export function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const active = services.find((s) => s.slug === activeSlug) ?? services[0];
  const color = disciplineColor[active.slug];

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-8 py-8">
      <ul className="col-span-7 grid grid-cols-2 gap-x-4 gap-y-1">
        {services.map((s) => {
          const c = disciplineColor[s.slug];
          const isActive = s.slug === activeSlug;
          return (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                onClick={onNavigate}
                onPointerEnter={() => setActiveSlug(s.slug)}
                onFocus={() => setActiveSlug(s.slug)}
                className={cn(
                  "group relative flex gap-4 py-3 pl-5 pr-3 transition-colors",
                  isActive ? "bg-white/[0.07]" : "hover:bg-white/[0.04]",
                )}
              >
                <span
                  aria-hidden
                  className="absolute inset-y-2 left-0 w-1 origin-top transition-transform duration-300"
                  style={{ background: c, transform: isActive ? "scaleY(1)" : "scaleY(0.35)" }}
                />
                <span style={{ color: c }} className="mt-0.5 shrink-0">
                  <ServiceIcon slug={s.slug} className="size-9" />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-[1.0625rem] font-semibold uppercase leading-tight tracking-[0.04em] text-white">
                    {s.name}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-[0.8125rem] leading-snug text-white/65">
                    {s.tagline}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <aside
        aria-label={`${active.name} preview`}
        className="col-span-5 flex flex-col justify-between border border-white/15 bg-navy-900/60 p-6"
      >
        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="mono-label" style={{ color }}>
              [ {active.shortName} ]
            </p>
            <span aria-hidden className="icon-live" style={{ color }}>
              <ServiceIcon slug={active.slug} className="size-14" />
            </span>
          </div>
          <p className="mt-3 text-sm text-white/75">{active.summary.split(". ")[0]}.</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {active.systems.slice(0, 4).map((sys) => (
              <li key={sys.name} className="mono-label border border-white/20 px-2 py-1 text-[0.625rem] text-white/80">
                {sys.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <Link
            href="/services"
            onClick={onNavigate}
            className="group inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-cyan-300 hover:text-white"
          >
            All services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
          <Button
            href={quoteHrefForPath(pathname).includes("service=") ? quoteHrefForPath(pathname) : `/request-a-quote?service=${active.slug}`}
            onClick={onNavigate}
            variant="accent"
            size="sm"
            arrow
          >
            Quote for {active.shortName}
          </Button>
        </div>
      </aside>
    </div>
  );
}
