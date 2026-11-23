import { site } from "@/content/site";

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

/**
 * Serialise structured data for a <script type="application/ld+json"> tag.
 * "<" is escaped so content can never close the script element early.
 */
export const jsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const organizationRef = {
  "@type": "Organization",
  name: site.fullName,
  url: site.url,
} as const;
