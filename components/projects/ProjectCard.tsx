import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { ServiceChips } from "./ServiceChips";
import type { BrowserProject } from "./ProjectsBrowser";

/** Project card (mockup 19): photo with a small badge, title, one line, service chips and "More Details". */
export function ProjectCard({ p }: { p: BrowserProject }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[5/2] overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-[#3f78a8]">
        {p.image ? (
          <>
            <Image src={p.image.src} alt="" fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 94vw" className="object-cover object-[center_30%]" />
            {p.imageLabel && (
              <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-navy">{p.imageLabel}</span>
            )}
          </>
        ) : (
          <Building2 aria-hidden strokeWidth={1.2} className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 text-white/60" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-xl font-bold leading-tight text-navy">{p.name}</h3>
        {p.description && <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{p.description}</p>}
        {!p.description && p.city && <p className="mt-1.5 text-[0.9375rem] text-muted">{p.city}</p>}
        <ServiceChips services={p.services} className="mt-3" />
        <Link
          href={`/projects/${p.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 pt-4 font-heading font-bold text-blue-700 after:absolute after:inset-0 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          More Details
          <span className="sr-only"> about {p.name}</span>
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}
