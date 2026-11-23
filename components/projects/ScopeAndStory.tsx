import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { serviceBySlug } from "@/content/services";
import type { Project } from "@/types";

const story = [
  ["Challenge", "What made this project demanding — site constraints, programme, building type."],
  ["Solution", "How UMS approached design coordination, installation and commissioning."],
  ["Outcome", "What was delivered and handed over, in the client's confirmed terms."],
] as const;

/**
 * Scope delivered (service chips → /services/<slug>) followed by the
 * Challenge → Solution → Outcome structure. The narrative is placeholder
 * structure only: nothing here states a project fact (TODO: client to confirm).
 */
export function ScopeAndStory({ project: p }: { project: Project }) {
  const scope = p.services.map((s) => serviceBySlug(s)).filter((s) => !!s);
  return (
    <div className="space-y-14">
      <section aria-labelledby="scope-title">
        <h2 id="scope-title" className="font-heading text-2xl font-bold uppercase text-navy">
          Scope delivered
        </h2>
        {scope.length > 0 ? (
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
        ) : (
          // TODO: client to confirm — services UMS delivered on this project
          <div className="mt-5 border border-dashed border-[#b9770e] bg-[#fff6e5] p-5">
            <Badge tone="pending" className="border-0 bg-transparent p-0">
              Scope to be confirmed
            </Badge>
            <p className="mt-2 max-w-xl text-sm text-[#7a4b00]">
              The services UMS delivered on this project will be listed here, each linking to its
              service page, once UMS confirms the scope.
            </p>
          </div>
        )}
      </section>

      <ol className="space-y-8">
        {story.map(([title, hint], i) => (
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
                {/* TODO: client to confirm — write this section from approved project information */}
                <div className="mt-3 border border-dashed border-[#b9770e] bg-[#fff6e5] p-4">
                  <Badge tone="pending" className="border-0 bg-transparent p-0">
                    To be confirmed by UMS
                  </Badge>
                  <p className="mt-2 text-sm text-[#7a4b00]">{hint}</p>
                </div>
              </div>
            </section>
          </li>
        ))}
      </ol>
    </div>
  );
}
