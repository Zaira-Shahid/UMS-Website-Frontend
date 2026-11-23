"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, ShieldCheck, Target, Users } from "lucide-react";
import type { ComponentType } from "react";
import { SiteImage } from "@/components/ui/SiteImage";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { services } from "@/content/services";
import type { NavLink } from "@/types";
import { cn } from "@/lib/utils";

const aboutIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/about": Building2,
  "/about/mission-values": Target,
  "/about/team": Users,
  "/quality-safety-delivery": ShieldCheck,
  "/about/credentials": BadgeCheck,
};

export function AboutPanel({
  links,
  onNavigate,
}: {
  links: NavLink[];
  onNavigate: () => void;
}) {
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
                className="group flex gap-4 rounded-ums p-4 transition-colors hover:bg-offwhite"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-ums border border-line text-cyan transition-colors group-hover:border-cyan group-hover:bg-cyan group-hover:text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-heading text-base font-semibold uppercase tracking-[0.06em] text-navy">
                    {l.label}
                  </span>
                  {l.description && (
                    <span className="mt-0.5 block text-sm text-muted">{l.description}</span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-12 gap-8 px-8 py-8">
      <ul className="col-span-9 grid grid-cols-3 gap-4">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              onClick={onNavigate}
              className="group relative block aspect-[4/3] overflow-hidden rounded-ums bg-navy-900"
            >
              <SiteImage
                asset={s.image}
                sizes="(min-width:1280px) 280px, 22vw"
                className="size-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-50"
              />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  s.accent === "fire" ? "bg-fire" : "bg-cyan-300",
                )}
              />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent p-4">
                <span className="font-heading text-lg font-semibold uppercase leading-tight tracking-[0.04em] text-white">
                  {s.name}
                </span>
                <span className="mt-1 line-clamp-2 text-[0.8125rem] leading-snug text-white/75">
                  {s.tagline}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <aside className="col-span-3 flex flex-col justify-between bg-navy p-6 text-white">
        <div>
          <p className="font-heading text-xl font-semibold uppercase leading-tight tracking-[0.04em]">
            Not sure which service?
          </p>
          <p className="mt-3 text-sm text-white/75">
            Describe your building and we will point you to the right scope.
          </p>
          <div className="mt-5">
            <Button
              href={quoteHref()}
              onClick={onNavigate}
              variant="accent"
              size="sm"
              arrow
            >
              Request a quote
            </Button>
          </div>
        </div>
        <Link
          href="/services"
          onClick={onNavigate}
          className="group mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-cyan-300 hover:text-white"
        >
          View all services
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </aside>
    </div>
  );
}
