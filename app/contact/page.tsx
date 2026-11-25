import type { Metadata } from "next";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { quoteHref } from "@/content/navigation";
import { site } from "@/content/site";
import { breadcrumbLd, jsonLd } from "@/lib/seo";

const description =
  "Contact UMS — Ultimate Mechanical Solutions — with offices in Islamabad and Lahore. Send a general enquiry, or use Request a Quote for project pricing.";

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
        intro="Questions about our services or how we work? Send us a message."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section aria-label="Contact" className="bg-offwhite py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <div className="lg:col-span-5 lg:pl-6">
            <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">
              Offices in Islamabad &amp; Lahore
            </h2>
            <p className="mt-3 text-muted">
              For project pricing, send the brief through Request a Quote and the tender team will pick it up.
            </p>
            <div className="mt-6">
              <Button href={quoteHref()} variant="primary" arrow>
                Request a Quote
              </Button>
            </div>
            <ContactDetails className="mt-10" />
          </div>
        </div>
      </section>
    </>
  );
}
