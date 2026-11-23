import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-200";

/** Compact label or filter chip. Renders a link when `href` is given. */
export function Chip({
  children,
  href,
  active,
  className,
}: {
  children: ReactNode;
  href?: string;
  active?: boolean;
  className?: string;
}) {
  const styles = cn(
    base,
    active
      ? "border-navy bg-navy text-white"
      : "border-line bg-white text-ink hover:border-cyan hover:text-cyan",
    className,
  );
  return href ? (
    <Link href={href} className={styles} aria-current={active ? "true" : undefined}>
      {children}
    </Link>
  ) : (
    <span className={styles}>{children}</span>
  );
}
