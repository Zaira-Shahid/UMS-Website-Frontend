import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";

/** H8 CTA band (mockup 08). Navy, blue bar, heading, one line, two buttons and the wireframe building on the right. */
export function CTABand() {
  return (
    <section aria-labelledby="cta-band-title" className="relative isolate overflow-hidden bg-[#052a45] text-white">
      <Image
        src="/images/sections/cta-wireframe-building.png"
        alt=""
        width={600}
        height={453}
        aria-hidden
        sizes="40vw"
        className="pointer-events-none absolute bottom-0 right-0 -z-10 hidden h-[88%] w-auto max-w-[46%] object-contain object-right-bottom opacity-90 [mask-image:linear-gradient(to_right,transparent,black_30%)] md:block"
      />
      <div className="wrap py-10 lg:py-12">
        <div className="max-w-[56rem]">
          <span aria-hidden className="block h-[7px] w-[6.5rem] bg-blue" />
          <h2 id="cta-band-title" className="mt-5 text-[clamp(2rem,1rem+3vw,3.5rem)] font-extrabold leading-tight text-white">
            Let&rsquo;s Discuss Your Project
          </h2>
          <p className="mt-4 text-base text-white/90 lg:text-xl">Tell us about your requirements and explore the right MEP engineering solution with UMS.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={quoteHref()} variant="primary" size="lg" className="text-lg sm:px-10">
              Request a Quote
            </Button>
            <Button href="/contact" variant="outline-light" size="lg" className="text-lg sm:px-10">
              Contact UMS
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
