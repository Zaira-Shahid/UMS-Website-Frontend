import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { deliverySteps } from "@/content/home";

/**
 * H3 How We Deliver (mockup 03). Five steps: the illustration, a circle on a dashed connector, the title and one line.
 * Desktop: five columns with a horizontal connector. Mobile: stacked, with a vertical connector down the left.
 * Static: no animation.
 */
export function HowWeDeliver() {
  return (
    <section aria-labelledby="deliver-title" className="bg-[#f2f7fb] py-10 lg:py-14">
      <div className="wrap">
        <SectionTitle id="deliver-title" lead="How We" accent="Deliver" />

        <ol className="relative mt-8 grid gap-y-8 lg:-mt-2 lg:grid-cols-5 lg:gap-x-4">
          {/* Dashed connector: horizontal on desktop (through the circles), vertical on mobile */}
          <span
            aria-hidden
            className="absolute bottom-3 left-[0.6875rem] top-3 border-l-2 border-dashed border-blue lg:bottom-auto lg:left-[10%] lg:right-[10%] lg:top-[calc(13rem+0.6875rem)] lg:border-l-0 lg:border-t-2"
          />
          {deliverySteps.map((step) => (
            <li key={step.id} className="relative grid grid-cols-[1.5rem_1fr] items-start gap-x-4 lg:flex lg:flex-col lg:items-stretch lg:text-center">
              {/* Circle (mobile: on the vertical line, beside the content) */}
              <span
                aria-hidden
                className="relative z-10 mt-1 block size-6 rounded-full border-2 border-blue bg-[#f2f7fb] lg:order-2 lg:mx-auto lg:mt-0 lg:size-[1.375rem]"
              />
              <div className="lg:contents">
                <div className="flex items-end justify-center lg:order-1 lg:h-[13rem]">
                  <Image
                    src={step.image}
                    alt=""
                    width={step.width}
                    height={step.height}
                    sizes="(min-width: 1024px) 20vw, 60vw"
                    className="h-auto max-h-[11rem] w-auto max-w-full object-contain lg:max-h-[13rem]"
                  />
                </div>
                <h3 className="mt-3 text-[1.5rem] font-bold text-navy lg:order-3 lg:mt-5">{step.title}</h3>
                <p className="mx-auto mt-1 max-w-[16rem] lg:order-4 text-base leading-snug text-muted lg:max-w-[15rem]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
