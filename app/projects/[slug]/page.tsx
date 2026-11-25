import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { featuredImages } from "@/content/home";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { adjacentProjects, projectBySlug } from "@/lib/projects";
import { absoluteUrl, jsonLd, ogImage, ogImages } from "@/lib/seo";

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
    openGraph: { images: ogImages,
      type: "article",
      siteName: `${site.name} — ${site.fullName}`,
      title: `${p.name} | ${site.name}`,
      description,
      url: path,
    },
    twitter: { card: "summary_large_image", images: [ogImage.url], title: `${p.name} | ${site.name}`, description },
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

  const sectorName = industries.find((i) => i.slug === p.sector)?.name;
  const image = featuredImages[p.slug];
  const facts = [sectorName && { label: "Sector", value: sectorName }, p.city && { label: "Location", value: p.city }].filter(
    (f): f is { label: string; value: string } => !!f,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <PageBanner
        title={p.name}
        intro={[p.city, sectorName].filter(Boolean).join(" · ") || undefined}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.name }]}
        titleId="project-title"
      />

      <section aria-labelledby="project-about-title" className="bg-white py-12 md:py-16">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {image ? (
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sky-50">
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 55vw, 96vw" className="object-cover" />
              </div>
              <figcaption className="mt-2 text-sm italic text-muted">Illustrative imagery</figcaption>
            </figure>
          ) : null}
          <div className={image ? undefined : "lg:col-span-2 lg:max-w-3xl"}>
            <CenterTitle id="project-about-title" lead="Project" accent="Details" className="text-left [&>span]:mx-0" />
            {facts.length > 0 && (
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 py-3">
                    <dt className="text-muted">{f.label}</dt>
                    <dd className="font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-6 text-base leading-relaxed text-navy md:text-lg">More details about this project, such as scope and photographs, will be shared here once they are confirmed.</p>
            <Button href={quoteHref({ project: p.slug })} size="lg" className="mt-6 h-auto min-h-12 whitespace-normal py-3 text-center">
              Request a Quote for similar work
            </Button>
          </div>
        </div>
      </section>

      {adjacent && (
        <nav aria-label="More projects" className="border-t border-border bg-[#f2f7fb]">
          <div className="wrap grid gap-4 py-6 sm:grid-cols-2">
            <Link href={`/projects/${adjacent.prev.slug}`} rel="prev" className="group flex items-center gap-4 rounded-card border border-blue/70 bg-white p-5 transition-colors hover:border-blue">
              <ArrowLeft aria-hidden className="size-5 shrink-0 text-blue-700 transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-sm text-muted">Previous project</span>
                <span className="mt-1 block font-heading text-lg font-bold text-navy">{adjacent.prev.name}</span>
              </span>
            </Link>
            <Link href={`/projects/${adjacent.next.slug}`} rel="next" className="group flex items-center justify-end gap-4 rounded-card border border-blue/70 bg-white p-5 text-right transition-colors hover:border-blue">
              <span>
                <span className="block text-sm text-muted">Next project</span>
                <span className="mt-1 block font-heading text-lg font-bold text-navy">{adjacent.next.name}</span>
              </span>
              <ArrowRight aria-hidden className="size-5 shrink-0 text-blue-700 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
