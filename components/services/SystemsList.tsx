import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { disciplineColor } from "@/lib/discipline";
import type { Service } from "@/types";

/** "Systems we deliver": a sticky heading and a ruled list, not a grid of boxes. */
export function SystemsList({ service }: { service: Service }) {
  const color = disciplineColor[service.slug];
  return (
    <section id="systems" aria-labelledby="systems-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4">
          <div id="systems-title" className="lg:sticky lg:top-40">
            <SectionHeading
              accent={service.accent}
              index="01"
              label="Systems"
              title="Systems we deliver"
              description={`The ${service.systems.length} building systems covered under ${service.shortName}.`}
            />
          </div>
        </div>
        <Reveal stagger as="ol" className="min-w-0 divide-y divide-line border-y border-line lg:col-span-8">
          {service.systems.map((s, i) => (
            <RevealItem key={s.name} as="li" className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 sm:grid-cols-[3.5rem_16rem_1fr] sm:gap-x-6 sm:py-7">
              <span className="mono-label pt-1.5 tabular-nums" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-[1.375rem] font-bold uppercase leading-tight text-navy">{s.name}</h3>
              <p className="col-start-2 mt-2 text-[0.9375rem] text-muted sm:col-start-3 sm:mt-0.5">{s.description}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
