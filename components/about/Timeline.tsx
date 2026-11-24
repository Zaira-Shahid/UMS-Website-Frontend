import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { milestones } from "@/content/about";

/** Company timeline. */
export function Timeline() {
  return (
    <Reveal stagger as="ol" className="relative mt-12 space-y-8 border-l-2 border-navy/20 pl-8 sm:pl-10">
      {milestones.map((m) => (
        <RevealItem key={m.year} as="li" className="relative">
          <span
            aria-hidden
            className="absolute -left-[2.6rem] top-1 size-4 rounded-full border-2 border-cyan bg-cyan sm:-left-[3.1rem]"
          />
          <p className="mono-label text-cyan">{m.year}</p>
          <h3 className="mt-1 text-navy">{m.title}</h3>
          <p className="mt-2 max-w-xl text-muted">{m.description}</p>
        </RevealItem>
      ))}
    </Reveal>
  );
}
