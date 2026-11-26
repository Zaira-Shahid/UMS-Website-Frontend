import { Check } from "@/components/ui/lucide";
import type { QualitySection } from "@/content/quality";

/** One stage: a card with its title, a general summary and a ticked checklist. */
export function QualityBlock({ section: s, index }: { section: QualitySection; index: number }) {
  return (
    <section id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28 rounded-2xl bg-[#e3f1fb] p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:gap-10">
        <div>
          <p className="flex size-11 items-center justify-center rounded-lg bg-blue-700 font-heading text-lg font-bold text-white">{index + 1}</p>
          <h2 id={`${s.id}-title`} className="mt-4 text-[1.5rem] font-extrabold leading-tight text-navy sm:text-[1.875rem]">
            {s.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy md:text-lg">{s.summary}</p>
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold text-navy">Typically includes</h3>
          <ul className="mt-3 border-t border-blue/40">
            {s.checklist.map((item) => (
              <li key={item} className="flex gap-3 border-b border-blue/40 py-3 text-base text-navy">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-blue-700" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
