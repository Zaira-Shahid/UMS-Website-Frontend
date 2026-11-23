"use client";

import { usePathname } from "next/navigation";
import { CTABand } from "./CTABand";

/** Routes that render their own, more specific enquiry band. */
const OWN_CTA = (pathname: string) =>
  pathname === "/services" ||
  pathname.startsWith("/services/") ||
  pathname.startsWith("/projects/") || // case studies end with "Need similar work?"
  pathname === "/request-a-quote" || // these pages are the enquiry
  pathname === "/contact" ||
  pathname === "/careers";

/** The shared enquiry band above the footer — skipped where a page brings its own. */
export function FooterCTA() {
  const pathname = usePathname();
  if (OWN_CTA(pathname)) return null;
  return <CTABand />;
}
