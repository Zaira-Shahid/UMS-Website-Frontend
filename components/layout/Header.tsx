"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, FileText, Menu, Search } from "@/components/ui/lucide";
import { Button } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { mainNav, quoteHrefForPath } from "@/content/navigation";
import { whenInteracted } from "@/lib/hydration-gate";
import { contact } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { AboutPanel, ServicesPanel } from "./MegaMenu";

/** Lazy: the palette and its Fuse index load only when first opened. */
const SearchPalette = dynamic(() => import("@/components/search/SearchPalette"), { ssr: false });

/** The full-screen menu is only needed once it has been opened, so its code is loaded on demand (and fetched in advance when the page is idle). */
const MobileNav = dynamic(() => import("./MobileNav").then((m) => m.MobileNav), { ssr: false });

/** WhatsApp button. Until a number is set in content/site.ts it links to /contact, so no number is ever invented. */
const whatsappHref = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` : "/contact";

function WhatsappButton({ className }: { className?: string }) {
  const external = whatsappHref.startsWith("https://");
  return (
    <a
      href={whatsappHref}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="Chat on WhatsApp"
      className={cn("flex size-11 shrink-0 items-center justify-center rounded-full bg-[#dcf8e8] text-[#25d366] transition-colors hover:bg-[#c6f2d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]", className)}
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}

/**
 * Site header (PROJECT_SPEC.md 4.1): white, sticky, with a soft shadow. The active item is blue with a thick rounded
 * underline. Services and About open the light dropdown panels on hover (with intent delay), click and keyboard;
 * Esc and an outside click close them.
 */
export function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const focusFirst = useRef(false);
  const navRef = useRef<HTMLElement>(null);

  // Fetch the full-screen menu's code in advance (first scroll or tap, or a few seconds after load), so the first tap is instant.
  useEffect(() => {
    whenInteracted().then(() => import("./MobileNav"));
  }, []);

  // A new page starts with every menu closed.
  useEffect(() => {
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

  // Ctrl+K / Cmd+K
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
    const id = requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>(`#menu-${openMenu} ul a[href]`)?.focus());
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

  // Esc closes an open dropdown wherever focus is, and returns focus to its trigger.
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

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const itemActive = (item: (typeof mainNav)[number]) =>
    isActive(item.href) || (item.children?.some((c) => c.href !== "/" && isActive(c.href)) ?? false);

  const quoteLink = quoteHrefForPath(pathname);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_2px_16px_-6px_rgb(15_42_74/0.2)]">
        <div className="wrap flex h-16 items-center justify-between gap-4 xl:h-[var(--header-h)] 2xl:gap-6">
          <Logo />

          <nav ref={navRef} aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-3 min-[1400px]:gap-6 2xl:gap-8">
              {mainNav.map((item) => {
                const hasMenu = Boolean(item.children);
                const open = openMenu === item.label;
                const active = itemActive(item);
                const itemClass = cn(
                  "relative inline-flex items-center gap-1 py-2 text-[1.0625rem] transition-colors min-[1400px]:text-[1.125rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue",
                  active || open ? "font-semibold text-blue-700" : "font-medium text-navy hover:text-blue-700",
                );
                const underline = active ? (
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-1 h-1 rounded-full bg-blue" />
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
                      // The label is a link to the section page; the chevron is a separate button that toggles the dropdown.
                      <div className="flex items-center gap-0.5">
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={closeMenus}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowDown") {
                              e.preventDefault();
                              clearTimeout(hoverTimer.current);
                              focusFirst.current = true;
                              setOpenMenu(item.label);
                            }
                          }}
                          className={itemClass}
                        >
                          {item.label}
                          {underline}
                        </Link>
                        <button
                          type="button"
                          aria-label={`${item.label} menu`}
                          aria-expanded={open}
                          aria-controls={`menu-${item.label}`}
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
                          className={cn(
                            "flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
                            active || open ? "text-blue-700" : "text-navy hover:text-blue-700",
                          )}
                        >
                          <ChevronDown aria-hidden className={cn("size-4 transition-transform", open && "rotate-180")} />
                        </button>
                      </div>
                    ) : (
                      <Link href={item.href} aria-current={active ? "page" : undefined} onClick={closeMenus} className={itemClass}>
                        {item.label}
                        {underline}
                      </Link>
                    )}

                    {hasMenu && open && (
                        // The top padding is a hover bridge: the pointer never leaves the <li> on its way to the panel.
                        <div id={`menu-${item.label}`} className="animate-menu-in absolute left-0 top-full z-10 pt-5">
                          {item.label === "Services" ? (
                            <ServicesPanel onNavigate={closeMenus} />
                          ) : (
                            <AboutPanel links={item.children ?? []} onNavigate={closeMenus} />
                          )}
                        </div>
                      )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 xl:flex">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search (Ctrl+K)"
              aria-keyshortcuts="Control+K Meta+K"
              className="flex size-11 items-center justify-center rounded-full bg-[#e4f2fb] text-navy transition-colors hover:bg-[#d2eaf8]"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <WhatsappButton />
            <Button href={quoteLink} variant="navy" className="rounded-full pl-4 pr-5 xl:px-4 min-[1400px]:pl-4 min-[1400px]:pr-5">
              <FileText aria-hidden className="size-5 text-blue" />
              Request a Quote
            </Button>
          </div>

          {/* Mobile and tablet actions */}
          <div className="flex items-center gap-1.5 min-[420px]:gap-2 xl:hidden">
            <Button href={quoteLink} variant="navy" size="sm" className="rounded-full pl-3 pr-3.5 max-[419px]:text-[0.8125rem] min-[420px]:pr-4">
              <FileText aria-hidden className="size-4 text-blue max-[399px]:hidden" />
              Get a Quote
            </Button>
            <WhatsappButton className="size-10 max-[419px]:size-9" />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => {
                setMobileMounted(true);
                setMobileOpen(true);
              }}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center text-navy min-[420px]:size-11"
            >
              <Menu className="size-7" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {mobileMounted && (
        <MobileNav
          open={mobileOpen}
          onClose={closeMobile}
          returnFocusRef={menuButtonRef}
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
