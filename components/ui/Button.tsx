import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Buttons (PROJECT_SPEC.md 3.3).
 * primary      solid blue, white bold text, 10px radius
 * navy         dark navy (header pill)
 * outline      2px navy border, for light backgrounds
 * outline-light  2px white border, for dark backgrounds
 * outline-cyan   2px cyan border, for the footer
 * fire         solid red (Fire Fighting only)
 */
const buttonStyles = cva(
  "group inline-flex items-center justify-center gap-2 rounded-ums border-2 border-transparent font-heading font-bold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue text-white hover:bg-blue-600",
        navy: "bg-navy text-white hover:bg-navy-800",
        fire: "bg-fire text-white hover:bg-navy",
        outline: "border-navy text-navy hover:bg-navy hover:text-white",
        "outline-light": "border-white/85 text-white hover:bg-white hover:text-navy",
        "outline-cyan": "border-cyan text-white hover:bg-cyan hover:text-navy-950",
        ghost: "text-navy hover:text-blue",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonBase = VariantProps<typeof buttonStyles> & {
  children: ReactNode;
  className?: string;
  /** Trailing arrow icon. */
  arrow?: boolean;
  /** Stretch to the full width of the container. */
  block?: boolean;
};

type AsLink = ButtonBase & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">;
type AsButton = ButtonBase & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsButton;

export function Button(props: ButtonProps) {
  const { variant, size, className, arrow, block, children, ...rest } = props;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight aria-hidden className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </>
  );
  const classes = cn(buttonStyles({ variant, size }), block && "w-full", className);

  return "href" in rest && rest.href !== undefined ? (
    <Link {...(rest as ComponentProps<typeof Link>)} className={classes}>
      {inner}
    </Link>
  ) : (
    <button type="button" {...(rest as ComponentProps<"button">)} className={classes}>
      {inner}
    </button>
  );
}
