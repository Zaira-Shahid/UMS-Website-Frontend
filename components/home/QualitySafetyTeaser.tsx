import { ClipboardCheck, HardHat } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { qualityTopics } from "@/content/home";
import { photo } from "@/content/images";

// Stock photo, replace with approved UMS photography.
const image = photo("breakerPanel", "center 45%");

/**
 * Split teaser. The two columns list what the Quality, Safety & Delivery page covers.
 */
export function QualitySafetyTeaser() {
  const blocks = [
    { key: "qa", icon: ClipboardCheck, ...qualityTopics.qa },
    { key: "hse", icon: HardHat, ...qualityTopics.hse },
  ] as const;

  return (
    <section aria-labelledby="quality-title" className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy-900 lg:aspect-[3/4]">
              <SiteImage
                asset={image}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
              <span aria-hidden className="absolute inset-0 bg-navy-900/25" />
            </div>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-7">
          <div id="quality-title">
            <SectionHeading
              label="Quality & safety"
              title="Built right, built safely, handed over complete"
              description="Inspection, testing and safe working run through every stage — not just the last one."
            />
          </div>

          <Reveal stagger className="mt-10 grid gap-6 sm:grid-cols-2">
            {blocks.map((b) => (
              <RevealItem key={b.key}>
                <div className="h-full border-t-2 border-navy pt-5">
                  <b.icon className="size-7 text-cyan" aria-hidden />
                  <h3 className="mt-4">{b.title}</h3>
                  <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-muted">
                    {b.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <div className="mt-8">
            <Button href="/quality-safety-delivery" variant="primary" arrow>
              Quality, safety &amp; delivery
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
