import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SiteImage } from "@/components/ui/SiteImage";
import { insightCategories } from "@/content/insights";
import type { Insight } from "@/types";

/** Article card (light surfaces). */
export function InsightCard({
  insight: a,
  sizes = "(min-width:768px) 33vw, 100vw",
}: {
  insight: Insight;
  sizes?: string;
}) {
  const category = insightCategories.find((c) => c.slug === a.category);
  return (
    <article className="group h-full">
      <Link href={`/insights/${a.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
          {/* TODO: replace with approved UMS photography */}
          <SiteImage
            asset={a.image}
            fill
            sizes={sizes}
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </div>
        <div className="mt-5 flex items-center gap-3 text-sm text-muted">
          {category && <Badge tone="cyan">{category.name}</Badge>}
          <span>{a.readingMinutes} min read</span>
        </div>
        <h3 className="mt-3 text-[1.5rem] transition-colors group-hover:text-cyan">{a.title}</h3>
        <p className="mt-2 text-[0.9375rem] text-muted">{a.excerpt}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-navy">
          Read article
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}
