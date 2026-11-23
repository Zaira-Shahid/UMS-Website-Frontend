import type { Metadata } from "next";
import { CareersForm } from "@/components/forms/CareersForm";
import { PageHero } from "@/components/layout/PageHero";
import { Badge } from "@/components/ui/Badge";
import { careers } from "@/content/careers";
import { site } from "@/content/site";
import { breadcrumbLd, jsonLd } from "@/lib/seo";

const description =
  "Careers at UMS — Ultimate Mechanical Solutions. See open positions and apply with your CV, or send a general application.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Careers | ${site.name}`,
    description,
    url: "/careers",
  },
  twitter: { card: "summary_large_image", title: `Careers | ${site.name}`, description },
};

/** Minimal Phase 6 page: open positions and the application form. The full design follows in Phase 7. */
export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Careers", path: "/careers" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Careers"
        title="Work with UMS"
        intro="Interested in building mechanical, electrical and plumbing systems with us? Apply below."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section aria-labelledby="positions-title" className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="positions-title" className="text-navy">
            Open positions
          </h2>
          {careers.length === 0 ? (
            // No openings are published until UMS supplies them (content/careers.ts).
            <div className="mt-6 max-w-2xl border border-dashed border-line bg-offwhite p-6">
              <Badge tone="outline">No openings right now</Badge>
              <p className="mt-3 text-ink">
                There are no open positions at the moment. Send us your CV using the form below and we
                will keep it on file.
              </p>
            </div>
          ) : (
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {careers.map((c) => (
                <li key={c.slug} className="border border-line p-5">
                  <h3 className="font-heading text-lg font-semibold uppercase text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.department} · {c.location}
                  </p>
                  <p className="mt-3 text-ink">{c.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-label="Application" className="bg-offwhite py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <CareersForm />
        </div>
      </section>
    </>
  );
}
