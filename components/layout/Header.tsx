"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav, quoteHrefForPath } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { AboutPanel, ServicesPanel } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

/** Lazy: the palette and its Fuse index load only when first opened. */
const SearchPalette = dynamic(() => import("@/components/search/SearchPalette"), { ssr: false });

/** Only the homepage opens on a dark hero: light header text over a transparent bar. */
const hasDarkHero = (pathname: string) => pathname === "/";

/**
 * Site header (spec §7). Transparent over dark heroes, glass (backdrop blur) once scrolled; hides
 * when scrolling down and returns when scrolling up (or when focus enters it). Mega menus open on
 * hover with intent delay, on click and from the keyboard; Esc closes them.
 */
export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastY = useRef(0);
  const focusFirst = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const dy = y - lastY.current;
      if (Math.abs(dy) > 6) {
        setHidden(dy > 0 && y > 240);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A new page always starts with the header visible.
  useEffect(() => {
    setHidden(false);
    setOpenMenu(null);
  }, [pathname]);

  const openSearch = useCallback(() => {
    setSearchMounted(true);
    setOpenMenu(null);
    setSearchOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const closeMenus = useCallback(() => setOpenMenu(null), []);

  // ⌘K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openSearch]);

  // After a keyboard open, move focus to the first row of the panel.
  useEffect(() => {
    if (!openMenu || !focusFirst.current) return;
    focusFirst.current = false;
    const id = requestAnimationFrame(() =>
      document.querySelector<HTMLAnchorElement>(`#menu-${openMenu} ul a[href]`)?.focus(),
    );
    return () => cancelAnimationFrame(id);
  }, [openMenu]);

  // Clicking or tapping anywhere outside the nav closes an open dropdown.
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMenu]);

  // Esc closes an open mega menu wherever focus is (hover-opened menus have no focus inside).
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      document.querySelector<HTMLButtonElement>(`button[aria-controls="menu-${openMenu}"]`)?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMenu]);

  const intent = (label: string | null, delay: number) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpenMenu(label), delay);
  };

  const darkRoute = hasDarkHero(pathname);
  const menuOpen = openMenu !== null;
  const glass = scrolled || menuOpen || mobileOpen;
  // Text is light on dark routes (transparent or dark glass) and navy on light routes.
  const light = darkRoute;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  const itemActive = (item: (typeof mainNav)[number]) =>
    isActive(item.href) || (item.children?.some((c) => c.href !== "/" && isActive(c.href)) ?? false);

  const panelMotion = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  const linkTone = light ? "text-white hover:text-cyan-300" : "text-navy hover:text-blue";

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow,backdrop-filter] duration-300",
          hidden && !menuOpen && !mobileOpen && !searchOpen ? "-translate-y-full" : "translate-y-0",
          glass
            ? light
              ? "border-b border-white/10 bg-navy-950/75 backdrop-blur-xl"
              : "border-b border-line bg-white/85 backdrop-blur-xl"
            : light
              ? "bg-transparent"
              : "bg-white",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 2xl:gap-6 transition-[height] duration-300 sm:px-8",
            scrolled ? "h-16" : "h-[var(--header-h)]",
          )}
        >
          <Logo tone={light ? "light" : "dark"} />

          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-5 2xl:gap-8">
              {mainNav.map((item) => {
                const hasMenu = Boolean(item.children);
                const open = openMenu === item.label;
                const active = itemActive(item);
                const itemClass = cn(
                  "relative inline-flex items-center gap-1 whitespace-nowrap py-2 font-heading text-[0.9375rem] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300",
                  active || open ? (light ? "text-cyan-300" : "text-blue") : linkTone,
                );
                const underline = active ? (
                  <svg
                    aria-hidden
                    viewBox="0 0 40 8"
                    className="pointer-events-none absolute -bottom-1 left-1/2 h-2 w-9 -translate-x-1/2"
                    fill="none"
                  >
                    <path d="M3 5.5C12 1.5 28 1.5 37 5.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                ) : null;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onPointerEnter={hasMenu ? intent(item.label, 110) : undefined}
                    onPointerLeave={hasMenu ? intent(null, 200) : undefined}
                    onBlur={
                      hasMenu
                        ? (e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
                          }
                        : undefined
                    }
                  >
                    {hasMenu ? (
                      <button
                        type="button"
                        aria-expanded={open}
                        aria-controls={`menu-${item.label}`}
                        aria-current={active ? "page" : undefined}
                        onClick={(e) => {
                          clearTimeout(hoverTimer.current);
                          // detail === 0 means the click came from the keyboard (Enter or Space).
                          focusFirst.current = !open && e.detail === 0;
                          setOpenMenu(open ? null : item.label);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowDown") {
                            e.preventDefault();
                            clearTimeout(hoverTimer.current);
                            focusFirst.current = true;
                            if (open) {
                              document.querySelector<HTMLAnchorElement>(`#menu-${item.label} ul a[href]`)?.focus();
                              focusFirst.current = false;
                            } else setOpenMenu(item.label);
                          }
                        }}
                        className={itemClass}
                      >
                        {item.label}
                        <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
                        {underline}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={closeMenus}
                        className={itemClass}
                      >
                        {item.label}
                        {underline}
                      </Link>
                    )}

                    <AnimatePresence>
                      {hasMenu && open && (
                        // The top padding is a hover bridge: the pointer never leaves the <li> on its way to the panel.
                        <motion.div id={`menu-${item.label}`} {...panelMotion} className="absolute left-0 top-full z-10 pt-6">
                          {item.label === "Services" ? (
                            <ServicesPanel onNavigate={closeMenus} />
                          ) : (
                            <AboutPanel links={item.children ?? []} onNavigate={closeMenus} />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search (Ctrl+K)"
              aria-keyshortcuts="Control+K Meta+K"
              className={cn("flex size-11 items-center justify-center transition-colors", linkTone)}
            >
              <Search className="size-5" aria-hidden />
            </button>
            <div className="hidden xl:block">
              <Button href={quoteHrefForPath(pathname)} variant={light ? "accent" : "primary"} size="md" magnetic>
                Request a Quote
              </Button>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={cn(
                "flex size-11 items-center justify-center border transition-colors xl:hidden",
                light ? "border-white/40 text-white hover:border-white" : "border-line text-navy hover:border-navy",
              )}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={closeMobile} returnFocusRef={menuButtonRef} />
      {searchMounted && <SearchPalette open={searchOpen} onClose={closeSearch} />}
    </>
  );
}
