import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightRow } from "@/components/insights/InsightRow";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { insightCategories } from "@/content/insights";
import { categoryBySlug, insightsInCategory } from "@/lib/insights";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return insightCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const c = categoryBySlug((await params).category);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} insights`, description: c.summary, path: `/insights/category/${c.slug}` });
}

export default async function InsightCategoryPage({ params }: { params: Promise<Params> }) {
  const c = categoryBySlug((await params).category);
  if (!c) notFound();
  const list = insightsInCategory(c.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: c.name, path: `/insights/category/${c.slug}` },
        ])}
      />
      <PageHero
        sketch="hvac"
        eyebrow="Insights"
        title={c.name}
        intro={c.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: c.name }]}
        titleId="category-title"
      />

      <section aria-label="Categories" className="border-b border-line bg-white">
        <nav aria-label="Insight categories" className="mx-auto max-w-7xl px-5 sm:px-8">
          <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <li className="shrink-0">
              <Link href="/insights" className="block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-navy">
                All
              </Link>
            </li>
            {insightCategories.map((x) => {
              const on = x.slug === c.slug;
              return (
                <li key={x.slug} className="shrink-0">
                  {on ? (
                    <span aria-current="page" className="relative block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy">
                      {x.name}
                      <span aria-hidden className="absolute inset-x-4 bottom-0 h-0.5 bg-cyan" />
                    </span>
                  ) : (
                    <Link href={`/insights/category/${x.slug}`} className="block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-navy">
                      {x.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </section>

      <section aria-label="Articles" className="bg-white pb-16 pt-6 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ol className="divide-y divide-navy/15 border-y border-navy/15">
            {list.map((a, i) => (
              <InsightRow key={a.slug} insight={a} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
