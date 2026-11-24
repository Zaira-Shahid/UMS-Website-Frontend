import { Eyebrow } from "@/components/ui/SectionHeading";
import { clientNames } from "@/content/home";

/**
 * Wordmark marquee of clients and collaborators. Pauses on hover/focus and stops entirely
 * under prefers-reduced-motion.
 */
export function ClientsMarquee() {
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-offwhite py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Eyebrow>Trusted by</Eyebrow>
        <h2 id="clients-title" className="mt-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
          Clients &amp; collaborators
        </h2>
      </div>

      <div
        className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="group"
        aria-label="Clients and collaborators"
      >
        <ul className="animate-marquee flex w-max gap-4 pr-4">
          {[...clientNames, ...clientNames].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= clientNames.length}
              className="flex h-20 w-56 shrink-0 items-center justify-center border border-line bg-white px-3 text-center font-heading text-sm font-semibold uppercase tracking-[0.14em] text-navy/70"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
