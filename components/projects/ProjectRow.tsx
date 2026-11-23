import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SiteImage } from "@/components/ui/SiteImage";
import { industries } from "@/content/industries";
import { serviceBySlug } from "@/content/services";
import { statusLabel } from "@/lib/projects";
import type { Project } from "@/types";

/**
 * List-view row for the projects library (dark surface). Unconfirmed facts render
 * as pending placeholders — nothing is invented (TODO: client to confirm).
 */
export function ProjectRow({ project: p, index }: { project: Project; index: number }) {
  const sector = industries.find((x) => x.slug === p.sector);
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group flex items-center gap-4 border border-white/15 bg-white/[0.03] p-3 transition-colors hover:border-cyan-300/60 hover:bg-white/[0.06] sm:gap-6 sm:p-4"
    >
      <span className="relative h-20 w-24 shrink-0 overflow-hidden bg-navy sm:h-24 sm:w-36">
        <SiteImage
          asset={p.image}
          fill
          sizes="(min-width:640px) 9rem, 6rem"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-3">
          <span className="font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-white/55">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-heading text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            {p.name}
          </span>
        </span>
        <span className="mt-2 flex flex-wrap items-center gap-2 text-sm">
          {sector ? (
            <Badge tone="cyan">{sector.name}</Badge>
          ) : (
            <Badge tone="pending">Sector · to be confirmed</Badge>
          )}
          {p.location ? (
            <span className="text-white/75">{p.location}</span>
          ) : (
            <Badge tone="pending">Location · to be confirmed</Badge>
          )}
          <span className="hidden text-white/60 sm:inline">
            {p.status === "unconfirmed" ? "" : statusLabel[p.status]}
          </span>
          {p.services.map((slug) => (
            <span
              key={slug}
              className="hidden rounded-full border border-white/25 px-2.5 py-0.5 text-xs uppercase tracking-[0.08em] text-white/80 md:inline"
            >
              {serviceBySlug(slug)?.shortName}
            </span>
          ))}
        </span>
      </span>
      <ArrowRight
        aria-hidden
        className="size-5 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1.5"
      />
    </Link>
  );
}
