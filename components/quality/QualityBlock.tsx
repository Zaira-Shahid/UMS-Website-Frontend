import { Check, ClipboardCheck, Files, Gauge, HardHat, Search, type LucideIcon } from "lucide-react";
import { CornerBrackets } from "@/components/ui/CornerBrackets";
import { PendingNote } from "@/components/ui/PendingNote";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import type { QualitySection } from "@/content/quality";
import { cn } from "@/lib/utils";

const icons: Record<QualitySection["icon"], LucideIcon> = {
  clipboard: ClipboardCheck,
  hardhat: HardHat,
  search: Search,
  gauge: Gauge,
  files: Files,
};

/**
 * One stage of the quality, safety and delivery story. The summary and checklist describe
 * what the stage typically involves (general engineering practice); a note makes clear that
 * UMS's own procedures are still to be confirmed.
 */
export function QualityBlock({ section: s, index }: { section: QualitySection; index: number }) {
  const Icon = icons[s.icon];
  const flip = index % 2 === 1;
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="scroll-mt-32 border border-line bg-white p-5 sm:p-8"
    >
      <Reveal className="grid gap-8 xl:grid-cols-12 xl:gap-10">
        <div className={cn("xl:col-span-5", flip && "xl:order-2")}>
          <CornerBrackets>
            <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
              {/* TODO: replace with approved UMS photography (stock placeholder) */}
              <SiteImage asset={s.image} fill sizes="(min-width:1280px) 28rem, (min-width:768px) 50vw, 100vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-transparent" />
            </div>
          </CornerBrackets>
          <p className="mt-2 text-xs text-muted">Placeholder photograph — it does not show UMS work.</p>
        </div>
        <div className={cn("xl:col-span-7", flip && "xl:order-1")}>
          <p className="flex items-center gap-3 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-[#00608c]">
            <Icon aria-hidden className="size-5 text-cyan" />
            <span className="tabular-nums">{String(index + 1).padStart(2, "0")} /</span> {s.short}
          </p>
          <h2 id={`${s.id}-title`} className="mt-3 text-[1.75rem] text-navy sm:text-[2rem]">
            {s.title}
          </h2>
          <p className="mt-3 text-muted">{s.summary}</p>

          <h3 className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">
            Typical checklist
          </h3>
          <ul className="mt-3 space-y-2.5">
            {s.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-ink">
                <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[3px] bg-cyan/10 text-cyan">
                  <Check className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* TODO: client to confirm — UMS's own procedures for this stage */}
          <PendingNote label="UMS procedures · to be confirmed" className="mt-6">
            The list above describes what this stage typically involves on an MEP project. UMS&rsquo;s own procedures,
            standards and certifications will be added once confirmed.
          </PendingNote>
        </div>
      </Reveal>
    </section>
  );
}
