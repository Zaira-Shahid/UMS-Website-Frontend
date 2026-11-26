import Image from "@/components/ui/StaticImage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { deliverySteps } from "@/content/home";

/**
 * H3 How We Deliver (mockup 03). Five steps: the illustration, the title and one line.
 * Desktop: five columns. Tablet: two columns. Mobile: one column. Static: no animation.
 */
export function HowWeDeliver() {
  return (
    <section aria-labelledby="deliver-title" className="bg-[#f2f7fb] py-10 lg:py-14">
      <div className="wrap">
        <SectionTitle id="deliver-title" lead="How We" accent="Deliver" />

        <ol className="mt-8 grid gap-y-10 sm:grid-cols-2 lg:-mt-2 lg:grid-cols-5 lg:gap-x-4">
          {deliverySteps.map((step) => (
            <li key={step.id} className="flex flex-col items-center text-center">
              <div className="flex items-end justify-center lg:h-[13rem]">
                <Image
                  src={step.image}
                  alt=""
                  width={step.width}
                  height={step.height}
                  sizes="(min-width: 1024px) 20vw, 60vw"
                  className="h-auto max-h-[9rem] w-auto max-w-full object-contain lg:max-h-[13rem]"
                />
              </div>
              <h3 className="mt-3 text-[1.5rem] font-bold text-navy">{step.title}</h3>
              <p className="mx-auto mt-1 max-w-[16rem] text-base leading-snug text-muted lg:max-w-[15rem]">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
