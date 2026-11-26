import Image from "@/components/ui/StaticImage";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/lucide";
import { insightCategories } from "@/content/insights";
import { blogImage } from "@/lib/blog-image";
import type { Insight } from "@/types";

/** One article as a card: the category and reading time, the title, a short summary and a "Read article" link. */
export function InsightRow({ insight: a }: { insight: Insight; index?: number }) {
  const category = insightCategories.find((c) => c.slug === a.category);
  const photo = blogImage(a);
  return (
    <li>
      <Link
        href={`/blog/${a.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-blue/70 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:border-blue motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      >
        <span className="relative block aspect-[3/1] w-full overflow-hidden bg-[#e4eef7]">
          <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
        </span>
        <span className="flex flex-1 flex-col p-5 md:p-6">
        <span className="text-sm font-semibold text-blue-700">
          {category?.name} · {a.readingMinutes} min read
        </span>
        <span className="mt-2 block font-heading text-[1.375rem] font-bold leading-tight text-navy">{a.title}</span>
        <span className="mt-2 block text-base text-navy">{a.excerpt}</span>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 font-heading font-bold text-blue-700">
          Read article
          <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
        </span>
        </span>
      </Link>
    </li>
  );
}
