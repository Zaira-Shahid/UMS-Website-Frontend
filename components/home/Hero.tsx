import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { HeroStage } from "./HeroStage";

/**
 * H1 Hero (mockups 01 and 02). Navy, with a soft glow behind the building. The building is a single <picture>: the
 * desktop artwork from 1024px up and the mobile artwork below, so only one of them is downloaded. The chips under it and
 * the highlight of a pressed system live in HeroStage (a client component); the text column here is rendered on the server.
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
        {/* Stacked below 1024px. From 1024px the text column has a capped width and a 48px gap before the image, so the headline never runs under it. */}
        <HeroStage desktopSet={desktopSet ?? ""} mobileSet={mobileSet ?? ""} img={{ ...img, alt: common.alt }}>
          <div>
            <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5CC4EE]">
              <span aria-hidden className="h-0.5 w-8 shrink-0 rounded bg-blue" />
              MEP Contractors · Islamabad &amp; Lahore
            </p>
            <h1 id="home-title" className="mt-5 text-balance text-[2.5rem] font-extrabold leading-[1.05] text-white lg:text-[clamp(46px,5vw,76px)]">
              <span className="lg:block lg:whitespace-nowrap">MEP Contracting for</span>{" "}
              <span className="text-blue lg:block lg:whitespace-nowrap">Complex Buildings</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/80 lg:text-base xl:text-lg">
              Integrated MEP, HVAC, fire fighting, plumbing and electrical services — planned, installed and commissioned as one coordinated scope.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={quoteHref()} arrow className="h-[52px] rounded-lg px-6 text-[1.125rem] font-semibold max-sm:w-full">
                Request a Quote
              </Button>
              <Button href="/projects" variant="outline-light" className="h-[52px] rounded-lg bg-transparent px-6 text-[1.125rem] font-semibold max-sm:w-full">
                Explore Projects
              </Button>
            </div>
            <Link
              href="/services"
              className="group relative mt-6 inline-flex items-center gap-2 pb-1 text-[15px] text-white/85 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/50 before:absolute before:bottom-0 before:left-0 before:z-10 before:h-px before:w-0 before:bg-blue before:transition-[width] before:duration-300 hover:text-white hover:before:w-full motion-reduce:before:transition-none"
            >
              Explore Building Systems
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </div>
        </HeroStage>
      </div>
    </section>
  );
}
