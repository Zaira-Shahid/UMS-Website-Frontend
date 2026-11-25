import Link from "next/link";
import { InsightRow } from "@/components/insights/InsightRow";
import { PageHero } from "@/components/layout/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { insightCategories, insights } from "@/content/insights";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { insightsInCategory } from "@/lib/insights";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical notes on building services: safety and compliance, MEP systems, and keeping systems performing after handover.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])} />
      <PageHero
        sketch="hvac"
        eyebrow="Insights"
        title="Notes on building services"
        intro="General technical articles on how building services are planned, installed, checked and looked after."
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        titleId="insights-title"
      />

      <section aria-label="Categories" className="border-b border-line bg-white">
        <nav aria-label="Insight categories" className="mx-auto max-w-7xl px-5 sm:px-8">
          <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <li className="shrink-0">
              <span aria-current="page" className="relative block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy">
                All
                <span aria-hidden className="absolute inset-x-4 bottom-0 h-0.5 bg-blue" />
              </span>
            </li>
            {insightCategories.map((c) => (
              <li key={c.slug} className="shrink-0">
                <Link
                  href={`/insights/category/${c.slug}`}
                  className="block whitespace-nowrap px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-navy"
                >
                  {c.name} ({insightsInCategory(c.slug).length})
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section aria-label="Articles" className="bg-white pb-16 pt-6 md:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ol className="divide-y divide-navy/15 border-y border-navy/15">
            {insights.map((a, i) => (
              <InsightRow key={a.slug} insight={a} index={i} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
