import { Check } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { accents } from "@/lib/accent";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/** "UMS scope" checklist for a service. */
export function ScopeChecklist({ service }: { service: Service }) {
  const a = accents[service.accent];
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
        </div>

        <Reveal stagger as="ul" className="mt-12 grid gap-x-12 border-t-2 border-navy sm:grid-cols-2">
            {service.scope.map((item) => (
              <RevealItem as="li" key={item.label} className="flex gap-4 border-b border-line py-5">
                  <span
                    aria-hidden
                    className={cn("mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full", a.bg, "text-white")}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-semibold uppercase tracking-[0.04em] text-navy">
                      {item.label}
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
