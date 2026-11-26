import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProjectGallery, type GalleryImage } from "@/components/projects/ProjectGallery";
import { SectorPills } from "@/components/projects/SectorPills";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { allProjects, projectSectors } from "@/content/projects";
import { quoteHref } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { projectBySlug, projectPhoto, sectorOf, serviceGalleryPhoto } from "@/lib/projects";
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
  const description = p.subtitle ?? p.description ?? `${p.name}, a UMS project.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: path },
    // Sample projects are not UMS work, so search engines are asked to leave them out.
    ...(p.illustrative && { robots: { index: false, follow: true } }),
    openGraph: { images: ogImages, type: "article", siteName: `${site.name} — ${site.fullName}`, title: `${p.name} | ${site.name}`, description, url: path },
    twitter: { card: "summary_large_image", images: [ogImage.url], title: `${p.name} | ${site.name}`, description },
  };
}

/** The four steps of the "Delivery Approach" band. Generic; shown for sample projects only. */
const approach = ["Coordination", "Installation", "Testing", "Handover"];

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const sector = sectorOf(p);
  const { image, label } = projectPhoto(p);
  const delivered = p.services.map((s) => services.find((x) => x.slug === s)).filter((s): s is NonNullable<typeof s> => !!s);
  const hasDetails = Boolean(p.overview) && delivered.length > 0;
  const pillSectors = projectSectors.filter((s) => allProjects.some((x) => x.sector === s.industry));

  // Large image: the project photo. Small images: photos of the project's first two services.
  const gallery: GalleryImage[] = [
    ...(image ? [{ src: image.src, caption: p.illustrative ? "Illustrative exterior" : "Illustrative imagery" }] : []),
    ...(hasDetails ? delivered.slice(0, 2).map((s) => serviceGalleryPhoto[s.slug]) : []),
  ];

  const crumbs = [
    { label: "Projects", href: "/projects" },
    ...(sector ? [{ label: sector.label, href: `/projects?sector=${sector.param}` }] : []),
    { label: p.name },
  ];
  const url = absoluteUrl(`/projects/${p.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      ...crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 2, name: c.label, item: i === crumbs.length - 1 ? url : absoluteUrl(c.href ?? "/projects") })),
    ],
  };
  const quoteLink = quoteHref({ service: delivered[0]?.slug, project: p.slug });
  const snapshot = [
    sector && { label: "Sector", value: sector.label },
    delivered.length > 0 && { label: "Scope", value: delivered.map((s) => s.name).join(", ") },
    p.city && { label: "Location", value: p.city },
  ].filter((r): r is { label: string; value: string } => !!r);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <div className="bg-white pb-6 pt-[calc(4rem+1.25rem)] xl:pt-[calc(var(--header-h)+1.75rem)]">
        <div className="wrap">
          <SectorPills sectors={pillSectors.map((s) => ({ param: s.param, label: s.label }))} active={sector?.param ?? null} />
          <Breadcrumbs items={crumbs} className="mt-5" />

          <header className="mt-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] font-extrabold leading-tight text-navy">{p.name}</h1>
              {p.subtitle && <p className="mt-2 text-lg text-muted md:text-xl">{p.subtitle}</p>}
              <span aria-hidden className="accent-bar mt-3" />
            </div>
            {p.illustrative && <p className="text-sm italic text-muted">Illustrative project</p>}
          </header>

          {gallery.length > 0 && (
            <div className="mt-6">
              <ProjectGallery images={gallery} badge={label} />
            </div>
          )}

          {hasDetails && p.overview ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_auto_1fr] lg:gap-10">
              <section aria-labelledby="overview-title">
                <h2 id="overview-title" className="text-[1.625rem] font-extrabold text-navy md:text-3xl">
                  Project Overview
                </h2>
                <span aria-hidden className="accent-bar mt-2" />
                <div className="mt-5 space-y-4 text-base leading-relaxed text-navy md:text-lg">
                  {p.overview.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </section>
              <div aria-hidden className="hidden w-px bg-[#c5d8e8] lg:block" />
              <SnapshotCard rows={snapshot} />
            </div>
          ) : (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_auto_1fr] lg:gap-10">
              <p className="text-base leading-relaxed text-navy md:text-lg">Project details will be published soon.</p>
              <div aria-hidden className="hidden w-px bg-[#c5d8e8] lg:block" />
              {snapshot.length > 0 && <SnapshotCard rows={snapshot} />}
            </div>
          )}
        </div>
      </div>

      {hasDetails && (
        <>
          <section aria-labelledby="delivered-title" className="bg-white pb-12 pt-6 md:pb-16">
            <div className="wrap">
              <h2 id="delivered-title" className="text-center text-[1.625rem] font-extrabold text-navy md:text-3xl">
                Services Delivered
              </h2>
              <span aria-hidden className="accent-bar mx-auto mt-2" />
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {delivered.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col gap-3 rounded-card border border-border bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span className="flex size-12 items-center justify-center rounded-xl bg-sky-50" style={{ color: serviceColor(s.slug) }}>
                        <ServiceIcon slug={s.slug} className="size-7" />
                      </span>
                      <span className="font-heading text-xl font-bold text-navy">{s.name}</span>
                      <span className="text-[0.9375rem] leading-snug text-muted">{s.tagline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="approach-title" className="bg-white pb-12 md:pb-16">
            <div className="wrap">
              <h2 id="approach-title" className="text-center text-[1.625rem] font-extrabold text-navy md:text-3xl">
                Delivery Approach
              </h2>
              <span aria-hidden className="accent-bar mx-auto mt-2" />
              <ol className="mt-8 grid grid-cols-2 gap-3 rounded-2xl bg-[#e8f3fb] p-4 md:flex md:items-center md:justify-between md:gap-2 md:p-6">
                {approach.map((step, i) => (
                  <li key={step} className="contents">
                    <span className="flex h-14 items-center justify-center rounded-xl border-2 border-blue bg-white px-4 text-center font-heading text-base font-bold text-navy md:flex-1 md:text-lg">{step}</span>
                    {i < approach.length - 1 && <ArrowRight aria-hidden className="hidden size-6 shrink-0 text-blue md:block" />}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </>
      )}

      <div className="wrap pb-12 md:pb-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button href="/projects" variant="outline" size="lg" className="max-sm:w-full">
            Back to Projects
          </Button>
          <Button href={quoteLink} size="lg" className="max-sm:w-full">
            Request a Quote
          </Button>
        </div>
      </div>
    </>
  );
}

/** "Project Snapshot": a light card with the confirmed facts of the project. */
function SnapshotCard({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <section aria-labelledby="snapshot-title" className="self-start rounded-card bg-[#f2f7fb] p-5 md:p-6">
      <h2 id="snapshot-title" className="text-[1.625rem] font-extrabold text-navy md:text-3xl">
        Project Snapshot
      </h2>
      <span aria-hidden className="accent-bar mt-2" />
      <dl className="mt-4 divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[6rem_1fr] gap-3 py-3">
            <dt className="text-muted">{r.label}</dt>
            <dd className="font-semibold text-navy">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
