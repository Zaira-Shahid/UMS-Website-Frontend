import type { Metadata } from "next";
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

/** BreadcrumbList structured data. Every item needs a site-relative `path`, including the current page. */
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

/** Default social-sharing image (app/opengraph-image.tsx). Pages that set their own openGraph must repeat it. */
export const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.fullName}` };
export const ogImages = [ogImage];

/** Unique title, description, canonical, Open Graph and Twitter metadata for a page. */
export const pageMetadata = ({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata => ({
  title,
  description,
  alternates: { canonical: path },
  ...(noindex ? { robots: { index: false, follow: true } } : {}),
  openGraph: { images: ogImages,
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `${title} | ${site.name}`,
    description,
    url: path,
  },
  twitter: { card: "summary_large_image", images: [ogImage.url], title: `${title} | ${site.name}`, description },
});
