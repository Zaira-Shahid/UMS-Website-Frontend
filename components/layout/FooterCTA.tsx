"use client";

import { usePathname } from "next/navigation";
import { CTABand } from "./CTABand";

/** Routes that render their own, more specific enquiry band. */
const OWN_CTA = (pathname: string) =>
  pathname === "/services" ||
  pathname.startsWith("/services/") ||
  pathname === "/request-a-quote" || // these pages are the enquiry
  pathname === "/contact";

/** The shared enquiry band above the footer — skipped where a page brings its own. */
export function FooterCTA() {
  const pathname = usePathname();
  if (OWN_CTA(pathname)) return null;
  return <CTABand />;
}
