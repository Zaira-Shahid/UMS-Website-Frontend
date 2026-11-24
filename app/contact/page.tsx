import type { Metadata } from "next";
import { OfficeCard } from "@/components/contact/OfficeCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { offices } from "@/content/offices";
import { site } from "@/content/site";
import { breadcrumbLd, jsonLd } from "@/lib/seo";

const description =
  "Contact UMS — Ultimate Mechanical Solutions — at our Islamabad and Lahore offices, or send a general enquiry. For project pricing, use Request a Quote.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: `${site.name} — ${site.fullName}`,
    title: `Contact | ${site.name}`,
    description,
    url: "/contact",
  },
  twitter: { card: "summary_large_image", title: `Contact | ${site.name}`, description },
};

/** Minimal Phase 6 page: the form and both office cards. The full design follows in Phase 7. */
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        intro="Questions about our services or how we work? Send us a message, or visit one of our two offices."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section aria-label="Contact" className="bg-offwhite py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="space-y-5 lg:col-span-5">
            <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">Our offices</h2>
            {offices.map((o) => (
              <OfficeCard key={o.city} office={o} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
