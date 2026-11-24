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

/** Routes whose first screen is a dark hero: light header text over a transparent bar. */
const hasDarkHero = (pathname: string) =>
  pathname === "/" ||
  pathname === "/services" ||
  pathname.startsWith("/services/") ||
  pathname === "/projects" ||
  pathname.startsWith("/projects/") ||
  pathname === "/request-a-quote" ||
  pathname === "/contact" ||
  pathname === "/careers";

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

  const panelMotion = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  const linkTone = light ? "text-white hover:text-cyan-300" : "text-navy hover:text-cyan";

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
            "mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-300 sm:px-8",
            scrolled ? "h-16" : "h-[var(--header-h)]",
          )}
        >
          <Logo tone={light ? "light" : "dark"} />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const hasMenu = Boolean(item.children);
                const open = openMenu === item.label;
                return (
                  <li
                    key={item.label}
                    onPointerEnter={hasMenu ? intent(item.label, 110) : undefined}
                    onPointerLeave={hasMenu ? intent(null, 180) : undefined}
                    onBlur={
                      hasMenu
                        ? (e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) setOpenMenu(null);
                          }
                        : undefined
                    }
                    onKeyDown={
                      hasMenu
                        ? (e) => {
                            if (e.key === "Escape" && open) {
                              setOpenMenu(null);
                              e.currentTarget.querySelector<HTMLButtonElement>("button[aria-expanded]")?.focus();
                            }
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        onClick={closeMenus}
                        className={cn(
                          "group/link relative whitespace-nowrap py-2 font-heading text-[0.9375rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                          linkTone,
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-cyan transition-transform duration-300",
                            isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover/link:scale-x-100",
                          )}
                        />
                      </Link>
                      {hasMenu && (
                        <button
                          type="button"
                          aria-expanded={open}
                          aria-controls={`menu-${item.label}`}
                          aria-label={`${item.label} menu`}
                          onClick={() => {
                            clearTimeout(hoverTimer.current);
                            setOpenMenu(open ? null : item.label);
                          }}
                          className={cn("ml-0.5 p-1.5 transition-colors", linkTone)}
                        >
                          <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasMenu && open && (
                        <motion.div
                          id={`menu-${item.label}`}
                          {...panelMotion}
                          className="absolute inset-x-0 top-full border-t border-white/10 bg-navy-950/95 text-white shadow-[0_24px_40px_-24px_rgb(0_0_0/0.6)] backdrop-blur-xl"
                        >
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
