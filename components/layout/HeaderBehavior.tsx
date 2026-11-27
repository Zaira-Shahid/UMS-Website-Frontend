"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { whenInteracted } from "@/lib/hydration-gate";

/** Lazy: the palette and its Fuse index load only when first opened. */
const SearchPalette = dynamic(() => import("@/components/search/SearchPalette"), { ssr: false });

/** The full-screen menu is only needed once it has been opened, so its code is loaded on demand (and fetched in advance on the first interaction). */
const MobileNav = dynamic(() => import("./MobileNav").then((m) => m.MobileNav), { ssr: false });

const HOVER_IN_MS = 110;
const HOVER_OUT_MS = 200;

/**
 * The header's scripting. The header itself is server-rendered (components/layout/Header.tsx); this component renders nothing
 * of its own except the search palette and the full-screen menu once they are opened. It wires the existing markup:
 *   - the Services and About dropdowns: hover (with intent delay), the chevron button, ArrowDown on the label, arrows / Home /
 *     End inside a panel, Esc (focus returns to the chevron), an outside click, a click on any link, and focus leaving;
 *   - the search button and Ctrl+K / Cmd+K;
 *   - the mobile menu button.
 * The open dropdown is `data-open="true"` on its <li>; the markup's classes show the panel and turn the chevron.
 */
export function HeaderBehavior() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  const closeMenusRef = useRef<() => void>(() => {});

  const openSearch = useCallback(() => {
    setSearchMounted(true);
    closeMenusRef.current();
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // The active item and the page-aware quote links follow client-side navigation too; every dropdown closes.
  useEffect(() => {
    window.__markNav?.(pathname);
    closeMenusRef.current();
  }, [pathname]);

  // Fetch the full-screen menu's code in advance (first interaction), so the first tap is instant.
  useEffect(() => {
    whenInteracted().then(() => import("./MobileNav"));
  }, []);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("[data-main-nav]");
    const items = Array.from(nav?.querySelectorAll<HTMLElement>("li[data-menu]") ?? []);
    const cleanups: (() => void)[] = [];
    let timer: ReturnType<typeof setTimeout> | undefined;

    const setOpen = (label: string | null) => {
      for (const li of items) {
        const on = li.dataset.menu === label;
        if (on) li.setAttribute("data-open", "true");
        else li.removeAttribute("data-open");
        li.querySelector("[data-menu-toggle]")?.setAttribute("aria-expanded", String(on));
      }
    };
    const openLabel = () => items.find((li) => li.dataset.open === "true")?.dataset.menu ?? null;
    closeMenusRef.current = () => {
      clearTimeout(timer);
      setOpen(null);
    };
    const firstLink = (label: string) => document.querySelector<HTMLAnchorElement>(`#menu-${label} ul a[href]`);

    for (const li of items) {
      const label = li.dataset.menu as string;
      const intent = (to: string | null, delay: number) => (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        clearTimeout(timer);
        timer = setTimeout(() => setOpen(to), delay);
      };
      const enter = intent(label, HOVER_IN_MS);
      const leave = intent(null, HOVER_OUT_MS);
      li.addEventListener("pointerenter", enter);
      li.addEventListener("pointerleave", leave);
      // Focus leaving the item closes its panel.
      const out = (e: FocusEvent) => {
        if (!li.contains(e.relatedTarget as Node | null)) setOpen(null);
      };
      li.addEventListener("focusout", out);
      cleanups.push(() => {
        li.removeEventListener("pointerenter", enter);
        li.removeEventListener("pointerleave", leave);
        li.removeEventListener("focusout", out);
      });
    }

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const toggle = t.closest<HTMLElement>("[data-menu-toggle]");
      if (toggle) {
        const label = toggle.closest<HTMLElement>("li[data-menu]")?.dataset.menu ?? null;
        clearTimeout(timer);
        const wasOpen = openLabel() === label;
        setOpen(wasOpen ? null : label);
        // detail === 0 means the click came from the keyboard (Enter or Space).
        if (!wasOpen && label && e.detail === 0) requestAnimationFrame(() => firstLink(label)?.focus());
        return;
      }
      // Following any link in the nav closes the dropdowns.
      if (t.closest("[data-main-nav] a[href]")) closeMenusRef.current();
      if (t.closest("[data-open-search]")) return openSearch();
      if (t.closest("[data-open-mobile]")) {
        setMobileMounted(true);
        setMobileOpen(true);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        return openSearch();
      }
      const open = openLabel();
      if (e.key === "Escape" && open) {
        setOpen(null);
        document.querySelector<HTMLButtonElement>(`button[aria-controls="menu-${open}"]`)?.focus();
        return;
      }
      const t = e.target as HTMLElement;
      // ArrowDown on a dropdown's label or chevron opens it and moves into it.
      if (e.key === "ArrowDown" && (t.matches("li[data-menu] a[data-nav-link]") || t.matches("[data-menu-toggle]"))) {
        e.preventDefault();
        clearTimeout(timer);
        const label = t.closest<HTMLElement>("li[data-menu]")?.dataset.menu as string;
        setOpen(label);
        requestAnimationFrame(() => firstLink(label)?.focus());
        return;
      }
      // Arrows, Home and End move focus between the links inside a panel.
      const panel = t.closest<HTMLElement>("[data-menu-panel]");
      if (panel && ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        const links = Array.from(panel.querySelectorAll<HTMLAnchorElement>("a[href]"));
        if (!links.length) return;
        e.preventDefault();
        const i = links.indexOf(document.activeElement as HTMLAnchorElement);
        const next = e.key === "Home" ? 0 : e.key === "End" ? links.length - 1 : e.key === "ArrowDown" ? (i + 1) % links.length : (i - 1 + links.length) % links.length;
        links[next].focus();
      }
    };

    // Clicking or tapping anywhere outside the nav closes an open dropdown.
    const onDown = (e: PointerEvent) => {
      if (openLabel() && nav && !nav.contains(e.target as Node)) setOpen(null);
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onDown);
    menuButton.current = document.querySelector<HTMLButtonElement>("[data-open-mobile]");
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onDown);
      for (const c of cleanups) c();
    };
  }, [openSearch]);

  // Keep the menu button's aria-expanded in step with the full-screen menu.
  useEffect(() => {
    menuButton.current?.setAttribute("aria-expanded", String(mobileOpen));
  }, [mobileOpen]);

  return (
    <>
      {mobileMounted && (
        <MobileNav
          open={mobileOpen}
          onClose={closeMobile}
          returnFocusRef={menuButton}
          onSearch={() => {
            closeMobile();
            openSearch();
          }}
        />
      )}
      {searchMounted && <SearchPalette open={searchOpen} onClose={closeSearch} />}
    </>
  );
}
