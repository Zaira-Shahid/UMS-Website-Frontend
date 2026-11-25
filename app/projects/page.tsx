import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/ProjectList";
import { PageHero } from "@/components/layout/PageHero";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, jsonLd } from "@/lib/seo";

const description = "Selected UMS projects.";

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
      <PageHero
        eyebrow="Our Projects"
        title="Projects"
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        titleId="projects-title"
      />
      <section aria-label="Project list" className="relative bg-navy-900 pb-20 text-white md:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ProjectList />
        </div>
      </section>
    </>
  );
}
