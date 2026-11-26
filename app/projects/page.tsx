import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ProjectsBrowser, ProjectsView, type BrowserProject } from "@/components/projects/ProjectsBrowser";
import { ProjectBand } from "@/components/ui/ProjectBand";
import { allProjects, projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPhoto, sectorOf } from "@/lib/projects";
import { absoluteUrl, jsonLd, ogImage, ogImages } from "@/lib/seo";

const description = "Explore UMS work by sector: healthcare, commercial and retail, residential and institutional.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { images: ogImages, type: "website", siteName: `${site.name} — ${site.fullName}`, title: `Projects | ${site.name}`, description, url: "/projects" },
  twitter: { card: "summary_large_image", images: [ogImage.url], title: `Projects | ${site.name}`, description },
};

/** Stock photo of a modern building with a sweeping roof (Declan Sun, Unsplash), a placeholder until UMS photography is supplied. */
const banner = { src: "/images/projects/projects-banner.jpg", position: "center" };

export default function ProjectsPage() {
  const items: BrowserProject[] = allProjects.map((p) => {
    const { image, label } = projectPhoto(p);
    return { slug: p.slug, name: p.name, city: p.city, sectorParam: sectorOf(p)?.param, description: p.description, services: p.services, image, imageLabel: label, illustrative: p.illustrative };
  });
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
      // Only the real projects are listed as structured data; the illustrative samples are not UMS work.
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

      {/* Banner (mockups 19, 20): the photo fills the background; a navy gradient on the left (a full dark overlay on phones) keeps the title readable. */}
      <section aria-labelledby="projects-title" className="relative isolate overflow-hidden bg-navy-900 pb-8 pt-[calc(4rem+1.75rem)] text-white xl:pb-10 xl:pt-[calc(var(--header-h)+2rem)]">
        <Image src={banner.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: banner.position }} />
        <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/70 md:bg-gradient-to-r md:from-navy-900 md:from-30% md:via-navy-900/75 md:via-55% md:to-navy-900/10" />
        <div className="wrap">
          <h1 id="projects-title" className="text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] font-extrabold leading-tight text-white">
            Our Projects
          </h1>
          <p className="mt-2 text-lg text-white md:text-xl">Explore our work by sector.</p>
        </div>
      </section>

      <section aria-label="Projects" className="bg-white py-8 md:py-10">
        <div className="wrap">
          {/* The fallback is the full "All Projects" view, so the static HTML already lists every project. */}
          <Suspense fallback={<ProjectsView projects={items} sector="all" />}>
            <ProjectsBrowser projects={items} />
          </Suspense>
        </div>
      </section>
      <ProjectBand />
    </>
  );
}
