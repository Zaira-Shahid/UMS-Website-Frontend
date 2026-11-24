import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Counter } from "@/components/ui/Counter";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Company-at-a-glance band. Figures come from content/dummy.ts via content/site.ts. */
export function StatsBand() {
  return (
    <section
      aria-label="Company at a glance"
      className="relative isolate overflow-hidden bg-navy py-16 text-white md:py-20"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {site.stats.map((stat) => (
            <RevealItem key={stat.label}>
              <CornerBrackets tone="light" className="h-full border border-white/10 bg-navy-900/40 p-5 sm:p-7">
                <p className="font-heading text-[clamp(2.25rem,1.6rem+3vw,4rem)] font-extrabold leading-none text-white">
                  <Counter value={stat.value} suffix={stat.suffix ? ` ${stat.suffix}`.replace(/^ ([+%])/, "$1") : ""} />
                </p>
                <p className="mt-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">
                  {stat.label}
                </p>
                {stat.note && <p className="mono-label mt-2 text-white/60">{stat.note}</p>}
              </CornerBrackets>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
