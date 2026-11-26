import { CategoryNav } from "@/components/insights/CategoryNav";
import { InsightRow } from "@/components/insights/InsightRow";
import { PageBanner } from "@/components/ui/PageBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights } from "@/content/insights";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description: "The UMS blog: who we are and how we work, the services we provide, and practical notes on building services.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageBanner
        title="Blog"
        intro="About UMS, the services we provide, and practical notes on how building services are planned, installed and looked after."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        titleId="insights-title"
      />
      <CategoryNav current="all" />
      <section aria-label="Articles" className="bg-white pb-12 pt-4 md:pb-16">
        <div className="wrap">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((a, i) => (
              <InsightRow key={a.slug} insight={a} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
