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
      className="m-auto mt-[8vh] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-ums border border-line bg-white p-0 text-ink shadow-2xl backdrop:bg-navy-900/70 sm:mt-[12vh]"
    >
      <div className="flex items-center gap-3 border-b border-line px-5">
        <Search className="size-5 shrink-0 text-cyan" aria-hidden />
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
          className="h-16 min-w-0 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-muted/70 [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close search"
          className="flex size-9 items-center justify-center rounded-ums text-muted hover:bg-offwhite hover:text-navy"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>

      <div className="max-h-[min(60vh,28rem)] overflow-y-auto" id={listId} role="listbox">
        {flat.length === 0 ? (
          <p className="px-5 py-10 text-center text-muted" role="status">
            No results for “{trimmed}”.
          </p>
        ) : (
          grouped.map((g) => (
            <div key={g.group} role="group" aria-label={g.group}>
              <p className="sticky top-0 bg-offwhite px-5 py-2 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-muted">
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
                      "flex items-center gap-4 px-5 py-3 transition-colors",
                      i === active ? "bg-cyan/10" : "bg-white",
                    )}
                  >
                    {item.image ? (
                      <span className="size-11 shrink-0 overflow-hidden rounded-[4px] bg-navy-900">
                        <SiteImage
                          asset={item.image}
                          sizes="44px"
                          className="size-full object-cover"
                        />
                      </span>
                    ) : (
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-offwhite text-cyan">
                        <ArrowRight className="size-4" aria-hidden />
                      </span>
                    )}
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-navy">{item.title}</span>
                      <span className="block truncate text-sm text-muted">
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

      <div className="flex items-center justify-between gap-4 border-t border-line bg-offwhite px-5 py-3 text-xs text-muted">
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
            className="ml-auto font-medium text-[#00608c] hover:text-navy"
          >
            View all results →
          </Link>
        )}
      </div>
    </dialog>
  );
}
