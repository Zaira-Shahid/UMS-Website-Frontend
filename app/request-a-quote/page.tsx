import type { Metadata } from "next";
import { RfqAside } from "@/components/forms/RfqAside";
import { RfqForm } from "@/components/forms/RfqForm";
import { PageBanner } from "@/components/ui/PageBanner";
import { site } from "@/content/site";
import { resolveQuotePreselect } from "@/lib/forms/rfq";
import { breadcrumbLd, jsonLd } from "@/lib/seo";

const description =
  "Send UMS a tender or project brief in five short steps — HVAC, fire fighting, electrical and ELV, plumbing, pools and fountains, or the full integrated MEP package.";

export const metadata: Metadata = {
  title: "Request a Quote",
  description,
  alternates: { canonical: "/request-a-quote" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Request a Quote | ${site.name}`,
    description,
    url: "/request-a-quote",
  },
  twitter: { card: "summary_large_image", title: `Request a Quote | ${site.name}`, description },
};

type SearchParams = Promise<{
  service?: string | string[];
  project?: string | string[];
  sector?: string | string[];
}>;

/**
 * Query params are resolved on the server, so the form arrives pre-selected without a flash:
 *   ?service=hvac,fire-fighting   ?project=<case-study slug>   ?sector=<industry slug>
 * Invalid values are ignored.
 */
export default async function RequestQuotePage({ searchParams }: { searchParams: SearchParams }) {
  const preselect = resolveQuotePreselect(await searchParams);

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
            {/* key: a different preselection (new URL) remounts the form with fresh defaults */}
            <RfqForm
              key={`${preselect.services.join(",")}|${preselect.project?.slug ?? ""}|${preselect.sector ?? ""}`}
              preselect={preselect}
            />
          </div>
          <div className="lg:col-span-4">
            <RfqAside />
          </div>
        </div>
      </section>
    </>
  );
}
