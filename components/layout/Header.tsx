"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav, quoteHref } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { AboutPanel, ServicesPanel } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

/** Lazy: the palette and its Fuse index load only when first opened. */
const SearchPalette = dynamic(() => import("@/components/search/SearchPalette"), {
  ssr: false,
});

/**
 * Routes whose first screen is a dark hero, so the header starts transparent
 * with light text. Every other route gets the solid header from the start.
 */
const hasDarkHero = (pathname: string) =>
  pathname === "/" ||
  pathname === "/services" ||
  pathname.startsWith("/services/") ||
  pathname === "/projects" ||
  pathname.startsWith("/projects/");

export function Header() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const transparentRoute = hasDarkHero(pathname);
  const solid = !transparentRoute || scrolled || openMenu !== null || mobileOpen;
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300",
          solid ? "bg-white shadow-[0_1px_0_var(--ums-line)]" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 transition-[height] duration-300 sm:px-8",
            scrolled ? "h-16" : "h-[var(--header-h)]",
          )}
        >
          <Logo tone={solid ? "dark" : "light"} />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => {
                const hasMenu = Boolean(item.children);
                const open = openMenu === item.label;
                const linkTone = solid
                  ? "text-navy hover:text-cyan"
                  : "text-white hover:text-cyan-300";
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
                              e.currentTarget
                                .querySelector<HTMLButtonElement>("button[aria-expanded]")
                                ?.focus();
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
                            isActive(item.href)
                              ? "scale-x-100"
                              : "scale-x-0 group-hover/link:scale-x-100",
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
                          <ChevronDown
                            aria-hidden
                            className={cn("size-4 transition-transform", open && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasMenu && open && (
                        <motion.div
                          id={`menu-${item.label}`}
                          {...panelMotion}
                          className="absolute inset-x-0 top-full border-t border-line bg-white shadow-[0_24px_40px_-24px_rgb(11_34_54/0.35)]"
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
              className={cn(
                "flex size-11 items-center justify-center rounded-ums transition-colors",
                solid ? "text-navy hover:text-cyan" : "text-white hover:text-cyan-300",
              )}
            >
              <Search className="size-5" aria-hidden />
            </button>
            <div className="hidden xl:block">
              <Button
                href={quoteHref()}
                variant={solid ? "primary" : "accent"}
                size="md"
                magnetic
              >
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
                "flex size-11 items-center justify-center rounded-ums border transition-colors xl:hidden",
                solid
                  ? "border-line text-navy hover:border-navy"
                  : "border-white/40 text-white hover:border-white",
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
