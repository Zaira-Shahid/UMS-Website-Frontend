import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { disciplineColor } from "@/lib/discipline";
import type { Service } from "@/types";

/** "Scope": the stages of the work as a numbered sequence along one rule. */
export function ScopeStages({ service }: { service: Service }) {
  const color = disciplineColor[service.slug];
  return (
    <section id="scope" aria-labelledby="scope-title" className="scroll-mt-32 bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-4">
          <div id="scope-title" className="lg:sticky lg:top-40">
            <SectionHeading
              accent={service.accent}
              index="04"
              label="Scope"
              title="The stages of the work"
              description={`The scope that can be taken on for ${service.shortName}, from supply through to handover.`}
            />
          </div>
        </div>
        <Reveal stagger as="ol" className="relative min-w-0 lg:col-span-8">
          <span aria-hidden className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-line" />
          {service.scope.map((item, i) => (
            <RevealItem key={item.label} as="li" className="relative flex gap-5 pb-8 last:pb-0">
              <span
                className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold tabular-nums text-white"
                style={{ background: color === "var(--electric)" ? "#9a6c00" : color }}
              >
                {i + 1}
              </span>
              <div className="pt-1">
                <h3 className="font-heading text-lg font-bold uppercase tracking-[0.04em] text-navy">{item.label}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">{item.detail}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
