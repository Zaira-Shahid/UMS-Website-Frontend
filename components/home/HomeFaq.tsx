import Image from "@/components/ui/StaticImage";
import { FaqAccordionIsland } from "@/components/home/islands";
import { LogoMark } from "@/components/layout/Logo";
import { homeFaqs } from "@/content/home";

/**
 * H7 FAQ (mockup 07). Logo, heading and sketch on the left; the accordion on the right. The page emits the matching
 * FAQPage JSON-LD.
 */
export function HomeFaq() {
  return (
    <section aria-labelledby="faq-title" className="relative overflow-hidden bg-[#f2f7fb]">
      <div className="wrap grid gap-8 py-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14 lg:py-16">
        <div className="flex flex-col">
          <LogoMark className="h-14 self-start lg:h-16" />
          <span aria-hidden className="accent-bar mt-8 lg:mt-12" />
          <h2 id="faq-title" className="mt-4 text-[clamp(2rem,1rem+3vw,3.5rem)] font-extrabold max-w-[8em] leading-[1.1] text-navy">
            Frequently Asked Questions
          </h2>
          <Image
            src="/images/sections/faq-building-sketch.png"
            alt=""
            width={530}
            height={349}
            sizes="(min-width: 1024px) 30vw, 70vw"
            className="mt-6 hidden h-auto w-full max-w-[26rem] lg:block"
          />
        </div>

        <FaqAccordionIsland faqs={homeFaqs} className="lg:pt-2" />
      </div>
    </section>
  );
}
