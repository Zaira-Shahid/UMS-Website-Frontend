import type { ReactNode } from "react";
import { DisciplineSketch } from "@/components/home/DisciplineSketch";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { disciplineColor } from "@/lib/discipline";
import type { ServiceSlug } from "@/types";

/**
 * Light hero for inner pages: strong type, with an optional small line drawing of a discipline on the right.
 * Sits under the header, which is white on these pages.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  titleId = "page-title",
  sketch,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  titleId?: string;
  /** Discipline whose line drawing decorates the hero. */
  sketch?: ServiceSlug;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={titleId} className="relative isolate overflow-hidden bg-offwhite pb-12 pt-[calc(var(--header-h)+2.5rem)] md:pb-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12">
          <div className={sketch ? "lg:col-span-8" : "lg:col-span-9"}>
            <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#00608c]">
              <span aria-hidden className="h-px w-8 bg-cyan" />
              {eyebrow}
            </p>
            <h1 id={titleId} className="mt-5 text-[clamp(2.25rem,1.4rem+3.8vw,4.5rem)] text-navy">
              {title}
            </h1>
            {intro && <p className="mt-5 max-w-2xl text-lg text-muted">{intro}</p>}
            {children}
          </div>
          {sketch && (
            <div aria-hidden className="hidden lg:col-span-4 lg:block" style={{ color: disciplineColor[sketch] }}>
              <DisciplineSketch slug={sketch} className="mx-auto w-full max-w-[18rem]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
