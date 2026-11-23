import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { industries } from "@/content/industries";
import { offices } from "@/content/offices";
import { quoteHref } from "@/content/navigation";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { FooterCTA } from "./FooterCTA";
import { Logo } from "./Logo";

const company = [
  { label: "About UMS", href: "/about" },
  { label: "Mission & Values", href: "/about/mission-values" },
  { label: "Team & Organization", href: "/about/team" },
  { label: "Quality, Safety & Delivery", href: "/quality-safety-delivery" },
  { label: "Credentials", href: "/about/credentials" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Request a Quote", href: quoteHref() },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const socials = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
].filter((s): s is { label: string; href: string } => Boolean(s.href));

const linkClass =
  "inline-block py-1 text-[0.9375rem] text-white/70 transition-colors hover:text-cyan-300";

function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
        {title}
      </h3>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <>
      <FooterCTA />
      <footer className="relative isolate overflow-hidden bg-navy-900 text-white">
        <BlueprintGrid variant="dark" />
        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo tone="light" />
              <p className="mt-6 max-w-sm text-[0.9375rem] text-white/70">
                MEP contracting for complex buildings — HVAC, fire fighting, electrical and
                ELV, plumbing, and pools and fountains, from Islamabad and Lahore.
              </p>
              {socials.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Social links">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-8">
              <Column title="Company" links={company} />
              <Column
                title="Services"
                links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}` }))}
              />
              <Column
                title="Industries"
                links={industries.map((i) => ({
                  label: i.name,
                  href: `/industries#${i.slug}`,
                }))}
              />
              <Column title="Resources" links={resources} />
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-2">
            {offices.map((o) => (
              <address
                key={o.city}
                className="border border-white/10 p-5 not-italic"
                aria-label={`${o.city} office`}
              >
                <p className="font-heading text-lg font-semibold uppercase tracking-[0.08em]">
                  {o.city} office
                </p>
                <dl className="mt-3 space-y-1.5 text-[0.9375rem] text-white/70">
                  <ContactRow label="Address" value={o.address} />
                  <ContactRow
                    label="Phone"
                    value={o.phone}
                    href={o.phone ? `tel:${o.phone.replace(/\s/g, "")}` : undefined}
                  />
                  <ContactRow
                    label="Email"
                    value={o.email}
                    href={o.email ? `mailto:${o.email}` : undefined}
                  />
                </dl>
                {o.mapUrl && (
                  <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-3`}>
                    View on map
                  </a>
                )}
              </address>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.fullName}. All rights reserved.
            </p>
            <Link href="/privacy-policy" className="hover:text-cyan-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function ContactRow({ label, value, href }: { label: string; value?: string; href?: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3">
      <dt className="w-16 shrink-0 text-xs uppercase tracking-[0.12em] text-white/45">
        {label}
      </dt>
      <dd>
        {value ? (
          href ? (
            <a href={href} className="hover:text-cyan-300">
              {value}
            </a>
          ) : (
            value
          )
        ) : (
          // TODO: client to confirm — see content/offices.ts
          <Badge tone="pending">To be confirmed</Badge>
        )}
      </dd>
    </div>
  );
}
