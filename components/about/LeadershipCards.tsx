import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { leadership } from "@/content/about";

/** Initials for the generated avatar ("Engr. Ahmed Raza" becomes "AR"). */
const initials = (name: string) =>
  name
    .replace(/^Engr\.\s*/i, "")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Leadership cards with generated initials avatars (no portraits, no real faces). */
export function LeadershipCards() {
  return (
    <Reveal stagger as="ul" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {leadership.map((p) => (
        <RevealItem key={p.name} as="li">
          <article className="h-full">
            <CornerBrackets>
              <div className="bg-blueprint relative flex aspect-[4/5] items-center justify-center overflow-hidden border border-line bg-offwhite">
                <span
                  aria-hidden
                  className="flex size-28 items-center justify-center rounded-full bg-navy font-heading text-5xl font-extrabold tracking-wide text-cyan-300"
                >
                  {initials(p.name)}
                </span>
              </div>
            </CornerBrackets>
            <div className="mt-5">
              <h3 className="text-navy">{p.name}</h3>
              <p className="mt-1 font-heading text-sm uppercase tracking-[0.12em] text-cyan">{p.role}</p>
              <p className="mt-3 text-muted">{p.bio}</p>
            </div>
          </article>
        </RevealItem>
      ))}
    </Reveal>
  );
}
