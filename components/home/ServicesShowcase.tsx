import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import { DisciplineSketch } from "./DisciplineSketch";

/**
 * Light section. A sticky heading on the left, the six disciplines as an editorial list on the right: each has
 * its own colour and a small line drawing in the style of the hero. Rows are links, not cards.
 */
export function ServicesShowcase() {
  return (
    <section aria-labelledby="services-title" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div id="services-title">
              <SectionHeading
                index="01"
                label="Services"
                title="Six disciplines, one coordinated delivery"
                description="Each discipline can be delivered on its own or planned with the others as a single set of building systems."
              />
            </div>
            <Button href="/services" variant="primary" arrow className="mt-8">
              All services
            </Button>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {services.map((s, i) => {
            const color = disciplineColor[s.slug];
            return (
              <li key={s.slug} className="border-t border-line first:border-t-0 lg:first:border-t">
                <Reveal>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative grid items-center gap-x-8 gap-y-4 py-8 pl-5 sm:grid-cols-[1fr_12rem] sm:py-10 sm:pl-7"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-6 left-0 w-[3px] origin-top scale-y-50 transition-transform duration-500 group-hover:scale-y-100 group-focus-visible:scale-y-100 sm:inset-y-8"
                      style={{ background: color }}
                    />
                    <span>
                      <span className="mono-label flex items-center gap-3 text-muted">
                        <span className="tabular-nums text-navy">{String(i + 1).padStart(2, "0")}</span>
                        {s.shortName}
                      </span>
                      <span className="mt-3 flex items-start justify-between gap-4">
                        <span className="font-heading text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-bold uppercase leading-tight text-navy">
                          {s.name}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="mt-1 size-6 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
                        />
                      </span>
                      <span className="mt-3 block max-w-xl text-muted">{s.tagline}</span>
                      <span className="mt-4 block text-sm text-ink">
                        {s.systems
                          .slice(0, 4)
                          .map((x) => x.name)
                          .join(" · ")}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="block w-40 transition-transform duration-500 group-hover:-translate-y-1 sm:w-full"
                      style={{ color }}
                    >
                      <DisciplineSketch slug={s.slug} className="w-full" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
