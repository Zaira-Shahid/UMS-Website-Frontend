import type { ReactNode } from "react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/** Compact dark hero for text-led pages (forms, simple pages). Sits under the transparent header. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  titleId = "page-title",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  crumbs: Crumb[];
  titleId?: string;
  children?: ReactNode;
}) {
  return (
    <section
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden bg-navy-900 pb-12 pt-[calc(var(--header-h)+2.5rem)] text-white md:pb-16"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs tone="light" items={crumbs} />
        <div className="mt-10 max-w-3xl">
          <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
            <span aria-hidden className="h-px w-8 bg-cyan-300" />
            {eyebrow}
          </p>
          <h1 id={titleId} className="mt-5 text-[clamp(2.25rem,1.4rem+3.8vw,4.5rem)] text-white">
            {title}
          </h1>
          {intro && <p className="mt-5 text-lg text-white/75">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
