import { ClipboardCheck, FileText, Gauge, HardHat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qualityPrinciples } from "@/content/home";

const icons = { qa: ClipboardCheck, hse: HardHat, testing: Gauge, records: FileText } as const;

/**
 * Light section. The approach to quality and safety in general terms: four plain principles beside a statement.
 * No certifications, figures or incident claims.
 */
export function QualitySafety() {
  return (
    <section aria-labelledby="quality-title" className="bg-offwhite py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div id="quality-title">
            <SectionHeading
              index="06"
              label="Quality & safety"
              title="Checked as it is built, safe while it is built"
              description="Building services are hidden behind ceilings and walls once the work is finished, so quality and safety are managed while they are installed."
            />
          </div>
          <Button href="/quality-safety-delivery" variant="primary" arrow className="mt-8">
            Quality, safety &amp; delivery
          </Button>
        </div>

        <Reveal stagger as="ul" className="divide-y divide-line border-y border-line lg:col-span-7">
          {qualityPrinciples.map((p) => {
            const Icon = icons[p.id];
            return (
              <RevealItem key={p.id} as="li" className="flex gap-5 py-6 sm:gap-6 sm:py-7">
                <Icon aria-hidden className="mt-1 size-7 shrink-0 text-cyan" strokeWidth={1.6} />
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase text-navy">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
