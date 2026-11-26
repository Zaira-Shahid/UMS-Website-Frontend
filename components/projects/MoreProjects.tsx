"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ServiceChips } from "./ServiceChips";
import type { BrowserProject } from "./ProjectsBrowser";

const STEP = 4;

/** "More Projects": a compact two-column list of rows. Four show first; "Load more projects" reveals four more. */
export function MoreProjects({ projects }: { projects: BrowserProject[] }) {
  const [count, setCount] = useState(STEP);
  const shown = projects.slice(0, count);

  return (
    <section aria-labelledby="more-projects-title" className="mt-12 border-t border-line pt-10 md:mt-14">
      <h2 id="more-projects-title" className="text-[clamp(1.5rem,1.1rem+1.3vw,2.125rem)] font-extrabold text-navy">
        More Projects
      </h2>
      <span aria-hidden className="accent-bar mt-2 block" />
      <p className="mt-3 text-base text-muted md:text-lg">Further work across our sectors.</p>

      <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
        {shown.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/projects/${p.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-line bg-white p-3 transition duration-200 hover:border-blue hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-reduce:transition-none"
            >
              <span className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-navy-950 via-navy-900 to-[#3f78a8] md:size-[4.5rem]">
                {p.image ? <Image src={p.image.src} alt="" fill sizes="72px" className="object-cover" /> : <Building2 aria-hidden strokeWidth={1.4} className="size-7 text-white/70" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg font-bold leading-tight text-navy">{p.name}</span>
                {p.city && <span className="mt-0.5 block text-sm text-muted">{p.city}</span>}
                <ServiceChips services={p.services} className="mt-2" />
              </span>
              <ArrowRight aria-hidden className="size-5 shrink-0 text-blue-700 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </li>
        ))}
      </ul>

      {count < projects.length && (
        <div className="mt-6 text-center">
          <Button type="button" variant="outline" onClick={() => setCount((c) => c + STEP)}>
            Load more projects
          </Button>
        </div>
      )}
    </section>
  );
}
