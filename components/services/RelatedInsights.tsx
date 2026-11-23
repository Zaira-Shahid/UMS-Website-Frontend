import { InsightCard } from "@/components/insights/InsightCard";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insightsForService } from "@/lib/related";
import type { Service } from "@/types";

/** Articles tagged with this service (most specific first). Hidden if there are none. */
export function RelatedInsights({ service }: { service: Service }) {
  const articles = insightsForService(service.slug, 3);
  if (articles.length === 0) return null;
  return (
    <section
      id="insights"
      aria-labelledby="insights-title"
      className="scroll-mt-32 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="insights-title">
            <SectionHeading
              index="05"
              label="Insights"
              title="Related insights"
              description={`Short reads on ${service.shortName} and the work around it.`}
            />
          </div>
          <Button href="/insights" variant="outline" arrow>
            All insights
          </Button>
        </div>
        <Reveal stagger as="div" className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {articles.map((a) => (
            <RevealItem key={a.slug}>
              <InsightCard insight={a} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
