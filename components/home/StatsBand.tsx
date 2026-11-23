import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Counter } from "@/components/ui/Counter";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/**
 * Credentials band. Every figure comes from content/site.ts and is still
 * flagged for client confirmation (TODO: client to confirm). Missing values
 * are shown as "To be confirmed", never invented.
 */
export function StatsBand() {
  return (
    <section
      aria-label="Company at a glance"
      className="relative isolate overflow-hidden bg-navy py-16 text-white md:py-20"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {site.stats.map((stat) => (
            <RevealItem key={stat.label}>
              <CornerBrackets tone="light" className="h-full border border-white/10 bg-navy-900/40 p-5 sm:p-7">
                <p className="font-heading text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-extrabold leading-none text-white">
                  {stat.value === undefined ? (
                    <span aria-label="To be confirmed" className="text-white/40">
                      —
                    </span>
                  ) : (
                    <Counter value={stat.value} suffix={stat.suffix} />
                  )}
                </p>
                <p className="mt-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-cyan-300">
                  {stat.label}
                </p>
                {/* TODO: client to confirm */}
                <Badge tone="pending" className="mt-4">
                  {stat.value === undefined ? "To be confirmed" : "Client to confirm"}
                </Badge>
              </CornerBrackets>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
