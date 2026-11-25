"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-ums font-heading font-semibold uppercase tracking-[0.08em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-blue",
        accent: "bg-blue text-white hover:bg-navy",
        fire: "bg-fire text-white hover:bg-navy",
        outline:
          "border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-white",
        "outline-light":
          "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy",
        ghost: "text-navy hover:text-blue",
      },
      size: {
        sm: "h-10 px-4 text-[0.8125rem]",
        md: "h-12 px-6 text-sm",
        lg: "h-14 px-8 text-[0.9375rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBase = VariantProps<typeof buttonStyles> & {
  children: ReactNode;
  className?: string;
  /** Subtle magnetic pull toward the cursor. Disabled for reduced motion. */
  magnetic?: boolean;
  /** Trailing arrow icon. */
  arrow?: boolean;
  /** Stretch to the full width of the container. */
  block?: boolean;
};

type AsLink = ButtonBase & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">;
type AsButton = ButtonBase & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

export type ButtonProps = AsLink | AsButton;

export function Button(props: ButtonProps) {
  const { variant, size, className, magnetic, arrow, block, children, ...rest } = props;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const canMagnet = magnetic && !reduce;

  const onMove = (e: React.PointerEvent) => {
    if (!canMagnet || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );
  const classes = cn(buttonStyles({ variant, size }), block && "w-full", className);

  return (
    <motion.span
      ref={ref}
      style={canMagnet ? { x, y } : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={block ? "flex w-full" : "inline-flex"}
    >
      {"href" in rest && rest.href !== undefined ? (
        <Link {...(rest as ComponentProps<typeof Link>)} className={classes}>
          {inner}
        </Link>
      ) : (
        <button type="button" {...(rest as ComponentProps<"button">)} className={classes}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}
