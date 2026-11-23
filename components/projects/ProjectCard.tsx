import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { SiteImage } from "@/components/ui/SiteImage";
import { industries } from "@/content/industries";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/types";

/**
 * Case-study card (dark surfaces). Only project NAMES are confirmed — sector,
 * location and UMS package render as pending placeholders until the client
 * supplies them (TODO: client to confirm).
 */
export function ProjectCard({
  project: p,
  index,
  sizes = "(min-width:1024px) 26rem, (min-width:640px) 24rem, 82vw",
}: {
  project: Project;
  index: number;
  sizes?: string;
}) {
  const sector = industries.find((x) => x.slug === p.sector);
  return (
    <Link href={`/projects/${p.slug}`} className="group block">
      <CornerBrackets tone="light">
        <div className="relative aspect-[4/5] overflow-hidden bg-navy">
          {/* TODO: replace with approved UMS photography */}
          <SiteImage
            asset={p.image}
            fill
            sizes={sizes}
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-transparent to-navy-900/30 transition-opacity duration-500 group-hover:opacity-70"
          />
          <span className="absolute left-4 top-4 font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-white/80">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <span className="font-heading text-2xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-white">
              {p.name}
            </span>
            <ArrowRight
              aria-hidden
              className="mb-1 size-5 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1.5"
            />
          </span>
        </div>
      </CornerBrackets>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          {sector ? (
            <Badge tone="cyan">{sector.name}</Badge>
          ) : (
            // TODO: client to confirm — sector
            <Badge tone="pending">Sector · to be confirmed</Badge>
          )}
          {p.location ? (
            <span className="text-white/75">{p.location}</span>
          ) : (
            // TODO: client to confirm — location
            <Badge tone="pending">Location · to be confirmed</Badge>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {p.services.length > 0 ? (
            p.services.map((slug) => (
              <span
                key={slug}
                className="rounded-full border border-white/25 px-3 py-1 text-xs uppercase tracking-[0.08em] text-white/85"
              >
                {serviceBySlug(slug)?.shortName}
              </span>
            ))
          ) : (
            // TODO: client to confirm — UMS package
            <Badge tone="pending">UMS package · to be confirmed</Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
