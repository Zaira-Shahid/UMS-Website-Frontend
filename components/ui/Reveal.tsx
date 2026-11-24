"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion/use-reduced-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Fade + 24px rise, once, on entering the viewport (§3.4).
 * Use `stagger` on a parent and `<Reveal.Item>` on children for 0.06s stagger.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  stagger = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  as?: "div" | "section" | "li" | "article" | "ul" | "ol";
}) {
  const reduce = usePrefersReducedMotion();
  const Tag = motion[as];

  // `usePrefersReducedMotion` reports "no preference" during server render and hydration, so the
  // first client render matches the server HTML; the switch to a plain element happens right after
  // hydration. (Motion's own hook reads the preference immediately, which leaves the server-rendered
  // `opacity: 0` style on the element: React does not patch mismatched attributes when hydrating.)
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={stagger ? container : item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Child of `<Reveal stagger>`; picks up the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Use "li" when the parent is a list, so the markup stays valid. */
  as?: "div" | "li";
}) {
  const reduce = usePrefersReducedMotion();
  const Tag = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
