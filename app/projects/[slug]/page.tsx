import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { ServiceChips } from "@/components/projects/ServiceChips";
import { Button } from "@/components/ui/Button";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { PageBanner } from "@/components/ui/PageBanner";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { allProjects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { adjacentProjects, projectBySlug, projectPhoto } from "@/lib/projects";
import { absoluteUrl, jsonLd, ogImage, ogImages } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  const path = `/projects/${p.slug}`;
  const description = p.description ?? `${p.name}, a UMS project.`;
  return {
    title: p.name,
    description,
    // Sample projects are not UMS work, so search engines are asked to leave them out.
    ...(p.illustrative && { robots: { index: false, follow: true } }),
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
  const { image, label } = projectPhoto(p);
  const delivered = p.services.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is NonNullable<typeof s> => !!s);
  const facts = [sectorName && { label: "Sector", value: sectorName }, p.city && { label: "Location", value: p.city }].filter(
    (f): f is { label: string; value: string } => !!f,
  );
  const quoteLink = delivered[0] ? quoteHref({ service: delivered[0].slug }) : quoteHref({ project: p.slug });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <PageBanner
        title={p.name}
        intro={[p.city, sectorName].filter(Boolean).join(" · ") || undefined}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.name }]}
        titleId="project-title"
      >
        {(sectorName || delivered.length > 0) && (
          <div className="flex flex-wrap items-center gap-3">
            {sectorName && <span className="rounded-lg border border-white/70 px-3 py-1.5 text-sm font-semibold text-white">{sectorName}</span>}
            <ServiceChips services={p.services} />
          </div>
        )}
      </PageBanner>

      <section aria-labelledby="project-about-title" className="bg-white py-12 md:py-16">
        <div className="wrap grid items-start gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {image ? (
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sky-50">
                <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 55vw, 96vw" className="object-cover" />
                {label && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">{label}</span>}
              </div>
              {p.illustrative && <figcaption className="mt-2 text-sm italic text-muted">Illustrative project: a sample that shows how UMS projects are presented.</figcaption>}
            </figure>
          ) : null}
          <div className={image ? undefined : "lg:col-span-2 lg:max-w-3xl"}>
            <CenterTitle id="project-about-title" lead="Project" accent="Overview" className="text-left [&>span]:mx-0" />
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
            <p className="mt-6 text-base leading-relaxed text-navy md:text-lg">
              {p.illustrative
                ? `${p.description} The services shown are examples of the scope typically delivered on this type of building.`
                : "More details about this project, such as scope and photographs, will be shared here once they are confirmed."}
            </p>
          </div>
        </div>
      </section>

      {delivered.length > 0 && (
        <section aria-labelledby="delivered-title" className="bg-[#f2f7fb] py-12 md:py-16">
          <div className="wrap">
            <CenterTitle id="delivered-title" lead="Services" accent="Delivered" />
            <ul className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {delivered.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="flex h-full items-start gap-3 rounded-card border border-border bg-white p-4 transition-colors hover:border-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50" style={{ color: serviceColor(s.slug) }}>
                      <ServiceIcon slug={s.slug} className="size-6" />
                    </span>
                    <span>
                      <span className="block font-heading font-bold text-navy">{s.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{s.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="project-cta-title" className="wrap py-10 md:py-14">
        <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-navy-950 px-6 py-8 text-white md:flex-row md:items-center md:px-12">
          <h2 id="project-cta-title" className="text-[clamp(1.5rem,1rem+1.8vw,2.25rem)] font-extrabold text-white">
            Discuss a similar project
          </h2>
          <Button href={quoteLink} size="lg" className="max-md:w-full">
            Request a Quote
          </Button>
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
