import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { insightCategories } from "@/content/insights";
import { serviceBySlug } from "@/content/services";
import { disciplineColor } from "@/lib/discipline";
import type { Insight } from "@/types";

/** One article in a list: a ruled row with the title, a one-line summary, the category and reading time. */
export function InsightRow({ insight: a, index }: { insight: Insight; index?: number }) {
  const category = insightCategories.find((c) => c.slug === a.category);
  return (
    <li>
      <Link
        href={`/insights/${a.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-1 py-7 transition-colors hover:bg-offwhite sm:grid-cols-[3.5rem_1fr_auto] sm:py-8"
      >
        <span className="mono-label pl-1 pt-2 text-[#00608c] tabular-nums sm:pl-3">{index !== undefined ? String(index + 1).padStart(2, "0") : ""}</span>
        <span className="min-w-0">
          <span className="mono-label block text-muted">
            {category?.name} · {a.readingMinutes} min read
          </span>
          <span className="mt-2 block font-heading text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-bold uppercase leading-tight text-navy transition-colors group-hover:text-cyan">
            {a.title}
          </span>
          <span className="mt-2 block max-w-2xl text-muted">{a.excerpt}</span>
          <span className="mt-3 flex items-center gap-1.5">
            {a.services.map((s) => (
              <span key={s} className="size-2 rounded-full" style={{ background: disciplineColor[s] }} title={serviceBySlug(s)?.shortName}>
                <span className="sr-only">{serviceBySlug(s)?.shortName}</span>
              </span>
            ))}
          </span>
        </span>
        <ArrowUpRight aria-hidden className="mr-1 mt-2 size-6 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan sm:mr-3" />
      </Link>
    </li>
  );
}
