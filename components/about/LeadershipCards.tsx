import { UserRound } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { leadership } from "@/content/about";

/**
 * Leadership card slots. Names, roles, bios and portraits are not supplied yet, so each slot is
 * a placeholder (TODO: client to confirm — content/about.ts). No stand-in people are shown.
 */
export function LeadershipCards() {
  return (
    <Reveal stagger as="ul" className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {leadership.map((p, i) => (
        <RevealItem key={i} as="li">
          <article className="h-full">
            <CornerBrackets>
              <div className="relative aspect-[4/5] overflow-hidden border border-dashed border-navy/30 bg-offwhite">
                {p.portrait ? (
                  <SiteImage asset={p.portrait} fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-navy/40">
                    <UserRound aria-hidden className="size-16" strokeWidth={1.25} />
                    <span className="text-sm">Portrait to be confirmed</span>
                  </span>
                )}
              </div>
            </CornerBrackets>
            <div className="mt-5">
              {p.name ? (
                <>
                  <h3 className="text-navy">{p.name}</h3>
                  {p.role && <p className="mt-1 font-heading text-sm uppercase tracking-[0.12em] text-cyan">{p.role}</p>}
                  {p.bio && <p className="mt-3 text-muted">{p.bio}</p>}
                </>
              ) : (
                <div className="space-y-2">
                  <Badge tone="pending">Name · to be confirmed</Badge>
                  <br />
                  <Badge tone="pending">Role · to be confirmed</Badge>
                </div>
              )}
            </div>
          </article>
        </RevealItem>
      ))}
    </Reveal>
  );
}
