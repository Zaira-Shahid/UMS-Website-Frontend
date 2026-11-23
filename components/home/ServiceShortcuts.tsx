import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { heroSlides, shortcutServices } from "@/content/home";
import { serviceBySlug } from "@/content/services";
import { cn } from "@/lib/utils";
import { ServiceIcon } from "./ServiceIcons";

/** Four shortcut cards that overlap the bottom of the hero. */
export function ServiceShortcuts() {
  return (
    <section aria-label="Service shortcuts" className="relative z-10 -mt-20 md:-mt-24">
      {/* White starts exactly at the hero's bottom edge, so the cards straddle the seam. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-20 bg-white md:top-24" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal stagger as="div" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shortcutServices.map((slug) => {
            const s = serviceBySlug(slug);
            if (!s) return null;
            const fire = s.accent === "fire";
            // Hero-slide label ("Fire Protection") where one exists.
            const label = heroSlides.find((h) => h.service === slug)?.label ?? s.shortName;
            return (
              <RevealItem key={slug}>
                <Link
                  href={`/services/${slug}`}
                  className={cn(
                    "group relative flex h-full flex-col bg-white p-4 shadow-[0_18px_40px_-20px_rgb(11_34_54/0.45)] ring-1 ring-line transition duration-300 hover:-translate-y-1 sm:p-6",
                    fire ? "hover:ring-fire" : "hover:ring-cyan",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                      fire ? "bg-fire" : "bg-cyan",
                    )}
                  />
                  <ServiceIcon
                    slug={slug}
                    className={cn("size-9 sm:size-11", fire ? "text-fire" : "text-cyan")}
                  />
                  <h3 className="mt-4 text-[1.125rem] font-semibold uppercase leading-tight tracking-[0.04em] sm:mt-5 sm:text-xl">
                    {label}
                  </h3>
                  <p className="mt-2 hidden text-sm text-muted sm:block">{s.tagline}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-navy">
                    Explore
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
      {/* Breathing room before the next band */}
      <div className="h-16 md:h-24" aria-hidden />
    </section>
  );
}
