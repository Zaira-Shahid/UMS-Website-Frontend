import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { InsightRow } from "@/components/insights/InsightRow";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { PageHero } from "@/components/layout/PageHero";
import { SideToc } from "@/components/ui/SideToc";
import { insightAuthor, insightCategories, insights } from "@/content/insights";
import { serviceBySlug } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { headingId, insightBySlug, relatedInsights } from "@/lib/insights";
import { absoluteUrl, jsonLd, organizationRef } from "@/lib/seo";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const a = insightBySlug((await params).slug);
  if (!a) return {};
  const path = `/insights/${a.slug}`;
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: path },
    openGraph: { type: "article", siteName: `${site.name} — ${site.fullName}`, title: `${a.title} | ${site.name}`, description: a.excerpt, url: path },
    twitter: { card: "summary_large_image", title: `${a.title} | ${site.name}`, description: a.excerpt },
  };
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const a = insightBySlug((await params).slug);
  if (!a) notFound();

  const category = insightCategories.find((c) => c.slug === a.category);
  const url = absoluteUrl(`/insights/${a.slug}`);
  const toc = a.sections.map((s) => ({ id: headingId(s.heading), label: s.heading }));
  const related = relatedInsights(a);
  const relatedServices = a.services.map((s) => serviceBySlug(s)).filter((s) => !!s);

  // No datePublished or dateModified: no real publication date exists, so none is claimed.
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.excerpt,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: insightAuthor },
      publisher: organizationRef,
      articleSection: category?.name,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Insights", item: absoluteUrl("/insights") },
        { "@type": "ListItem", position: 3, name: a.title, item: url },
      ],
    },
  ];

  return (
    <>
      {structuredData.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
      ))}
      <ReadingProgress targetId="article-body" />
      <PageHero
        sketch={a.services[0]}
        eyebrow={category?.name ?? "Insights"}
        title={a.title}
        intro={a.excerpt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.title }]}
        titleId="article-title"
      >
        <p className="mono-label mt-6 text-muted">
          {insightAuthor} · {a.readingMinutes} min read
        </p>
      </PageHero>

      <div className="bg-white py-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-3">
            <SideToc items={toc} title="In this article" />
          </div>
          <article id="article-body" className="min-w-0 lg:col-span-9">
            <div className="max-w-3xl">
              <p className="text-[1.25rem] leading-relaxed text-ink">{a.intro}</p>
              {a.sections.map((s) => (
                <section key={s.heading} id={headingId(s.heading)} aria-labelledby={`${headingId(s.heading)}-h`} className="scroll-mt-32">
                  <h2 id={`${headingId(s.heading)}-h`} className="mt-12 text-[1.75rem] text-navy sm:text-[2rem]">
                    {s.heading}
                  </h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-4 text-[1.0625rem] leading-relaxed text-ink">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>

      <section aria-labelledby="related-services" className="bg-offwhite py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="related-services" className="text-[1.75rem] text-navy">
            Related services
          </h2>
          <ul className="mt-6 divide-y divide-navy/15 border-y border-navy/15">
            {relatedServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group flex items-center gap-4 py-4">
                  <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: disciplineColor[s.slug] }} />
                  <span className="font-heading text-lg font-bold uppercase text-navy transition-colors group-hover:text-blue">{s.name}</span>
                  <span className="hidden text-muted sm:inline">{s.tagline}</span>
                  <ArrowUpRight aria-hidden className="ml-auto size-5 text-muted group-hover:text-blue" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="keep-reading" className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 id="keep-reading" className="text-[1.75rem] text-navy">
              Keep reading
            </h2>
            <ol className="mt-6 divide-y divide-navy/15 border-y border-navy/15">
              {related.map((r) => (
                <InsightRow key={r.slug} insight={r} />
              ))}
            </ol>
          </div>
        </section>
      )}
    </>
  );
}
