import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { deliverySteps } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Light section. Six stages as large numerals and plain text on a single hairline spine, staggered left and right
 * on wide screens. No timelines or durations: it describes the order of work, not how long it takes.
 */
export function DeliveryProcess() {
  return (
    <section aria-labelledby="delivery-title" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="delivery-title">
          <SectionHeading
            index="04"
            label="How we deliver"
            title="From tender review to handover"
            description="The six stages of an MEP package, in the order the work happens."
          />
        </div>

        <ol className="relative mt-14 md:mt-20">
          {/* The spine: one hairline behind the numerals */}
          <span aria-hidden className="absolute bottom-3 left-[1.35rem] top-3 w-px bg-line lg:left-1/2" />
          {deliverySteps.map((step, i) => {
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative pb-12 last:pb-0 lg:pb-16">
                <Reveal
                  className={cn(
                    "grid grid-cols-[2.75rem_1fr] gap-x-5 lg:grid-cols-2 lg:gap-x-0",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-11 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold tabular-nums text-white lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={cn("pt-1.5 lg:max-w-md lg:pt-0", right ? "lg:col-start-2 lg:pl-16" : "lg:col-start-1 lg:justify-self-end lg:pr-16 lg:text-right")}>
                    <h3 className="font-heading text-[clamp(1.5rem,1.1rem+1.2vw,2rem)] font-bold uppercase leading-tight text-navy">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-muted">{step.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-14 text-center">
          <Link
            href="/services/integrated-mep"
            className="group inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy hover:text-cyan"
          >
            How integrated MEP works
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
