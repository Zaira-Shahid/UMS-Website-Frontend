import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { QualitySection } from "@/content/quality";

/** One stage: a numbered heading beside what it involves and a plain checklist. No boxes, no photographs. */
export function QualityBlock({ section: s, index }: { section: QualitySection; index: number }) {
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-title`}
      className="scroll-mt-32 border-t border-navy/20 py-10 first:border-t-0 first:pt-0 md:py-14"
    >
      <Reveal className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-10">
        <div className="min-w-0 md:col-span-5">
          <p className="mono-label flex items-center gap-3 text-[#00608c]">
            <span className="tabular-nums text-navy">{String(index + 1).padStart(2, "0")}</span>
            {s.short}
          </p>
          <h2 id={`${s.id}-title`} className="mt-3 text-[1.75rem] text-navy sm:text-[2.25rem]">
            {s.title}
          </h2>
        </div>
        <div className="min-w-0 md:col-span-7">
          <p className="text-lg text-muted">{s.summary}</p>
          <h3 className="mt-7 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-navy">Typically includes</h3>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {s.checklist.map((item) => (
              <li key={item} className="flex gap-3 py-3 text-ink">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-blue" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
