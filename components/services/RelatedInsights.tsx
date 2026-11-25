import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { insightsForService } from "@/lib/insights";
import type { Service } from "@/types";

/** Articles tagged with this service, as a short ruled list. Renders nothing when there are none. */
export function RelatedInsights({ service, index }: { service: Service; index: string }) {
  const list = insightsForService(service.slug);
  if (list.length === 0) return null;
  return (
    <section id="insights" aria-labelledby="related-insights-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4">
          <div id="related-insights-title" className="lg:sticky lg:top-40">
            <SectionHeading accent={service.accent} index={index} label="Insights" title="Related reading" description={`General articles relevant to ${service.shortName}.`} />
          </div>
        </div>
        <ul className="min-w-0 divide-y divide-line border-y border-line lg:col-span-8">
          {list.map((a) => (
            <li key={a.slug}>
              <Link href={`/insights/${a.slug}`} className="group flex items-start justify-between gap-4 py-5">
                <span>
                  <span className="block font-heading text-xl font-bold uppercase text-navy transition-colors group-hover:text-cyan">{a.title}</span>
                  <span className="mt-1 block text-[0.9375rem] text-muted">{a.excerpt}</span>
                </span>
                <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-muted group-hover:text-cyan" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
