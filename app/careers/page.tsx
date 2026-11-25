import type { Metadata } from "next";
import { CareersForm } from "@/components/forms/CareersForm";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { PageBanner } from "@/components/ui/PageBanner";
import { careers } from "@/content/careers";
import { site } from "@/content/site";
import { breadcrumbLd, jsonLd, ogImage, ogImages } from "@/lib/seo";

const description =
  "Careers at UMS — Ultimate Mechanical Solutions. Send your CV with a general application.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: { images: ogImages,
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Careers | ${site.name}`,
    description,
    url: "/careers",
  },
  twitter: { card: "summary_large_image", images: [ogImage.url], title: `Careers | ${site.name}`, description },
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
      <PageBanner
        title="Work with UMS"
        intro="Interested in building mechanical, electrical and plumbing systems with us? Send us your CV."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
      />

      <section aria-labelledby="positions-title" className="bg-white py-12 md:py-16">
        <div className="wrap">
          <CenterTitle id="positions-title" lead="Open" accent="Positions" />
          {careers.length === 0 ? (
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-navy">No open positions right now. Send us your CV using the form below and we will keep it on file.</p>
          ) : (
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {careers.map((c) => (
                <li key={c.slug} className="rounded-card border border-blue/70 bg-white p-5 shadow-card">
                  <h3 className="font-heading text-xl font-bold text-navy">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.department} · {c.location} · {c.type} · {c.experience}
                  </p>
                  <p className="mt-3 text-navy">{c.summary}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section aria-label="Application" className="bg-[#f2f7fb] py-12 md:py-16">
        <div className="wrap max-w-3xl">
          <CareersForm />
        </div>
      </section>
    </>
  );
}
