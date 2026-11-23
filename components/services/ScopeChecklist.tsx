import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { accents } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/**
 * "UMS scope" checklist. Only items the spec supports are shown as confirmed;
 * everything else is a dashed placeholder marked "to be confirmed"
 * (TODO: client to confirm — see content/services.ts).
 */
export function ScopeChecklist({ service }: { service: Service }) {
  const a = accents[service.accent];
  const pending = service.scope.filter((s) => !s.confirmed).length;
  return (
    <section
      id="scope"
      aria-labelledby="scope-title"
      className="scroll-mt-32 bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div id="scope-title">
            <SectionHeading
              accent={service.accent}
              index="03"
              label="UMS scope"
              title="What UMS delivers"
              description={`The scope UMS can take on for ${service.shortName}, from supply through to commissioning.`}
            />
          </div>
          {pending > 0 && (
            // TODO: client to confirm
            <Badge tone="pending">
              {pending} {pending === 1 ? "item" : "items"} to be confirmed
            </Badge>
          )}
        </div>

        <Reveal stagger as="ul" className="mt-12 grid gap-x-12 border-t-2 border-navy sm:grid-cols-2">
            {service.scope.map((item) => (
              <RevealItem as="li" key={item.label} className="flex gap-4 border-b border-line py-5">
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full",
                      item.confirmed
                        ? cn(a.bg, "text-white")
                        : "border-2 border-dashed border-[#b9770e] text-[#b9770e]",
                    )}
                  >
                    {item.confirmed ? <Check className="size-4" strokeWidth={3} /> : <span className="text-xs font-bold">?</span>}
                  </span>
                  <div>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-heading text-lg font-semibold uppercase tracking-[0.04em] text-navy">
                      {item.label}
                      {!item.confirmed && <Badge tone="pending">To be confirmed</Badge>}
                    </p>
                    <p className="mt-1 text-[0.9375rem] text-muted">{item.detail}</p>
                  </div>
              </RevealItem>
            ))}
        </Reveal>
      </div>
    </section>
  );
}
