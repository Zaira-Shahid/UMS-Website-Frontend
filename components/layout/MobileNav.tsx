"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mainNav, quoteHrefForPath } from "@/content/navigation";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ServiceRow } from "./MegaMenu";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile menu with accordions. Accessible dialog: focus moves in on open, Tab is
 * trapped, Esc closes, focus returns to the menu button, background scroll is locked.
 */
export function MobileNav({
  open,
  onClose,
  returnFocusRef,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
  onSearch: () => void;
}) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const returnTo = returnFocusRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus();
    };
  }, [open, onClose, returnFocusRef]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const t = reduce ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-white text-navy xl:hidden"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={t}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <Logo onClick={onClose} />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-ums border border-line text-navy hover:border-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 pb-6 pt-2 [scrollbar-width:thin]">
            <ul>
              {mainNav.map((item) => {
                const active = isActive(item.href) || (item.children?.some((c) => c.href !== "/" && isActive(c.href)) ?? false);
                const isOpen = expanded === item.label;
                const labelClass = cn(
                  "flex min-h-14 w-full items-center justify-between font-heading text-xl font-bold",
                  active ? "text-blue-700" : "text-navy",
                );
                return (
                  <li key={item.label} className="border-b border-line">
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`mobile-sub-${item.label}`}
                          onClick={() => setExpanded(isOpen ? null : item.label)}
                          className={labelClass}
                        >
                          {item.label}
                          <ChevronDown aria-hidden className={cn("size-5 text-blue-700 transition-transform", isOpen && "rotate-180")} />
                        </button>
                        <div id={`mobile-sub-${item.label}`} hidden={!isOpen} className="pb-4">
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="mb-1 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-blue-700"
                          >
                            {item.label === "Services" ? "Services overview" : "About overview"}
                            <ArrowUpRight aria-hidden className="size-4" />
                          </Link>
                          {item.label === "Services" ? (
                            <ul className="space-y-0.5">
                              {services.map((s) => (
                                <li key={s.slug}>
                                  <ServiceRow slug={s.slug} onNavigate={onClose} />
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <ul>
                              {item.children
                                .filter((c) => c.href !== item.href)
                                .map((c) => (
                                  <li key={c.href}>
                                    <Link href={c.href} onClick={onClose} className="block min-h-11 rounded-xl px-2.5 py-2.5 hover:bg-offwhite">
                                      <span className="block font-semibold text-navy">{c.label}</span>
                                      {c.description && <span className="block text-sm text-muted">{c.description}</span>}
                                    </Link>
                                  </li>
                                ))}
                            </ul>
                          )}
                        </div>
                      </>
                    ) : (
                      <Link href={item.href} onClick={onClose} aria-current={active ? "page" : undefined} className={labelClass}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 space-y-3 border-t border-line bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={onSearch}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-ums text-[0.9375rem] font-semibold text-navy hover:text-blue-700"
            >
              <Search aria-hidden className="size-5" />
              Search the site
            </button>
            <Button href="/contact" onClick={onClose} variant="outline" size="lg" block>
              Contact us
            </Button>
            <Button href={quoteHrefForPath(pathname)} onClick={onClose} variant="primary" size="lg" arrow block>
              Request a Quote
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
