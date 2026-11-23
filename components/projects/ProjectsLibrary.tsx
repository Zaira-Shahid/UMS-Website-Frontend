"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { Button } from "@/components/ui/Button";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import {
  TABS,
  activeFilterCount,
  defaultFilters,
  filterProjects,
  filtersToQuery,
  parseFilters,
  projectCounts,
  tabLabel,
  type ProjectFilters,
  type ProjectTab,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { FilterPanel } from "./FilterPanel";
import { ProjectCard } from "./ProjectCard";
import { ProjectRow } from "./ProjectRow";

const GRID_SIZES = "(min-width:1280px) 24rem, (min-width:640px) 45vw, 100vw";

/** Human labels for the removable "active filter" chips. */
function activeChips(f: ProjectFilters): { key: keyof ProjectFilters; label: string }[] {
  const chips: { key: keyof ProjectFilters; label: string }[] = [];
  if (f.tab === "completed" || f.tab === "ongoing") chips.push({ key: "tab", label: tabLabel[f.tab] });
  if (f.sector) chips.push({ key: "sector", label: industries.find((i) => i.slug === f.sector)?.name ?? f.sector });
  if (f.location) chips.push({ key: "location", label: f.location });
  if (f.service) chips.push({ key: "service", label: services.find((s) => s.slug === f.service)?.shortName ?? f.service });
  return chips;
}

/**
 * Projects library. The whole state lives in the query string
 * (?tab=&sector=&location=&service=&view=), so it survives refresh, can be
 * shared, and works with back/forward. Desktop filters apply instantly; on
 * mobile they sit in a bottom sheet and apply with the "Apply" button.
 */
export function ProjectsLibrary() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const uid = useId();

  const filters = useMemo(() => parseFilters(params), [params]);
  const results = useMemo(() => filterProjects(projects, filters), [filters]);
  const counts = projectCounts();
  const chips = activeChips(filters);
  const filterCount = activeFilterCount(filters);

  const go = (next: ProjectFilters) =>
    router.push(`${pathname}${filtersToQuery(next)}`, { scroll: false });

  const tabCount: Record<ProjectTab, number> = {
    all: counts.total,
    completed: counts.completed,
    ongoing: counts.ongoing,
    featured: counts.featured,
  };

  const clearAll = () => go({ ...defaultFilters, view: filters.view });
  const removeChip = (key: keyof ProjectFilters) =>
    go({ ...filters, [key]: key === "tab" ? "all" : undefined });

  /* ── Tabs: roving tabindex, ← → Home End ── */
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = TABS.length;
    const to =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (to === null) return;
    e.preventDefault();
    tabRefs.current[to]?.focus();
    go({ ...filters, tab: TABS[to] });
  };

  /* ── Mobile bottom sheet (native <dialog>: focus trap + Esc for free) ── */
  const sheet = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState<ProjectFilters>(filters);
  const openSheet = () => {
    setDraft(filters);
    sheet.current?.showModal();
  };
  const closeSheet = () => sheet.current?.close();
  const apply = () => {
    go({ ...draft, view: filters.view });
    closeSheet();
  };
  // The sheet only exists below lg; close it if the viewport grows past that.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && sheet.current?.open && sheet.current.close();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const unconfirmedNote =
    counts.unconfirmed > 0
      ? `${counts.unconfirmed} of ${counts.total} projects still have unconfirmed details (status, sector, location, services), so filters cannot match them yet.`
      : null;

  return (
    <section
      aria-label="Project library"
      className="relative isolate overflow-hidden bg-navy-900 pb-20 pt-4 text-white md:pb-28"
    >
      <BlueprintGrid variant="dark" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Project groups"
          className="-mx-5 flex gap-1 overflow-x-auto border-b border-white/15 px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((t, i) => {
            const selected = filters.tab === t;
            return (
              <button
                key={t}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`${uid}-tab-${t}`}
                type="button"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => go({ ...filters, tab: t })}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cn(
                  "relative -mb-px flex shrink-0 items-center gap-2 border-b-2 px-4 py-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] transition-colors",
                  selected
                    ? "border-cyan-300 text-white"
                    : "border-transparent text-white/60 hover:text-white",
                )}
              >
                {tabLabel[t]}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs tabular-nums",
                    selected ? "bg-cyan-300 text-navy-900" : "bg-white/10 text-white/70",
                  )}
                >
                  {tabCount[t]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Desktop filter sidebar */}
          <aside
            aria-label="Filters"
            className="hidden lg:col-span-3 lg:block"
          >
            <div className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-white">
                  Filters
                </h2>
                {filterCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-sm text-cyan-300 underline-offset-4 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <FilterPanel value={filters} onChange={(next) => go({ ...next, view: filters.view })} />
            </div>
          </aside>

          {/* Results */}
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p role="status" aria-live="polite" className="text-white/80">
                Showing <strong className="font-semibold text-white">{results.length}</strong> of{" "}
                {counts.total} projects
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openSheet}
                  className="inline-flex h-10 items-center gap-2 rounded-ums border border-white/30 px-4 font-heading text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:border-white hover:bg-white hover:text-navy lg:hidden"
                >
                  <SlidersHorizontal className="size-4" aria-hidden />
                  Filters
                  {filterCount > 0 && (
                    <span className="rounded-full bg-cyan-300 px-2 text-xs tabular-nums text-navy-900">
                      {filterCount}
                    </span>
                  )}
                </button>

                <div role="group" aria-label="Layout" className="flex">
                  {(
                    [
                      ["grid", LayoutGrid, "Grid view"],
                      ["list", List, "List view"],
                    ] as const
                  ).map(([v, Icon, label]) => (
                    <button
                      key={v}
                      type="button"
                      aria-pressed={filters.view === v}
                      aria-label={label}
                      onClick={() => go({ ...filters, view: v })}
                      className={cn(
                        "flex size-10 items-center justify-center border border-white/30 transition-colors first:rounded-l-ums last:rounded-r-ums last:border-l-0",
                        filters.view === v
                          ? "bg-white text-navy"
                          : "text-white/80 hover:border-white hover:text-white",
                      )}
                    >
                      <Icon className="size-4" aria-hidden />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {chips.length > 0 && (
              <ul aria-label="Active filters" className="mt-4 flex flex-wrap items-center gap-2">
                {chips.map((c) => (
                  <li key={c.key}>
                    <button
                      type="button"
                      onClick={() => removeChip(c.key)}
                      aria-label={`Remove filter: ${c.label}`}
                      className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-cyan-300/10 py-1 pl-3.5 pr-2.5 text-sm text-cyan-300 transition-colors hover:bg-cyan-300 hover:text-navy-900"
                    >
                      {c.label}
                      <X className="size-3.5" aria-hidden />
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="px-2 py-1 text-sm text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    Clear all
                  </button>
                </li>
              </ul>
            )}

            <div
              role="tabpanel"
              id={`${uid}-panel`}
              aria-labelledby={`${uid}-tab-${filters.tab}`}
              className="mt-8"
            >
              {results.length > 0 ? (
                <motion.ul
                  layout={!reduce}
                  className={cn(
                    filters.view === "grid"
                      ? "grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
                      : "flex flex-col gap-3",
                  )}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {results.map((p) => (
                      <motion.li
                        key={p.slug}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                        transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {filters.view === "grid" ? (
                          <ProjectCard
                            project={p}
                            index={projects.indexOf(p)}
                            sizes={GRID_SIZES}
                          />
                        ) : (
                          <ProjectRow project={p} index={projects.indexOf(p)} />
                        )}
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
              ) : (
                <div className="border border-dashed border-white/25 p-8 text-center sm:p-12">
                  <h2 className="font-heading text-2xl font-bold uppercase text-white">
                    No projects match these filters
                  </h2>
                  <p className="mx-auto mt-3 max-w-xl text-white/75">
                    {unconfirmedNote ?? "Try removing a filter to see more projects."}
                  </p>
                  <Button onClick={clearAll} variant="outline-light" className="mt-6">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>

            {unconfirmedNote && results.length > 0 && filterCount === 0 && (
              // TODO: client to confirm status, sector, location and services per project
              <p className="mt-10 border-t border-white/10 pt-5 text-sm text-white/60">
                {unconfirmedNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filters — bottom sheet */}
      <dialog
        ref={sheet}
        aria-label="Filter projects"
        onClick={(e) => e.target === sheet.current && closeSheet()}
        className="fixed inset-x-0 bottom-0 top-auto m-0 max-h-[88dvh] w-full max-w-none overflow-hidden rounded-t-xl border-0 bg-navy-900 p-0 text-white backdrop:bg-navy-900/80 open:flex open:flex-col lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-white/15 px-5 py-4">
          <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-white">Filters</h2>
          <button
            type="button"
            onClick={closeSheet}
            aria-label="Close filters"
            className="flex size-10 items-center justify-center rounded-ums border border-white/30 hover:bg-white hover:text-navy"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6">
          <FilterPanel value={draft} onChange={setDraft} />
        </div>
        <div className="flex gap-3 border-t border-white/15 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            variant="outline-light"
            onClick={() => setDraft({ ...defaultFilters, view: filters.view })}
            className="flex-1"
          >
            Clear
          </Button>
          <Button variant="accent" onClick={apply} className="flex-[2]">
            Apply
          </Button>
        </div>
      </dialog>
    </section>
  );
}
