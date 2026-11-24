import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { SiteImage } from "@/components/ui/SiteImage";
import { industries } from "@/content/industries";
import { statusLabel } from "@/lib/projects";
import type { Project } from "@/types";

/** Dark case-study hero with sector, city and status badges. */
export function CaseStudyHero({ project: p }: { project: Project }) {
  const sector = industries.find((x) => x.slug === p.sector);
  return (
    <section
      aria-labelledby="case-title"
      className="relative isolate overflow-hidden bg-navy-900 pb-16 pt-[calc(var(--header-h)+2.5rem)] text-white lg:pb-24"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: p.name },
          ]}
        />
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
              <span aria-hidden className="h-px w-8 bg-cyan-300" />
              Case study
            </p>
            <h1 id="case-title" className="mt-5 text-[clamp(2.25rem,1.4rem+3.8vw,4.5rem)] text-white">
              {p.name}
            </h1>
            <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Project summary">
              {sector && (
                <li>
                  <Badge tone="cyan">{sector.name}</Badge>
                </li>
              )}
              <li>
                <Badge tone="outline" className="border-white/30 text-white/85">
                  {p.location}
                </Badge>
              </li>
              <li>
                <Badge tone="navy" className="border border-white/30">
                  {statusLabel[p.status]} · {p.year}
                </Badge>
              </li>
            </ul>
            <p className="mt-6 max-w-xl text-white/75">{p.summary}</p>
          </div>

          <div className="lg:col-span-6">
            <CornerBrackets tone="light">
              <div className="relative aspect-[4/3] overflow-hidden bg-navy">
                <SiteImage
                  asset={p.image}
                  fill
                  priority
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent"
                />
              </div>
            </CornerBrackets>
          </div>
        </div>
      </div>
    </section>
  );
}
