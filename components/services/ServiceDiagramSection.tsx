import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { disciplineColor } from "@/lib/discipline";
import type { Service } from "@/types";
import { DIAGRAM_COPY, ServiceDiagramSvg } from "./ServiceDiagram";

/**
 * Dark section with the discipline's technical diagram on the left and the numbered explanation beside it.
 * The numbers on the drawing match the numbers in the list.
 */
export function ServiceDiagramSection({ service }: { service: Service }) {
  const copy = DIAGRAM_COPY[service.slug];
  const color = disciplineColor[service.slug];
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-32 bg-navy-900 py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="how-title">
          <SectionHeading tone="light" accent={service.accent} index="02" label="How it works" title={copy.title} description={copy.intro} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="min-w-0 lg:col-span-8 lg:self-center">
            <ServiceDiagramSvg slug={service.slug} className="service-diagram block h-auto w-full" />
            <p className="mono-label mt-3 text-white/50">{copy.caption}. Not to scale.</p>
          </Reveal>
          <ol className="min-w-0 divide-y divide-white/15 border-y border-white/15 lg:col-span-4 lg:self-center">
            {copy.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 py-4">
                <span
                  aria-hidden
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-navy-950"
                  style={{ background: color }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-bold uppercase leading-tight text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
