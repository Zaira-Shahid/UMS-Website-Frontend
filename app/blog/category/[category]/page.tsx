import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryNav } from "@/components/insights/CategoryNav";
import { InsightRow } from "@/components/insights/InsightRow";
import { PageBanner } from "@/components/ui/PageBanner";
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
  return pageMetadata({ title: `${c.name} | Blog`, description: c.summary, path: `/blog/category/${c.slug}` });
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
          { name: "Blog", path: "/blog" },
          { name: c.name, path: `/blog/category/${c.slug}` },
        ])}
      />
      <PageBanner
        title={c.name}
        intro={c.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: c.name }]}
        titleId="category-title"
      />
      <CategoryNav current={c.slug} />
      <section aria-label="Articles" className="bg-white pb-12 pt-4 md:pb-16">
        <div className="wrap">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a, i) => (
              <InsightRow key={a.slug} insight={a} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
