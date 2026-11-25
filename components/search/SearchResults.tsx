"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import { searchGroups, searchIndex, searchItems } from "@/lib/search-index";

/** Full search results (`/search?q=`): a query box plus every match grouped by type. */
export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = (params.get("q") ?? "").trim();
  const [draft, setDraft] = useState(q);

  const grouped = useMemo(() => {
    const items = q ? searchIndex.search(q, { limit: 40 }).map((r) => r.item) : searchItems;
    return searchGroups
      .map((group) => ({ group, items: items.filter((i) => i.group === group) }))
      .filter((g) => g.items.length > 0);
  }, [q]);
  const total = grouped.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 md:py-16">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${encodeURIComponent(draft.trim())}`);
        }}
        className="flex overflow-hidden rounded-full border border-blue/70 bg-white focus-within:border-blue"
      >
        <label htmlFor="site-search" className="sr-only">
          Search services, projects, insights and pages
        </label>
        <input
          id="site-search"
          type="search"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search services, projects and insights…"
          autoComplete="off"
          className="h-14 min-w-0 flex-1 bg-white px-6 text-lg text-navy outline-none"
        />
        <button type="submit" className="flex h-14 items-center gap-2 bg-blue-700 px-6 font-heading font-bold text-white transition-colors hover:bg-blue-800">
          <Search className="size-4" aria-hidden /> Search
        </button>
      </form>

      <p className="mt-6 text-sm font-semibold text-muted" role="status" aria-live="polite">
        {q ? `${total} ${total === 1 ? "result" : "results"} for “${q}”` : `All ${total} pages, services, projects and articles`}
      </p>

      {total === 0 ? (
        <p className="mt-10 text-lg text-muted">
          Nothing matched. Try a service name such as “HVAC”, or browse <Link href="/services" className="text-blue-700 underline underline-offset-4">all services</Link>.
        </p>
      ) : (
        grouped.map((g) => (
          <section key={g.group} aria-labelledby={`g-${g.group}`} className="mt-10">
            <h2 id={`g-${g.group}`} className="font-heading text-2xl font-bold uppercase text-navy">
              {g.group}
            </h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {g.items.map((item) => (
                <li key={item.id}>
                  <Link href={item.href} className="group relative flex items-center gap-4 py-4 pl-5 pr-2 transition-colors hover:bg-offwhite">
                    <span aria-hidden className="absolute inset-y-3 left-0 w-1" style={{ background: item.color ?? "var(--blue)" }} />
                    {item.image && (
                      <span className="hidden size-14 shrink-0 overflow-hidden bg-navy-900 sm:block">
                        <SiteImage asset={item.image} sizes="56px" className="size-full object-cover" />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block font-medium text-navy group-hover:text-blue-700">{item.title}</span>
                      <span className="line-clamp-2 block text-sm text-muted">{item.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
