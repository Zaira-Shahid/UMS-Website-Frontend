import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Uses the client logo when supplied (content/site.ts → logo); until then a
 * typographic wordmark stands in. TODO: client to supply /public/brand/ums-logo.svg
 */
export function Logo({
  tone = "dark",
  className,
  onClick,
}: {
  tone?: "dark" | "light";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — ${site.fullName}, home`}
      className={cn("inline-flex items-center gap-3", className)}
    >
      {site.logo ? (
        <Image src={site.logo} alt="" width={120} height={40} priority className="h-9 w-auto" />
      ) : (
        <>
          <span
            className={cn(
              "font-heading text-[2rem] font-extrabold leading-none tracking-tight transition-colors",
              tone === "light" ? "text-white" : "text-navy",
            )}
          >
            UMS
          </span>
          <span
            aria-hidden
            className={cn(
              "hidden h-7 w-px sm:block",
              tone === "light" ? "bg-white/30" : "bg-line",
            )}
          />
          <span
            aria-hidden
            className={cn(
              "hidden max-w-[7.5rem] font-heading text-[0.625rem] font-semibold uppercase leading-[1.25] tracking-[0.18em] transition-colors sm:block",
              tone === "light" ? "text-white/80" : "text-muted",
            )}
          >
            Ultimate Mechanical Solutions
          </span>
        </>
      )}
    </Link>
  );
}
