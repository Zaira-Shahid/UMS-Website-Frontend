import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/content/industries";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/** "Typical applications" — big ruled rows that link to the Industries anchors. */
export function ApplicationsList({ service }: { service: Service }) {
  return (
    <section
      id="applications"
      aria-labelledby="applications-title"
      className="scroll-mt-32 bg-offwhite py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div id="applications-title" className="lg:sticky lg:top-40">
            <SectionHeading
              accent={service.accent}
              index="03"
              label="Applications"
              title="Typical applications"
              description={`Where ${service.shortName} matters most. Each sector links to its own section on the Industries page.`}
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          <Reveal stagger as="ul" className="border-t border-navy/20">
            {service.applications.map((app) => {
              const ind = industries.find((i) => i.slug === app.industry);
              if (!ind) return null;
              return (
                <RevealItem as="li" key={app.industry} className="border-b border-navy/20">
                    <Link
                      href={`/industries#${ind.slug}`}
                      className="group grid gap-2 py-6 sm:grid-cols-[minmax(0,16rem)_1fr_auto] sm:items-center sm:gap-8"
                    >
                      <span
                        className={cn(
                          "font-heading text-[clamp(1.5rem,1.2rem+0.9vw,2rem)] font-bold uppercase leading-tight text-navy transition-all duration-300 group-hover:translate-x-1.5",
                          service.accent === "fire" ? "group-hover:text-fire" : "group-hover:text-blue",
                        )}
                      >
                        {ind.name}
                      </span>
                      <span className="text-[0.9375rem] text-muted">{app.note}</span>
                      <ArrowUpRight
                        aria-hidden
                        className={cn(
                          "hidden size-5 text-navy/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block",
                          service.accent === "fire" ? "group-hover:text-fire" : "group-hover:text-blue",
                        )}
                      />
                    </Link>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
