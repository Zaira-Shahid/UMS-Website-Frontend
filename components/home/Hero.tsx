import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ServiceChip } from "@/components/ui/ServiceChip";
import { quoteHref } from "@/content/navigation";
import { chipOrder, serviceLabel } from "@/content/service-labels";

/**
 * H1 Hero (mockups 01 and 02). Navy, with a soft glow behind the building. The building is a single <picture>: the
 * desktop artwork from 1024px up and the mobile artwork below, so only one of them is downloaded.
 */
export function Hero() {
  const common = { alt: "Cutaway of a multi-storey building showing the HVAC, fire, plumbing, electrical and pool systems inside it" };
  const { props: desktop } = getImageProps({ ...common, src: "/images/hero/hero-building-desktop.png", width: 855, height: 512, priority: true, sizes: "(min-width: 1024px) 860px, 100vw" });
  const { props: mobile } = getImageProps({ ...common, src: "/images/hero/hero-building-mobile.png", width: 980, height: 590, priority: true, sizes: "100vw" });
  const { srcSet: desktopSet } = desktop;
  const { srcSet: mobileSet, ...img } = mobile;

  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(48%_62%_at_70%_44%,rgb(27_166_232/0.2),transparent_72%)]"
      />
      <div className="wrap pt-[calc(4rem+1.5rem)] xl:pt-[calc(var(--header-h)+2rem)]">
        <div className="relative lg:min-h-[31rem]">
          <div className="relative z-10 max-w-[40rem] lg:pt-10">
            <h1 id="home-title" className="text-[clamp(1.75rem,1rem+2.9vw,3.4rem)] font-extrabold leading-[1.08] text-white">
              MEP Contracting for Complex Buildings
            </h1>
            <p className="mt-4 text-[clamp(1.0625rem,0.9rem+0.8vw,1.625rem)] leading-snug text-white">Six disciplines. One coordinated delivery.</p>
            <div className="mt-7 flex gap-3 lg:mt-9">
              <Button href="/projects" size="lg" className="flex-1 px-3 text-base sm:text-lg lg:flex-none lg:px-6">
                Explore Projects
              </Button>
              <Button href={quoteHref()} variant="outline-light" size="lg" className="flex-1 px-3 text-base sm:text-lg lg:flex-none lg:px-6">
                Request a Quote
              </Button>
            </div>
            <Link
              href="/services"
              className="group mt-5 inline-flex items-center gap-2 border-b-4 border-blue pb-1.5 text-base sm:text-lg font-medium text-white transition-colors hover:text-cyan"
            >
              Explore Building Systems
              <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="-mx-[var(--wrap-pad)] mt-6 lg:absolute lg:inset-y-0 lg:-right-[2%] lg:mx-0 lg:mt-0 lg:flex lg:w-[62%] lg:items-center">
            <picture className="block w-full [clip-path:inset(1.5%_0.5%_0_0.5%)]">
              <source media="(min-width: 1024px)" srcSet={desktopSet} />
              <source media="(max-width: 1023px)" srcSet={mobileSet} />
              <img
                {...img}
                alt={common.alt}
                fetchPriority="high"
                className="h-auto w-full max-w-[855px] [mask-image:radial-gradient(ellipse_70%_74%_at_52%_50%,black_58%,transparent_100%)] lg:ml-auto"
              />
            </picture>
          </div>
        </div>

        {/* Service chips (desktop and tablet). Mobile gets the "Our Services" grid below instead. */}
        <ul aria-label="Services" className="mt-8 hidden grid-cols-3 gap-3 pb-10 md:grid lg:mt-4 xl:flex xl:justify-between">
          {chipOrder.map((slug) => (
            <li key={slug}>
              <ServiceChip slug={slug} label={serviceLabel[slug]} />
            </li>
          ))}
        </ul>
        <div className="pb-6 md:hidden" />
      </div>
    </section>
  );
}
