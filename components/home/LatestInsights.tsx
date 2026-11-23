import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { insightCategories, insights } from "@/content/insights";

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
          {latest.map((a) => {
            const category = insightCategories.find((c) => c.slug === a.category);
            return (
              <RevealItem key={a.slug}>
                <article className="group h-full">
                  <Link href={`/insights/${a.slug}`} className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                      {/* TODO: replace with approved UMS photography */}
                      <SiteImage
                        asset={a.image}
                        fill
                        sizes="(min-width:768px) 33vw, 100vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5 flex items-center gap-3 text-sm text-muted">
                      {category && <Badge tone="cyan">{category.name}</Badge>}
                      <span>{a.readingMinutes} min read</span>
                    </div>
                    <h3 className="mt-3 text-[1.5rem] transition-colors group-hover:text-cyan">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-muted">{a.excerpt}</p>
                    <span className="mt-auto flex items-center gap-1.5 pt-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy">
                      Read article
                      <ArrowRight
                        aria-hidden
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </article>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
