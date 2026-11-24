import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { accents } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { SystemIcon } from "./SystemIcon";

/** "Systems we deliver" — a ruled spec-sheet grid, deliberately not a card grid. */
export function SystemsGrid({ service }: { service: Service }) {
  const a = accents[service.accent];
  return (
    <section
      id="systems"
      aria-labelledby="systems-title"
      className="scroll-mt-32 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div id="systems-title">
          <SectionHeading
            accent={service.accent}
            index="01"
            label="Systems"
            title="Systems we deliver"
            description={`The ${service.systems.length} building systems covered under ${service.shortName}.`}
          />
        </div>

        <Reveal
          stagger
          as="div"
          className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {service.systems.map((s, i) => (
            <RevealItem key={s.name}>
              <article className="group relative h-full border-b border-r border-line p-6 transition-colors duration-300 hover:bg-offwhite sm:p-8">
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                    a.bg,
                  )}
                />
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center border transition-colors duration-300",
                      service.accent === "fire"
                        ? "border-fire/40 text-fire group-hover:border-fire group-hover:bg-fire group-hover:text-white"
                        : "border-cyan/40 text-cyan group-hover:border-cyan group-hover:bg-cyan group-hover:text-white",
                    )}
                  >
                    <SystemIcon name={s.icon} className="size-6" />
                  </span>
                  <span className="font-heading text-sm font-semibold tabular-nums tracking-[0.14em] text-muted/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.375rem] font-semibold uppercase leading-tight tracking-[0.03em]">
                  {s.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.description}</p>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
