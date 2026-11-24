import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/types";

/**
 * Scope delivered (service chips linking to each service page) followed by the
 * Challenge, Solution and Outcome narrative.
 */
export function ScopeAndStory({ project: p }: { project: Project }) {
  const scope = p.services.map((s) => serviceBySlug(s)).filter((s) => !!s);
  const story = [
    ["Challenge", p.challenge],
    ["Solution", p.solution],
    ["Outcome", p.outcome],
  ] as const;
  return (
    <div className="space-y-14">
      <section aria-labelledby="scope-title">
        <h2 id="scope-title" className="font-heading text-2xl font-bold uppercase text-navy">
          Scope delivered
        </h2>
        <ul className="mt-5 flex flex-wrap gap-3">
          {scope.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-navy/30 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-cyan hover:bg-cyan hover:text-white"
              >
                {s.name}
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ol className="space-y-8">
        {story.map(([title, text], i) => (
          <li key={title}>
            <section
              aria-labelledby={`story-${title}`}
              className="grid gap-4 border-t-2 border-navy pt-5 sm:grid-cols-[6rem_1fr]"
            >
              <span aria-hidden className="font-heading text-4xl font-bold tabular-nums text-navy/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 id={`story-${title}`} className="font-heading text-2xl font-bold uppercase text-navy">
                  {title}
                </h2>
                <p className="mt-3 max-w-2xl text-ink">{text}</p>
              </div>
            </section>
          </li>
        ))}
      </ol>
    </div>
  );
}
