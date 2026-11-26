import { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { HeroStage } from "./HeroStage";
import { RotatingWord } from "./RotatingWord";

/**
 * H1 Hero (mockups 01 and 02). Navy, with a soft glow behind the headline, a faint blueprint grid and a glow behind the
 * building. The building is a single <picture>: the desktop artwork from 1024px up and the mobile artwork below, so only one of
 * them is downloaded. The chips under it and the highlight of a pressed system live in HeroStage (a client component); the
 * text column here is rendered on the server, and only the rotating word in the headline is a client component.
 * The text column fades up once on load, part by part (the .hero-in classes; none with reduced motion).
 */
export function Hero() {
  const common = { alt: "Cutaway of a multi-storey building showing the HVAC, fire, plumbing, electrical and pool systems inside it" };
  const { props: desktop } = getImageProps({ ...common, src: "/images/hero/hero-building-desktop.png", width: 855, height: 512, priority: true, sizes: "(min-width: 1024px) 860px, 100vw" });
  const { props: mobile } = getImageProps({ ...common, src: "/images/hero/hero-building-mobile.png", width: 980, height: 590, priority: true, sizes: "100vw" });
  const { srcSet: desktopSet } = desktop;
  const { srcSet: mobileSet, ...img } = mobile;

  const points = [
    { text: "6 MEP disciplines", href: "/services" },
    { text: "Design-to-handover delivery" },
    { text: "Islamabad & Lahore offices" },
  ];

  return (
    <section aria-labelledby="home-title" className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Background accents: a glow behind the building, a soft glow behind the headline, and a faint grid that fades out to the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(48%_62%_at_70%_44%,rgb(27_166_232/0.2),transparent_72%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(38%_55%_at_22%_38%,rgb(27_166_232/0.16),transparent_70%)]"
      />
      <div aria-hidden className="hero-grid absolute inset-0 -z-10" />

      <div className="wrap pt-[calc(4rem+1.5rem)] xl:pt-[calc(var(--header-h)+2rem)]">
        {/* Stacked below 1024px. From 1024px the text column has a capped width and a 48px gap before the image, so the headline never runs under it. */}
        <HeroStage desktopSet={desktopSet ?? ""} mobileSet={mobileSet ?? ""} img={{ ...img, alt: common.alt }}>
          <div>
            <p
              className="hero-in inline-flex max-w-full items-center gap-2.5 rounded-3xl border border-[#5CC4EE]/40 bg-[rgb(27_166_232/0.12)] px-3.5 py-1.5 text-[12px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#5CC4EE]"
              style={{ ["--d" as string]: "0s" }}
            >
              <span aria-hidden className="relative flex size-2 shrink-0">
                <span className="hero-ping absolute inline-flex size-full rounded-full bg-[#5CC4EE]" />
                <span className="relative inline-flex size-2 rounded-full bg-[#5CC4EE]" />
              </span>
              MEP Contractors · Islamabad &amp; Lahore
            </p>

            {/* Screen readers (and search engines) get the plain sentence; the rotating word is hidden from them. */}
            <h1
              id="home-title"
              className="hero-in hero-in--head mt-5 text-balance text-[2.25rem] font-extrabold leading-[1.05] text-white lg:text-[clamp(46px,5vw,76px)]"
              style={{ ["--d" as string]: "0.1s" }}
            >
              <span className="sr-only">MEP Contracting for Complex Buildings</span>
              <span aria-hidden className="lg:block lg:whitespace-nowrap">
                MEP Contracting for
              </span>{" "}
              <span aria-hidden className="text-blue lg:block lg:whitespace-nowrap">
                Complex <RotatingWord />
              </span>
            </h1>

            <p
              className="hero-in mt-6 max-w-[540px] border-l-[3px] border-blue pl-4 text-base leading-relaxed text-white/80 xl:text-lg"
              style={{ ["--d" as string]: "0.2s" }}
            >
              Integrated MEP, HVAC, fire fighting, plumbing and electrical services — planned, installed and commissioned as one coordinated scope.
            </p>

            <div className="hero-in mt-8 flex flex-col gap-4 sm:flex-row" style={{ ["--d" as string]: "0.3s" }}>
              <Button
                href={quoteHref()}
                className="h-[52px] rounded-lg px-6 text-[1.125rem] font-semibold transition-shadow duration-300 hover:shadow-[0_0_28px_rgb(27_166_232/0.55)] max-sm:w-full"
              >
                Request a Quote
                <ArrowRight aria-hidden className="size-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
              </Button>
              <Button
                href="/projects"
                variant="outline-light"
                className="h-[52px] rounded-lg border-white/30 bg-white/[0.06] px-6 text-[1.125rem] font-semibold backdrop-blur-md hover:border-[#5CC4EE] hover:bg-white/10 hover:text-white max-sm:w-full"
              >
                Explore Projects
              </Button>
            </div>

            {/* Key points: only facts that are on the site */}
            <ul className="hero-in mt-7 flex flex-col gap-2.5 text-[14px] text-white/85 md:flex-row md:flex-wrap md:items-center md:gap-x-5 md:gap-y-2 xl:gap-x-4" style={{ ["--d" as string]: "0.4s" }}>
              {points.map((pt, i) => (
                <li key={pt.text} className={i > 0 ? "xl:border-l xl:border-white/20 xl:pl-4" : undefined}>
                  {pt.href ? (
                    <Link href={pt.href} className="group inline-flex items-center gap-2 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan">
                      <CircleCheck aria-hidden className="size-[18px] shrink-0 text-[#5CC4EE]" />
                      <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-[#5CC4EE]">{pt.text}</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <CircleCheck aria-hidden className="size-[18px] shrink-0 text-[#5CC4EE]" />
                      {pt.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </HeroStage>
      </div>
    </section>
  );
}
