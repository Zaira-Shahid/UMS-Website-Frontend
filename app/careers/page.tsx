import type { Metadata } from "next";
import { CareersForm } from "@/components/forms/CareersForm";
import { PageHero } from "@/components/layout/PageHero";
import { careers } from "@/content/careers";
import { site } from "@/content/site";
import { breadcrumbLd, jsonLd } from "@/lib/seo";

const description =
  "Careers at UMS — Ultimate Mechanical Solutions. Send your CV with a general application.";

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
        intro="Interested in building mechanical, electrical and plumbing systems with us? Send us your CV."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section aria-labelledby="positions-title" className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 id="positions-title" className="text-navy">
            Open positions
          </h2>
          {careers.length === 0 ? (
            <p className="mt-4 max-w-2xl text-lg text-ink">
              No open positions right now — send us your CV using the form below and we will keep it on file.
            </p>
          ) : (
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {careers.map((c) => (
                <li key={c.slug} className="py-5">
                  <h3 className="font-heading text-lg font-semibold uppercase text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.department} · {c.location} · {c.type} · {c.experience}
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
