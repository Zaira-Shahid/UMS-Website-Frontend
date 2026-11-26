import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SectorPills } from "@/components/projects/SectorPills";
import { Button } from "@/components/ui/Button";
import { projects, projectSectors } from "@/content/projects";
import { quoteHref } from "@/content/navigation";
import { site } from "@/content/site";
import { placeOf, projectBySlug, sectorOf } from "@/lib/projects";
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
  const place = placeOf(p);
  const description = `${p.name}${place ? `, ${place}` : ""}${p.client ? `. Client: ${p.client}` : ""}. A project from the UMS company profile.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: path },
    openGraph: { images: ogImages, type: "article", siteName: `${site.name} — ${site.fullName}`, title: `${p.name} | ${site.name}`, description, url: path },
    twitter: { card: "summary_large_image", images: [ogImage.url], title: `${p.name} | ${site.name}`, description },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  const sector = sectorOf(p);
  const place = placeOf(p);
  const pillSectors = projectSectors.filter((s) => projects.some((x) => x.sector === s.industry));
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

  // Only what the company profile states about this project.
  const rows = [
    sector && { label: "Sector", value: sector.label },
    place && { label: "Location", value: place },
    p.client && { label: "Client", value: p.client },
    p.consultant && { label: "Consultant", value: p.consultant },
    p.civilContractor && { label: "Civil contractor", value: p.civilContractor },
    p.mepContractor && { label: "MEP contractor", value: p.mepContractor },
    p.contractor && { label: "Contractor", value: p.contractor },
  ].filter((r): r is { label: string; value: string } => !!r);

  const related = sector ? projects.filter((x) => x.sector === p.sector && x.slug !== p.slug).slice(0, 3) : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <div className="bg-white pb-10 pt-[calc(4rem+1.25rem)] xl:pt-[calc(var(--header-h)+1.75rem)]">
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

          <header className="mt-4">
            <h1 className="text-[clamp(1.875rem,1.3rem+2vw,2.875rem)] font-extrabold leading-tight text-navy">{p.name}</h1>
            {place && <p className="mt-1 text-lg text-navy md:text-xl">{place}</p>}
            <span aria-hidden className="accent-bar mt-3" />
          </header>

          {/* The picture from the company profile, shown at about its real size, beside the facts the profile gives */}
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-12">
            <figure className="max-w-[26rem]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#e4eef7]">
                <Image src={p.image.src} alt={`${p.name}`} fill sizes="(min-width: 1024px) 26rem, 94vw" priority className="object-cover object-[center_35%]" />
              </div>
            </figure>
            <section aria-labelledby="snapshot-title">
              <h2 id="snapshot-title" className="text-[1.625rem] font-extrabold text-navy md:text-3xl">
                Project Snapshot
              </h2>
              <span aria-hidden className="accent-bar mt-2" />
              <dl className="mt-5 divide-y divide-line rounded-xl border border-line bg-white px-5 py-1">
                {rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-3.5">
                    <dt className="font-bold text-navy">{r.label}:</dt>
                    <dd className="text-navy">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && sector && (
        <section aria-labelledby="related-title" className="bg-[#f2f7fb] py-10 md:py-12">
          <div className="wrap">
            <h2 id="related-title" className="text-[1.625rem] font-extrabold text-navy md:text-3xl">
              More {sector.label} Projects
            </h2>
            <span aria-hidden className="accent-bar mt-2" />
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="relative">
                  <ProjectCard p={{ slug: r.slug, name: r.name, place: placeOf(r) || undefined, client: r.client, image: r.image }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="bg-[#e8f3fb] py-6 md:py-7">
        <div className="wrap flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-5">
          <Button href="/projects" variant="outline" size="lg" className="border-[#c5d8e8] bg-white max-sm:w-full sm:min-w-[16rem]">
            Back to Projects
          </Button>
          <Button href={quoteHref({ project: p.slug })} size="lg" className="max-sm:w-full sm:min-w-[16rem]">
            Request a Quote
          </Button>
        </div>
      </div>
    </>
  );
}
