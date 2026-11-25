import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";

/** Numbered index of the confirmed projects: an editorial list, not a grid of cards. */
export function ProjectList() {
  return (
    <ol className="divide-y divide-white/15 border-y border-white/15">
      {projects.map((p, i) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 transition-colors hover:bg-white/[0.04] sm:grid-cols-[4rem_1fr_auto] sm:py-8"
          >
            <span className="mono-label pl-1 text-cyan-300 sm:pl-3">{String(i + 1).padStart(2, "0")}</span>
            <span className="font-heading text-[clamp(1.5rem,1rem+2.2vw,2.75rem)] font-bold uppercase leading-tight tracking-[0.01em] text-white transition-transform duration-300 group-hover:translate-x-2">
              {p.name}
            </span>
            <ArrowUpRight
              aria-hidden
              className="mr-1 size-6 text-white/50 transition-colors group-hover:text-cyan-300 sm:mr-3"
            />
          </Link>
        </li>
      ))}
    </ol>
  );
}
