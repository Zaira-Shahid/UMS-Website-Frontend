import type { Metadata } from "next";
import { ProjectsBrowser, type BrowserProject } from "@/components/projects/ProjectsBrowser";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { ProjectBand } from "@/components/ui/ProjectBand";
import { featuredImages } from "@/content/home";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/seo";

const description = "Selected UMS projects, by sector.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { type: "website", siteName: `${site.name} — ${site.fullName}`, title: `Projects | ${site.name}`, description, url: "/projects" },
  twitter: { card: "summary_large_image", title: `Projects | ${site.name}`, description },
};

export default function ProjectsPage() {
  const items: BrowserProject[] = projects.map((p) => ({
    slug: p.slug,
    name: p.name,
    city: p.city,
    sector: p.sector,
    sectorName: industries.find((i) => i.slug === p.sector)?.name,
    image: featuredImages[p.slug],
  }));
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
      itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: absoluteUrl(`/projects/${p.slug}`) })),
    },
  ];

  return (
    <>
      {structuredData.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
      ))}
      <PageBanner title="Projects" intro="Selected projects, by sector." crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]} titleId="projects-title" art />
      <section aria-labelledby="projects-list-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="projects-list-title" lead="Our" accent="Projects" />
          <div className="mt-8">
            <ProjectsBrowser projects={items} />
          </div>
        </div>
      </section>
      <ProjectBand />
    </>
  );
}
