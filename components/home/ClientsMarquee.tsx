import { Badge } from "@/components/ui/Badge";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { clientSlots } from "@/content/home";

/**
 * Grayscale logo marquee. The slots are PLACEHOLDERS — approved client /
 * collaborator logos only (TODO: client to supply). Swap each slot for an
 * <img> with `grayscale` once logos are approved. Pauses on hover/focus and
 * stops entirely under prefers-reduced-motion.
 */
export function ClientsMarquee() {
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-offwhite py-14 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Eyebrow>Trusted by</Eyebrow>
          <h2 id="clients-title" className="mt-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
            Clients &amp; collaborators
          </h2>
        </div>
        {/* TODO: client to confirm — approved logos only */}
        <Badge tone="pending">Approved logos · to be confirmed</Badge>
      </div>

      <div
        className="marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        role="group"
        aria-label="Client logos (placeholders)"
      >
        <ul className="animate-marquee flex w-max gap-4 pr-4">
          {[...clientSlots, ...clientSlots].map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= clientSlots.length}
              className="flex h-20 w-48 shrink-0 items-center justify-center border border-dashed border-muted/40 bg-white font-heading text-sm font-semibold uppercase tracking-[0.14em] text-muted/70 grayscale"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
