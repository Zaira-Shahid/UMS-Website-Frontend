"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { mainNav, quoteHref } from "@/content/navigation";
import { offices } from "@/content/offices";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen mobile menu. Accessible dialog: focus moves in on open, Tab is
 * trapped, Esc closes, focus returns to the menu button, background scroll is locked.
 */
export function MobileNav({
  open,
  onClose,
  returnFocusRef,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const callable = offices.filter((o) => o.phone);

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
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
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

  const t = reduce ? { duration: 0 } : { duration: 0.45, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-navy-900 text-white xl:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={t}
        >
          <BlueprintGrid variant="dark" />

          <div className="relative flex h-16 shrink-0 items-center justify-between px-5">
            <Logo tone="light" onClick={onClose} />
            <button
              type="button"
              data-autofocus
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-ums border border-white/25 hover:border-white"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Main" className="relative flex-1 overflow-y-auto px-5 pb-6 pt-4">
            <ul>
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.label}
                  className="border-b border-white/10"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { delay: 0.12 + i * 0.04, duration: 0.4 }}
                >
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        aria-controls={`mobile-sub-${item.label}`}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="flex min-h-14 w-full items-center justify-between font-heading text-2xl font-semibold uppercase tracking-[0.04em]"
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-5 text-cyan-300 transition-transform",
                            expanded === item.label && "rotate-180",
                          )}
                        />
                      </button>
                      <div
                        id={`mobile-sub-${item.label}`}
                        hidden={expanded !== item.label}
                        className="pb-3"
                      >
                        <ul className="border-l border-cyan/40 pl-4">
                          <li>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="block min-h-11 py-2.5 text-white/90"
                            >
                              {item.label === "Services" ? "All services" : "Overview"}
                            </Link>
                          </li>
                          {item.children
                            .filter((c) => c.href !== item.href)
                            .map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={onClose}
                                  className="block min-h-11 py-2.5 text-white/75 hover:text-cyan-300"
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex min-h-14 items-center font-heading text-2xl font-semibold uppercase tracking-[0.04em]"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="relative shrink-0 border-t border-white/10 bg-navy-900 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {callable.length > 0 && (
              <div className="mb-3 grid grid-cols-2 gap-3">
                {callable.map((o) => (
                  <a
                    key={o.city}
                    href={`tel:${o.phone!.replace(/\s/g, "")}`}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-ums border border-white/25 text-sm hover:border-white"
                  >
                    <Phone className="size-4" aria-hidden /> {o.city}
                  </a>
                ))}
              </div>
            )}
            <Button
              href={quoteHref()}
              onClick={onClose}
              variant="accent"
              size="lg"
              arrow
              block
            >
              Request a Quote
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
