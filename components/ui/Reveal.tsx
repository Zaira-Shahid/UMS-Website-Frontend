"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

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
  as?: "div" | "section" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) return <Tag className={className}>{children}</Tag>;

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
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
