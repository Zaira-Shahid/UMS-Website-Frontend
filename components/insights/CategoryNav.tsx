import Link from "next/link";
import { insightCategories } from "@/content/insights";
import { cn } from "@/lib/utils";

/** Category pills for the Insights pages. `current` is a category slug, or "all". */
export function CategoryNav({ current }: { current: string }) {
  const items = [{ slug: "all", name: "All", href: "/blog" }, ...insightCategories.map((c) => ({ slug: c.slug, name: c.name, href: `/blog/category/${c.slug}` }))];
  return (
    <nav aria-label="Insight categories" className="wrap py-4">
      <ul className="flex flex-wrap justify-center gap-2">
        {items.map((c) => {
          const on = c.slug === current;
          return (
            <li key={c.slug}>
              <Link
                href={c.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "block rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                  on ? "border-blue-700 bg-blue-700 text-white" : "border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white",
                )}
              >
                {c.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
