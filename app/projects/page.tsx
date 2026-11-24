import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectsLibrary } from "@/components/projects/ProjectsLibrary";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectCounts } from "@/lib/projects";
import { absoluteUrl, jsonLd } from "@/lib/seo";

const description =
  "Hospitals, malls, headquarters and developments where UMS delivered MEP, HVAC, fire protection, electrical and plumbing works. Browse by status, sector, location and service.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Projects | ${site.name}`,
    description,
    url: "/projects",
  },
  twitter: { card: "summary_large_image", title: `Projects | ${site.name}`, description },
};

export default function ProjectsPage() {
  const counts = projectCounts();
  const stats: { label: string; value: string }[] = [
    { label: "Projects", value: String(counts.total) },
    { label: "Featured case studies", value: String(counts.featured) },
    { label: "Completed", value: String(counts.completed) },
    { label: "Ongoing", value: String(counts.ongoing) },
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: absoluteUrl(`/projects/${p.slug}`),
      })),
    },
  ];

  return (
    <>
      {structuredData.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
      ))}

      <section
        aria-labelledby="projects-title"
        className="relative isolate overflow-hidden bg-navy-900 pb-12 pt-[calc(var(--header-h)+2.5rem)] text-white md:pb-16"
      >
        <BlueprintGrid variant="dark" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Breadcrumbs tone="light" items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                <span aria-hidden className="h-px w-8 bg-cyan-300" />
                Our Projects
              </p>
              <h1 id="projects-title" className="mt-5 text-[clamp(2.5rem,1.5rem+4.6vw,5.5rem)] text-white">
                Buildings we have delivered
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-white/75">
                Hospitals, malls, headquarters and developments across Pakistan, each with the sector, city and
                package UMS delivered.
              </p>
            </div>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-px border border-white/15 bg-white/15 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-navy-900 p-5 sm:p-6">
                <dt className="font-heading text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-white/60">
                  {s.label}
                </dt>
                <dd className="mt-1 font-heading text-4xl font-bold tabular-nums text-white">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* useSearchParams needs a Suspense boundary; the fallback is the real, unfiltered grid. */}
      <Suspense
        fallback={
          <section className="relative bg-navy-900 pb-20 pt-4 text-white md:pb-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {projects.map((p, i) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} index={i} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        }
      >
        <ProjectsLibrary />
      </Suspense>
    </>
  );
}
