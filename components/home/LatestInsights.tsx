import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InsightCard } from "@/components/insights/InsightCard";
import { insights } from "@/content/insights";

export function LatestInsights() {
  const latest = insights.slice(0, 3);
  return (
    <section aria-labelledby="insights-title" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="insights-title">
            <SectionHeading
              index="05"
              label="Insights"
              title="Practical notes from the engineering side"
              description="Short reads on safety, systems and operations."
            />
          </div>
          <Button href="/insights" variant="outline" arrow>
            All insights
          </Button>
        </div>

        <Reveal stagger className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {latest.map((a) => (
            <RevealItem key={a.slug}>
              <InsightCard insight={a} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
