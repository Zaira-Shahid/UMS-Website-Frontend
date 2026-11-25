import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { adjacentProjects, projectBySlug } from "@/lib/projects";
import { absoluteUrl, jsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  const path = `/projects/${p.slug}`;
  const description = `${p.name}, a UMS project.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: `${site.name} — ${site.fullName}`,
      title: `${p.name} | ${site.name}`,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", title: `${p.name} | ${site.name}`, description },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const adjacent = adjacentProjects(p.slug);
  const url = absoluteUrl(`/projects/${p.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
      { "@type": "ListItem", position: 3, name: p.name, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <PageHero
        sketch="integrated-mep"
        eyebrow="Project"
        title={p.name}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.name }]}
        titleId="project-title"
      />

      <section
        aria-labelledby="similar-title"
        className="relative isolate overflow-hidden bg-navy py-16 text-white md:py-20"
      >
          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="similar-title" className="text-white">
              Need similar work?
            </h2>
            <p className="mt-4 text-white/75">
              Send us the drawings, the brief or just the outline. We will tell you what we need to
              price it and what happens next.
            </p>
          </div>
          <Button
            href={quoteHref({ project: p.slug })}
            variant="primary"
            size="lg"
            arrow
            className="w-full sm:w-auto"
          >
            Request a Quote
          </Button>
        </div>
      </section>

      {adjacent && (
        <nav aria-label="More projects" className="border-t border-line bg-white">
          <div className="mx-auto grid max-w-7xl sm:grid-cols-2">
            <Link
              href={`/projects/${adjacent.prev.slug}`}
              rel="prev"
              className="group flex items-center gap-4 border-b border-line px-5 py-8 transition-colors hover:bg-offwhite sm:border-b-0 sm:border-r sm:px-8"
            >
              <ArrowLeft aria-hidden className="size-5 shrink-0 text-blue transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Previous project
                </span>
                <span className="mt-1 block font-heading text-xl font-bold uppercase text-navy">
                  {adjacent.prev.name}
                </span>
              </span>
            </Link>
            <Link
              href={`/projects/${adjacent.next.slug}`}
              rel="next"
              className="group flex items-center justify-end gap-4 px-5 py-8 text-right transition-colors hover:bg-offwhite sm:px-8"
            >
              <span>
                <span className="block font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Next project
                </span>
                <span className="mt-1 block font-heading text-xl font-bold uppercase text-navy">
                  {adjacent.next.name}
                </span>
              </span>
              <ArrowRight aria-hidden className="size-5 shrink-0 text-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
