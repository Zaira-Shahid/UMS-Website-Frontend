import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Slanted (parallelogram) controls for the Featured Projects section. The shape is a skewed wrapper and the text is
 * counter-skewed, so the label stays upright.
 */
const skew = "[transform:skewX(-18deg)]";
const unskew = "[transform:skewX(18deg)]";

const shape = "inline-flex items-center justify-center px-8 py-3 font-heading text-[0.9375rem] font-bold transition-colors";

/** Link button: `solid` is blue (Explore Project), `outline` is a blue-bordered white shape (View All Projects). */
export function SlantedButton({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        shape,
        skew,
        variant === "solid" ? "bg-blue text-white hover:bg-blue-600" : "border-2 border-blue bg-white text-navy hover:bg-blue hover:text-white",
        className,
      )}
    >
      <span className={unskew}>{children}</span>
    </Link>
  );
}

/** Sector tab: blue fill when active, plain text otherwise. Use inside `role="tablist"`. */
export function SlantedTab({
  active,
  children,
  className,
  ...rest
}: { active?: boolean; children: ReactNode } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(shape, skew, "px-7", active ? "bg-blue text-white" : "text-navy hover:text-blue", className)}
      {...rest}
    >
      <span className={unskew}>{children}</span>
    </button>
  );
}
