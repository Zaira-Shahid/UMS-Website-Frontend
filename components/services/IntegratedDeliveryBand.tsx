import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/home/ServiceIcons";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { PipeLine } from "@/components/ui/PipeLine";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

const points = [
  {
    title: "One set of coordinated drawings",
    text: "Every discipline's routes are overlaid with the structure and with each other, so there is a single approved set to build from.",
  },
  {
    title: "One programme",
    text: "Procurement, installation, testing and commissioning are planned together instead of being sequenced by several separate contractors.",
  },
  {
    title: "Interfaces managed in one place",
    text: "Fire alarm signals stop air-handling units, fire pumps report to the alarm panel, and pool halls depend on ventilation — each hand-off has an owner.",
  },
  {
    title: "One handover",
    text: "As-built drawings, manuals and test records arrive as a single, indexed pack the operating team can use.",
  },
];

/** Explains how the five specialist disciplines combine under Integrated MEP. */
export function IntegratedDeliveryBand() {
  const disciplines = services.filter((s) => s.slug !== "integrated-mep");
  return (
    <section
      aria-labelledby="integrated-title"
      className="relative isolate overflow-hidden bg-navy py-20 text-white md:py-28"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div id="integrated-title">
          <SectionHeading
            tone="light"
            label="Integrated delivery"
            title="Five disciplines, combined into one package"
            description="Each service can stand alone. Under Integrated MEP they are planned, procured and installed together, so the building gets one coordinated set of services."
          />
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-12">
          {/* Diagram: disciplines feeding one integrated package */}
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {disciplines.map((s) => {
                const fire = s.accent === "fire";
                return (
                  <li key={s.slug} className="flex items-center gap-4">
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex w-48 shrink-0 items-center gap-3 border border-white/15 bg-navy-900/50 px-3 py-2.5 transition-colors hover:border-cyan-300 sm:w-60"
                    >
                      <ServiceIcon
                        slug={s.slug}
                        className={cn("size-7 shrink-0", fire ? "text-[#ff8a82]" : "text-cyan-300")}
                      />
                      <span className="font-heading text-sm font-semibold uppercase tracking-[0.06em] sm:text-base">
                        {s.shortName}
                      </span>
                    </Link>
                    <div className="hidden flex-1 sm:block">
                      <PipeLine tone="light" nodes="ends" height={10} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="border-2 border-cyan-300 bg-navy-900/60 p-6 sm:p-8">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Combined
              </p>
              <h3 className="mt-3 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] uppercase text-white">
                Integrated MEP Solutions
              </h3>
              <p className="mt-3 text-white/75">
                Tender review, drawings and coordination, procurement, installation, commissioning
                and handover — across every discipline.
              </p>
              <Link
                href="/services/integrated-mep"
                className="group mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-cyan-300 hover:text-white"
              >
                Explore Integrated MEP
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <Reveal stagger as="ul" className="mt-16 grid gap-x-8 gap-y-8 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <RevealItem as="li" key={p.title}>
              <span className="font-heading text-4xl font-extrabold leading-none text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl font-semibold uppercase leading-tight tracking-[0.03em] text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] text-white/70">{p.text}</p>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-12">
          <Button href="/services/integrated-mep" variant="accent" arrow>
            How integrated delivery works
          </Button>
        </div>
      </div>
    </section>
  );
}
