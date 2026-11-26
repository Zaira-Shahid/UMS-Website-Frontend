import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";
import { ServiceIcon, serviceColor } from "./ServiceIcon";

/** White card: 16px radius, a very soft shadow. Used for service tiles, client logos and FAQ items. */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-card bg-white shadow-card", className)}>{children}</div>;
}

/**
 * Service tile (mobile "Our Services" grid): a coloured icon tile and the service name, linking to its page.
 * The `active` tile (or the hovered or focused one) gets a blue border.
 */
export function ServiceCard({ slug, label, active, className }: { slug: ServiceSlug; label: string; active?: boolean; className?: string }) {
  const color = serviceColor(slug);
  return (
    <Link
      href={`/services/${slug}`}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group flex items-center rounded-card border-2 bg-white shadow-card transition-colors hover:border-blue focus-visible:border-blue",
        "gap-4 p-3 sm:p-4",
        active ? "border-blue bg-cyan-100/40" : "border-transparent",
        className,
      )}
    >
      <span
        className="flex size-14 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `color-mix(in srgb, ${color} 14%, white)`, color }}
      >
        <ServiceIcon slug={slug} className="size-8" />
      </span>
      <span className="text-[1.0625rem] font-bold leading-tight text-navy">{label}</span>
    </Link>
  );
}
