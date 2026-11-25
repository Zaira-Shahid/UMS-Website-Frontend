import Link from "next/link";
import { ContactDetails } from "@/components/contact/ContactDetails";
import { Button } from "@/components/ui/Button";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { services } from "@/content/services";
import { contact, site } from "@/content/site";
import { disciplineColor } from "@/lib/discipline";
import { BackToTop } from "./BackToTop";
import { FooterCTA } from "./FooterCTA";
import { Logo } from "./Logo";

const company = [
  { label: "About UMS", href: "/about" },
  { label: "Mission & Values", href: "/about/mission-values" },
  { label: "Quality, Safety & Delivery", href: "/quality-safety-delivery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "Projects", href: "/projects" },
  { label: "Request a Quote", href: quoteHref() },
  { label: "Search", href: "/search" },
];

/** Social profiles appear only once a real URL is configured in content/site.ts. */
const socials = [
  { label: "LinkedIn", href: contact.social.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: contact.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: contact.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: contact.social.youtube, Icon: YoutubeIcon },
].filter((s) => !!s.href);

const linkClass = "inline-block py-1 text-[0.9375rem] text-white/70 transition-colors hover:text-cyan-300";

function Column({ title, links }: { title: string; links: { label: string; href: string; color?: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="mono-label text-cyan-300">{title}</h3>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className={`${linkClass} inline-flex items-center gap-2`}>
              {l.color && <span aria-hidden className="size-1.5 shrink-0 rounded-full" style={{ background: l.color }} />}
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
      <footer className="bg-navy-950 text-white">
        <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo tone="light" />
              <p className="mt-6 max-w-sm text-[0.9375rem] text-white/70">
                MEP contracting for complex buildings. Offices in Islamabad &amp; Lahore.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/contact" variant="outline-light" size="sm">
                  Contact us
                </Button>
                <Button href={quoteHref()} variant="accent" size="sm">
                  Request a Quote
                </Button>
              </div>
              <ContactDetails tone="dark" className="mt-8" />
              {socials.length > 0 && (
                <ul className="mt-6 flex gap-4" aria-label="Social links">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="text-white/70 transition-colors hover:text-cyan-300"
                      >
                        <Icon className="size-5" />
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
                links={services.map((s) => ({ label: s.name, href: `/services/${s.slug}`, color: disciplineColor[s.slug] }))}
              />
              <Column
                title="Industries"
                links={industries.map((i) => ({ label: i.name, href: `/industries#${i.slug}` }))}
              />
              <Column title="Resources" links={resources} />
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {site.fullName}. All rights reserved.
            </p>
            <BackToTop />
          </div>
        </div>
      </footer>
    </>
  );
}
