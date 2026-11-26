import Image from "@/components/ui/StaticImage";
import Link from "next/link";
import { ArrowRight, MapPin } from "@/components/ui/lucide";
import type { BrowserProject } from "./ProjectsBrowser";

/** Project card (mockup 19): the project's picture, its name, where it is, the client, and "More Details". */
export function ProjectCard({ p }: { p: BrowserProject }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e4eef7]">
        <Image
          src={p.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 94vw"
          className="object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="text-xl font-bold leading-tight text-navy">{p.name}</h3>
        {p.place && (
          <p className="mt-2 flex items-start gap-1.5 text-[0.9375rem] leading-snug text-muted">
            <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-blue-700" />
            {p.place}
          </p>
        )}
        {p.client && (
          <p className="mt-1 text-[0.9375rem] leading-snug text-muted">
            <span className="font-semibold text-navy">Client:</span> {p.client}
          </p>
        )}
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
