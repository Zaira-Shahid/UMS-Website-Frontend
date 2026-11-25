import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insightCategories, insights } from "@/content/insights";

/** Light section: the first three Insight articles as a plain list of titles. */
export function LatestInsights() {
  return (
    <section aria-labelledby="insights-title" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4">
          <div id="insights-title">
            <SectionHeading
              index="07"
              label="Insights"
              title="Notes on building services"
              description="General technical articles on planning, installing and looking after building systems."
            />
          </div>
          <Button href="/insights" variant="primary" arrow className="mt-8">
            All insights
          </Button>
        </div>
        <ol className="min-w-0 divide-y divide-navy/15 border-y border-navy/15 lg:col-span-8">
          {insights.slice(0, 3).map((a) => (
            <li key={a.slug}>
              <Link href={`/insights/${a.slug}`} className="group block py-6">
                <span className="mono-label block text-muted">
                  {insightCategories.find((c) => c.slug === a.category)?.name} · {a.readingMinutes} min read
                </span>
                <span className="mt-2 flex items-start justify-between gap-4">
                  <span className="font-heading text-[clamp(1.375rem,1.1rem+1vw,1.875rem)] font-bold uppercase leading-tight text-navy transition-colors group-hover:text-cyan">
                    {a.title}
                  </span>
                  <ArrowRight aria-hidden className="mt-1.5 size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-cyan" />
                </span>
                <span className="mt-2 block max-w-2xl text-muted">{a.excerpt}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
