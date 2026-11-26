import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { ProjectGallery, type GalleryImage } from "@/components/projects/ProjectGallery";
import { SectorPills } from "@/components/projects/SectorPills";
import { Button } from "@/components/ui/Button";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { allProjects, projectSectors } from "@/content/projects";
import { quoteHref } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { deliveredInfo, projectBySlug, projectPhoto, sectorOf, serviceGalleryPhoto } from "@/lib/projects";
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

  // Sample projects: the project photo as the large image, photos of the project's first two services as the small ones.
  const gallery: GalleryImage[] = hasDetails
    ? [
        ...(image ? [{ src: image.src, caption: `${p.name} exterior` }] : []),
        ...delivered.slice(0, 2).map((s) => serviceGalleryPhoto[s.slug]),
      ]
    : [];

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
    delivered.length > 0 && { label: "Scope", value: delivered.map((s) => deliveredInfo[s.slug].name).join(", ") },
    p.city && { label: "Location", value: p.city },
  ].filter((r): r is { label: string; value: string } => !!r);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <div className="bg-white pb-8 pt-[calc(4rem+1.25rem)] xl:pt-[calc(var(--header-h)+1.75rem)]">
        <div className="wrap">
          <SectorPills sectors={pillSectors.map((s) => ({ param: s.param, label: s.label }))} active={sector?.param ?? null} />

          <nav aria-label="Breadcrumb" className="mt-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem]">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.href && !last ? (
                      <Link href={c.href} className="font-medium text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-navy">
                        {c.label}
                      </span>
                    )}
                    {!last && <ChevronRight aria-hidden className="size-3.5 text-muted" />}
                  </li>
                );
              })}
            </ol>
          </nav>

          <header className="mt-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-[clamp(1.875rem,1.3rem+2vw,2.875rem)] font-extrabold leading-tight text-navy">{p.name}</h1>
              {p.subtitle && <p className="mt-1 text-lg text-navy md:text-xl">{p.subtitle}</p>}
              <span aria-hidden className="accent-bar mt-3" />
            </div>
            {p.illustrative && <p className="text-sm italic text-muted md:pt-3">Illustrative project</p>}
          </header>

          {hasDetails && gallery.length > 0 && (
            <div className="mt-6">
              <ProjectGallery images={gallery} />
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
            // Real projects: only confirmed facts. The photo is a small low-resolution illustration, so it is shown framed at a
            // safe size beside the text instead of being stretched into a banner.
            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
              {image && (
                <figure className="max-w-[22rem]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sky-50">
                    <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 22rem, 90vw" className="object-cover object-[center_35%]" />
                    {label && <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">{label}</span>}
                  </div>
                  <figcaption className="mt-2 text-sm italic text-muted">Illustrative imagery</figcaption>
                </figure>
              )}
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-navy md:text-lg">Project details will be published soon.</p>
                {snapshot.length > 0 && <SnapshotCard rows={snapshot} />}
              </div>
            </div>
          )}
        </div>
      </div>

      {hasDetails && (
        <>
          <section aria-labelledby="delivered-title" className="bg-white pb-10 md:pb-12">
            <div className="wrap">
              <div className="border-t border-line pt-8 md:pt-10">
              <h2 id="delivered-title" className="text-center text-[1.625rem] font-extrabold text-navy md:text-3xl">
                Services Delivered
              </h2>
              <span aria-hidden className="accent-bar mx-auto mt-2" />
              <ul className="mt-7 grid gap-4 md:grid-cols-3">
                {delivered.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex h-full flex-col gap-2 rounded-xl border border-line bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <span className="flex items-center gap-3">
                        <span style={{ color: serviceColor(s.slug) }} className="flex">
                          <ServiceIcon slug={s.slug} className="size-9" />
                        </span>
                        <span className="font-heading text-xl font-bold text-navy">{deliveredInfo[s.slug].name}</span>
                      </span>
                      <span className="text-base leading-snug text-navy/85">{deliveredInfo[s.slug].line}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="approach-title" className="bg-white pb-10 md:pb-12">
            <div className="wrap">
              <div className="border-t border-line pt-8 md:pt-10">
              <h2 id="approach-title" className="text-center text-[1.625rem] font-extrabold text-navy md:text-3xl">
                Delivery Approach
              </h2>
              <span aria-hidden className="accent-bar mx-auto mt-2" />
              <ol className="mt-7 grid grid-cols-2 gap-3 rounded-xl bg-[#e8f3fb] p-4 md:flex md:items-center md:justify-between md:gap-3 md:px-6 md:py-5">
                {approach.map((step, i) => (
                  <li key={step} className="contents">
                    <span className="flex h-12 items-center justify-center rounded-lg border border-[#c5d8e8] bg-white px-4 text-center font-heading text-base font-bold text-navy md:flex-1 md:text-lg">
                      {step}
                    </span>
                    {i < approach.length - 1 && <ArrowRight aria-hidden className="hidden size-6 shrink-0 text-cyan md:block" />}
                  </li>
                ))}
              </ol>
              </div>
            </div>
          </section>
        </>
      )}

      <div className="bg-[#e8f3fb] py-6 md:py-7">
        <div className="wrap flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
          <Button href="/projects" variant="outline" size="lg" className="border-[#c5d8e8] bg-white max-sm:w-full sm:min-w-[16rem]">
            Back to Projects
          </Button>
          <Button href={quoteLink} size="lg" className="max-sm:w-full sm:min-w-[16rem]">
            Request a Quote
          </Button>
        </div>
      </div>
    </>
  );
}

/** "Project Snapshot": the confirmed facts of the project in a white bordered card (mockup 21). */
function SnapshotCard({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <section aria-labelledby="snapshot-title" className="self-start">
      <h2 id="snapshot-title" className="text-[1.625rem] font-extrabold text-navy md:text-3xl">
        Project Snapshot
      </h2>
      <span aria-hidden className="accent-bar mt-2" />
      <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-white px-5 py-1">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[6rem_1fr] gap-3 py-3.5">
            <dt className="font-bold text-navy">{r.label}:</dt>
            <dd className="text-navy">{r.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
