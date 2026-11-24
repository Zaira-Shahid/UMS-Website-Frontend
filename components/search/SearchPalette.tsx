"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { SiteImage } from "@/components/ui/SiteImage";
import {
  searchGroups,
  searchIndex,
  suggestedItems,
  type SearchItem,
} from "@/lib/search-index";
import { cn } from "@/lib/utils";

/**
 * Command-palette search (⌘K / Ctrl+K). Built on the native <dialog> so focus
 * is trapped and Esc / backdrop close work without extra dependencies.
 */
export default function SearchPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const trimmed = query.trim();

  const grouped = useMemo(() => {
    const items: SearchItem[] = trimmed
      ? searchIndex.search(trimmed, { limit: 14 }).map((r) => r.item)
      : suggestedItems;
    return searchGroups
      .map((group) => ({ group, items: items.filter((i) => i.group === group) }))
      .filter((g) => g.items.length > 0);
  }, [trimmed]);

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    document
      .getElementById(`${listId}-opt-${active}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (flat.length) setActive((a) => (a + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (flat.length) setActive((a) => (a - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[active]) go(flat[active].href);
      else if (trimmed) go(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  let index = -1;

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search"
      onClose={() => {
        setQuery("");
        setActive(0);
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="bg-grain m-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden border border-white/15 bg-navy-950/90 p-0 text-white shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] backdrop-blur-2xl backdrop:bg-navy-950/70 backdrop:backdrop-blur-sm sm:mt-[12vh]"
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-5">
        <Search className="size-5 shrink-0 text-cyan-300" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={flat.length ? `${listId}-opt-${active}` : undefined}
          aria-label="Search services, projects, insights and pages"
          placeholder="Search services, projects, insights…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          autoComplete="off"
          className="h-16 min-w-0 flex-1 bg-transparent text-lg text-white outline-none placeholder:text-white/45 [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="flex size-9 items-center justify-center text-white/60 hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="max-h-[min(60vh,28rem)] overflow-y-auto" id={listId} role="listbox">
        {flat.length === 0 ? (
          <p className="px-5 py-10 text-center text-white/60" role="status">
            No results for “{trimmed}”.
          </p>
        ) : (
          grouped.map((g) => (
            <div key={g.group} role="group" aria-label={g.group}>
              <p className="mono-label sticky top-0 bg-navy-900/95 px-5 py-2 text-[0.6875rem] text-cyan-300 backdrop-blur">
                {trimmed ? g.group : `Suggested · ${g.group}`}
              </p>
              {g.items.map((item) => {
                index += 1;
                const i = index;
                return (
                  <Link
                    key={item.id}
                    id={`${listId}-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    href={item.href}
                    onClick={onClose}
                    onMouseMove={() => i !== active && setActive(i)}
                    tabIndex={-1}
                    className={cn(
                      "relative flex items-center gap-4 py-3 pl-6 pr-5 transition-colors",
                      i === active ? "bg-white/[0.09]" : "bg-transparent",
                    )}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-y-2 left-0 w-1 transition-transform duration-200"
                      style={{ background: item.color ?? "var(--cyan)", transform: i === active ? "scaleY(1)" : "scaleY(0.5)" }}
                    />
                    {item.image ? (
                      <span className="size-11 shrink-0 overflow-hidden bg-navy-900">
                        <SiteImage
                          asset={item.image}
                          sizes="44px"
                          className="size-full object-cover"
                        />
                      </span>
                    ) : (
                      <span className="flex size-11 shrink-0 items-center justify-center border border-white/15 text-cyan-300">
                        <ArrowRight className="size-4" aria-hidden />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-white">{item.title}</span>
                      <span className="block truncate text-sm text-white/60">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-white/10 bg-navy-900/80 px-5 py-3 text-xs text-white/60">
        <span className="hidden gap-3 sm:flex">
          <span>
            <kbd className="font-sans">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="font-sans">Enter</kbd> open
          </span>
          <span>
            <kbd className="font-sans">Esc</kbd> close
          </span>
        </span>
        {trimmed && (
          <Link
            href={`/search?q=${encodeURIComponent(trimmed)}`}
            onClick={onClose}
            className="ml-auto font-medium text-cyan-300 hover:text-white"
          >
            View all results →
          </Link>
        )}
      </div>
    </dialog>
  );
}
