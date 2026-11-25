"use client";

import Link from "next/link";
import type { ComponentType, KeyboardEvent } from "react";
import { ArrowUpRight, Building2, ShieldCheck, Target } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

const aboutIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/about": Building2,
  "/about/mission-values": Target,
  "/quality-safety-delivery": ShieldCheck,
};

const scrollbar = "[scrollbar-width:thin] [scrollbar-color:#c3d0da_transparent]";

/** Arrow keys, Home and End move focus between the links inside a panel. */
export function onPanelKeyDown(e: KeyboardEvent<HTMLElement>) {
  const keys = ["ArrowDown", "ArrowUp", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>("a[href]"));
  if (links.length === 0) return;
  e.preventDefault();
  const i = links.indexOf(document.activeElement as HTMLAnchorElement);
  const next =
    e.key === "Home" ? 0 : e.key === "End" ? links.length - 1 : e.key === "ArrowDown" ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
  links[next].focus();
}

const rowClass =
  "group flex items-center gap-4 rounded-xl p-2.5 transition-colors hover:bg-offwhite focus-visible:bg-offwhite focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-cyan";

/** One service: rounded thumbnail, semibold name, one-line description. Used by the desktop panel and the mobile menu. */
export function ServiceRow({ slug, onNavigate, className }: { slug: string; onNavigate: () => void; className?: string }) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  return (
    <Link href={`/services/${s.slug}`} onClick={onNavigate} className={cn(rowClass, className)}>
      <span className="relative h-14 w-[72px] shrink-0 overflow-hidden rounded-lg bg-navy-900">
        <SiteImage asset={s.image} fill sizes="72px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-semibold text-navy">{s.name}</span>
        <span className="mt-0.5 block truncate text-sm text-muted">{s.tagline}</span>
      </span>
    </Link>
  );
}

/** The shared white card the dropdowns sit in. */
const card =
  "rounded-2xl bg-white p-5 text-navy shadow-[0_28px_60px_-24px_rgb(6_20_31/0.45)] ring-1 ring-navy/10";

function PanelHead({ eyebrow, title, href, linkLabel, onNavigate }: { eyebrow: string; title: string; href: string; linkLabel: string; onNavigate: () => void }) {
  return (
    <div className="px-2.5">
      <p className="mono-label text-[0.6875rem] text-muted">{eyebrow}</p>
      <div className="mt-2 flex items-baseline justify-between gap-4">
        <h2 className="font-heading text-[1.75rem] font-bold leading-none text-navy">{title}</h2>
        <Link
          href={href}
          onClick={onNavigate}
          className="inline-flex items-center gap-1 text-sm font-semibold text-cyan transition-colors hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan"
        >
          {linkLabel}
          <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

/** Services dropdown: eyebrow, heading with overview link, then the six services as a vertical list. */
export function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div onKeyDown={onPanelKeyDown} className={cn(card, "w-[600px]")}>
      <PanelHead
        eyebrow="HVAC · Fire · Electrical · Plumbing · MEP · Pools"
        title="Services"
        href="/services"
        linkLabel="Services overview"
        onNavigate={onNavigate}
      />
      <ul className={cn("mt-4 max-h-[calc(100svh-15rem)] space-y-0.5 overflow-y-auto pr-1", scrollbar)}>
        {services.map((s) => (
          <li key={s.slug}>
            <ServiceRow slug={s.slug} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** About dropdown in the same light style, with an icon in place of the thumbnail. */
export function AboutPanel({ links, onNavigate }: { links: NavLink[]; onNavigate: () => void }) {
  const rows = links.filter((l) => l.href !== "/about");
  return (
    <div onKeyDown={onPanelKeyDown} className={cn(card, "w-[420px]")}>
      <PanelHead eyebrow="Company" title="About UMS" href="/about" linkLabel="About overview" onNavigate={onNavigate} />
      <ul className="mt-4 space-y-0.5">
        {rows.map((l) => {
          const Icon = aboutIcons[l.href] ?? Building2;
          return (
            <li key={l.href}>
              <Link href={l.href} onClick={onNavigate} className={rowClass}>
                <span className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-offwhite text-cyan transition-colors group-hover:bg-cyan group-hover:text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-navy">{l.label}</span>
                  {l.description && <span className="mt-0.5 block truncate text-sm text-muted">{l.description}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
