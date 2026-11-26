import type { Metadata } from "next";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { ServicesIntro } from "@/components/services/ServicesIntro";
import { Button } from "@/components/ui/Button";
import { CenterTitle } from "@/components/ui/CenterTitle";
import { quoteHref } from "@/content/navigation";
import { contact, site, type OfficeConfig } from "@/content/site";
import { breadcrumbLd, jsonLd, ogImage, ogImages } from "@/lib/seo";

const description =
  "Contact UMS — Ultimate Mechanical Solutions — with offices in Islamabad and Lahore. Send a general enquiry, or use Request a Quote for project pricing.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { images: ogImages, type: "website", siteName: `${site.name} — ${site.fullName}`, title: `Contact | ${site.name}`, description, url: "/contact" },
  twitter: { card: "summary_large_image", images: [ogImage.url], title: `Contact | ${site.name}`, description },
};

const tel = (v: string) => `tel:${v.replace(/[^\d+]/g, "")}`;
const wa = (v: string) => `https://wa.me/${v.replace(/\D/g, "")}`;

type Row = { Icon: LucideIcon; text: string; href: string };
const isRow = (r: Row | "" | undefined): r is Row => !!r;

/** One office: the city, then only the lines that are filled in content/site.ts. */
function Office({ o }: { o: OfficeConfig }) {
  const rows = [
    o.address && { Icon: MapPin, text: o.address, href: "" },
    o.phone && { Icon: Phone, text: o.phone, href: tel(o.phone) },
    o.email && { Icon: Mail, text: o.email, href: `mailto:${o.email}` },
    o.email2 && { Icon: Mail, text: o.email2, href: `mailto:${o.email2}` },
  ].filter(isRow);
  return (
    <address className="not-italic">
      <h3 className="flex items-center gap-3 text-[1.5rem] font-bold text-navy">
        <span aria-hidden className="h-7 w-1 rounded bg-blue" />
        {o.city} Office
      </h3>
      <ul className="mt-3 space-y-2 text-base text-navy">
        {rows.map(({ Icon, text, href }) => (
          <li key={text} className="flex items-start gap-3">
            <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-blue-700" />
            {href ? (
              <a href={href} className="break-words hover:text-blue-700">
                {text}
              </a>
            ) : (
              <span>{text}</span>
            )}
          </li>
        ))}
        {o.hours && <li className="pl-8 text-muted">{o.hours}</li>}
        {o.mapUrl && (
          <li className="pl-8">
            <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 font-heading font-bold text-blue-700">
              Get Directions
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        )}
      </ul>
    </address>
  );
}

export default function ContactPage() {
  const general = [
    contact.phone && { Icon: Phone, text: contact.phone, href: tel(contact.phone) },
    contact.whatsapp && { Icon: MessageCircle, text: `WhatsApp ${contact.whatsapp}`, href: wa(contact.whatsapp) },
    contact.email.general && { Icon: Mail, text: contact.email.general, href: `mailto:${contact.email.general}` },
  ].filter(isRow);
  const mapOffices = contact.offices.filter((o) => o.mapUrl);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])) }}
      />
      <div className="bg-white pb-12 pt-[calc(var(--header-h)+1.5rem)] md:pb-16">
        <div className="wrap">
          <ServicesIntro />
          <div className="mt-6">
            <CenterTitle as="h1" lead="Contact Us" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <section aria-labelledby="offices-title">
              <h2 id="offices-title" className="text-[1.75rem] font-extrabold text-navy md:text-[2.25rem]">
                Our Offices
              </h2>
              <span aria-hidden className="mt-2 block h-1 w-[4.5rem] rounded bg-blue" />
              <div className="mt-6 space-y-7">
                {contact.offices.map((o, i) => (
                  <div key={o.city} className={i > 0 ? "border-t border-border pt-7" : undefined}>
                    <Office o={o} />
                  </div>
                ))}
                {general.length > 0 && (
                  <ul className="space-y-2 border-t border-border pt-7 text-base text-navy">
                    {general.map(({ Icon, text, href }) => (
                      <li key={text} className="flex items-center gap-3">
                        <Icon aria-hidden className="size-5 shrink-0 text-blue-700" />
                        <a href={href} className="break-words hover:text-blue-700" {...(href.startsWith("https://wa.me") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="mt-8 text-base text-navy">For project pricing, send the brief through Request a Quote and the tender team will pick it up.</p>
              <Button href={quoteHref()} variant="outline" className="mt-4">
                Request a Quote
              </Button>
            </section>

            <section aria-labelledby="form-title">
              <h2 id="form-title" className="text-[1.75rem] font-extrabold text-navy md:text-[2.25rem]">
                Share Your Requirements
              </h2>
              <span aria-hidden className="mt-2 block h-1 w-[4.5rem] rounded bg-blue" />
              <div className="mt-6">
                <ContactForm />
              </div>
            </section>
          </div>

          {mapOffices.length > 0 && (
            <section aria-labelledby="find-title" className="mt-14">
              <CenterTitle id="find-title" lead="Find Our Offices" />
              <ul className="mt-6 flex flex-wrap justify-center gap-4">
                {mapOffices.map((o) => (
                  <li key={o.city}>
                    <Button href={o.mapUrl} variant="outline" size="lg">
                      {o.city} Office on the map
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
