import Image from "next/image";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
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
          <LogoMark className="h-12 w-auto self-start lg:h-14" />
          <p className="mt-1 font-heading text-[0.6875rem] font-bold uppercase tracking-wide text-navy lg:text-xs">Ultimate Mechanical Solutions</p>
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

        <FaqAccordion faqs={homeFaqs} className="lg:pt-2" />
      </div>
    </section>
  );
}
