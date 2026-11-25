import { CategoryNav } from "@/components/insights/CategoryNav";
import { InsightRow } from "@/components/insights/InsightRow";
import { PageBanner } from "@/components/ui/PageBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { insights } from "@/content/insights";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical notes on building services: safety and compliance, MEP systems, and keeping systems performing after handover.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <PageBanner
        title="Insights"
        intro="General technical articles on how building services are planned, installed, checked and looked after."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
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
