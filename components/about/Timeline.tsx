import { Badge } from "@/components/ui/Badge";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { milestones } from "@/content/about";

/**
 * Company timeline. No milestones have been supplied, so each slot is a marked placeholder
 * (TODO: client to confirm — content/about.ts). Real entries replace the slots one by one.
 */
export function Timeline() {
  return (
    <Reveal stagger as="ol" className="relative mt-12 space-y-8 border-l-2 border-navy/20 pl-8 sm:pl-10">
      {milestones.map((m, i) => {
        const confirmed = !!(m.year && m.title);
        return (
          <RevealItem key={i} as="li" className="relative">
            <span
              aria-hidden
              className={
                "absolute -left-[2.6rem] top-1 size-4 rounded-full border-2 sm:-left-[3.1rem] " +
                (confirmed ? "border-cyan bg-cyan" : "border-navy/40 bg-white")
              }
            />
            {confirmed ? (
              <>
                <p className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-cyan">{m.year}</p>
                <h3 className="mt-1 text-navy">{m.title}</h3>
                {m.description && <p className="mt-2 max-w-xl text-muted">{m.description}</p>}
              </>
            ) : (
              <div className="max-w-xl border border-dashed border-[#b9770e] bg-[#fff6e5] p-4">
                <Badge tone="pending" className="border-0 bg-transparent p-0">
                  Year · to be confirmed
                </Badge>
                <p className="mt-2 text-sm text-[#7a4b00]">
                  Milestone {i + 1}: title and description to be supplied by UMS.
                </p>
              </div>
            )}
          </RevealItem>
        );
      })}
    </Reveal>
  );
}
