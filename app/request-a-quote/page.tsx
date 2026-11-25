import type { Metadata } from "next";
import { Suspense } from "react";
import { RfqAside } from "@/components/forms/RfqAside";
import { RfqFromUrl } from "@/components/forms/RfqFromUrl";
import { PageBanner } from "@/components/ui/PageBanner";
import { site } from "@/content/site";
import { breadcrumbLd, jsonLd, ogImage, ogImages } from "@/lib/seo";

const description =
  "Send UMS a tender or project brief in five short steps — HVAC, fire fighting, electrical and ELV, plumbing, pools and fountains, or the full integrated MEP package.";

export const metadata: Metadata = {
  title: "Request a Quote",
  description,
  alternates: { canonical: "/request-a-quote" },
  openGraph: { images: ogImages,
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Request a Quote | ${site.name}`,
    description,
    url: "/request-a-quote",
  },
  twitter: { card: "summary_large_image", images: [ogImage.url], title: `Request a Quote | ${site.name}`, description },
};

/** Static page: the URL parameters (?service, ?project, ?sector) are read in the browser by RfqFromUrl. */
export default function RequestQuotePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Request a Quote", path: "/request-a-quote" },
            ]),
          ),
        }}
      />
      <PageBanner
        title="Request a Quote"
        intro="Five short steps. Send a full brief or just an outline, and we will tell you what we need to price it."
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />

      <section aria-label="Quote request" className="bg-[#f2f7fb] py-12 md:py-16">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="min-h-[40rem]" aria-hidden />}>
              <RfqFromUrl />
            </Suspense>
          </div>
          <div className="lg:col-span-4">
            <RfqAside />
          </div>
        </div>
      </section>
    </>
  );
}
