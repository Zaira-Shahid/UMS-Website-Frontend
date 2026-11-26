import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/ui/lucide";
import { InsightRow } from "@/components/insights/InsightRow";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { SideToc } from "@/components/ui/SideToc";
import { insightAuthor, insightCategories, insights } from "@/content/insights";
import { serviceBySlug } from "@/content/services";
import { ServiceIcon, serviceColor } from "@/components/ui/ServiceIcon";
import { headingId, insightBySlug, relatedInsights } from "@/lib/insights";
import { absoluteUrl, jsonLd, organizationRef, ogImage, ogImages } from "@/lib/seo";
import { site } from "@/content/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const a = insightBySlug((await params).slug);
  if (!a) return {};
  const path = `/blog/${a.slug}`;
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: path },
    openGraph: { images: ogImages, type: "article", siteName: `${site.name} — ${site.fullName}`, title: `${a.title} | ${site.name}`, description: a.excerpt, url: path },
    twitter: { card: "summary_large_image", images: [ogImage.url], title: `${a.title} | ${site.name}`, description: a.excerpt },
  };
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const a = insightBySlug((await params).slug);
  if (!a) notFound();

  const category = insightCategories.find((c) => c.slug === a.category);
  const url = absoluteUrl(`/blog/${a.slug}`);
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
        { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
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
      <PageBanner
        title={a.title}
        intro={a.excerpt}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: a.title }]}
        titleId="article-title"
      >
        <p className="text-sm font-semibold text-white/90">
          {category?.name ? `${category.name} · ` : ""}
          {insightAuthor} · {a.readingMinutes} min read
        </p>
      </PageBanner>

      <div className="bg-white py-12 md:py-16">
        <div className="wrap grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-3">
            <SideToc items={toc} title="In this article" />
          </div>
          <article id="article-body" className="min-w-0 lg:col-span-9">
            <div className="max-w-3xl">
              <p className="text-[1.25rem] leading-relaxed text-navy">{a.intro}</p>
              {a.sections.map((s) => (
                <section key={s.heading} id={headingId(s.heading)} aria-labelledby={`${headingId(s.heading)}-h`} className="scroll-mt-32">
                  <h2 id={`${headingId(s.heading)}-h`} className="mt-10 text-[1.625rem] font-extrabold text-navy sm:text-[2rem]">
                    {s.heading}
                  </h2>
                  <span aria-hidden className="mt-2 block h-1 w-14 rounded bg-blue" />
                  {s.body.map((p, i) => (
                    <p key={i} className="mt-4 text-[1.0625rem] leading-relaxed text-navy">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>

      <section aria-labelledby="related-services" className="bg-[#f2f7fb] py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="related-services" lead="Related" accent="Services" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((s) => {
              const color = serviceColor(s.slug);
              return (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="group flex h-full items-center gap-4 rounded-card border border-blue/50 bg-white p-4 shadow-card transition-colors hover:border-blue">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl" style={{ background: `color-mix(in srgb, ${color} 14%, white)`, color }}>
                      <ServiceIcon slug={s.slug} className="size-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading font-bold text-navy group-hover:text-blue-700">{s.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{s.tagline}</span>
                    </span>
                    <ArrowRight aria-hidden className="ml-auto size-5 shrink-0 text-blue-700" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="keep-reading" className="bg-white py-12 md:py-16">
          <div className="wrap">
            <CenterTitle id="keep-reading" lead="Keep" accent="Reading" />
            <ol className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
