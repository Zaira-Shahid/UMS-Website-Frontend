import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/ui/SocialIcons";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { emails } from "@/content/dummy";
import { industries } from "@/content/industries";
import { quoteHref } from "@/content/navigation";
import { offices } from "@/content/offices";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { disciplineColor } from "@/lib/discipline";
import { BackToTop } from "./BackToTop";
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
  { label: "Request a Quote", href: quoteHref() },
  { label: "Search", href: "/search" },
];

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: site.social.youtube, Icon: YoutubeIcon },
];

const linkClass = "inline-block py-1 text-[0.9375rem] text-white/70 transition-colors hover:text-cyan-300";

function Column({ title, links }: { title: string; links: { label: string; href: string; color?: string }[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="mono-label text-cyan-300">{title}</h3>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className={`${linkClass} group inline-flex items-center gap-2`}>
              {l.color && <span aria-hidden className="size-1.5 shrink-0" style={{ background: l.color }} />}
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Pipe network running behind the footer columns (decorative). */
function PipeNetwork() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-25" preserveAspectRatio="none" viewBox="0 0 1200 600">
      <g fill="none" strokeWidth="2" strokeLinejoin="round">
        <path d="M0 140 H260 Q300 140 300 180 V420 Q300 460 340 460 H760 Q800 460 800 420 V260 Q800 220 840 220 H1200" stroke="var(--cyan)" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
        <path d="M0 140 H260 Q300 140 300 180 V420 Q300 460 340 460 H760 Q800 460 800 420 V260 Q800 220 840 220 H1200" stroke="var(--cyan-300)" className="pipe-fluid" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <>
      <FooterCTA />
      <footer className="bg-grain relative isolate overflow-hidden bg-navy-950 text-white">
        <PipeNetwork />
        <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo tone="light" />
              <p className="mt-6 max-w-sm text-[0.9375rem] text-white/70">
                MEP contracting for complex buildings: HVAC, fire fighting, electrical and ELV, plumbing, and pools and
                fountains, from Islamabad and Lahore.
              </p>
              <ul className="mt-6 flex gap-2" aria-label="Social links">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (opens in a new tab)`}
                      className="flex size-11 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-cyan-300 hover:text-cyan-300"
                    >
                      <Icon className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
              <NewsletterForm className="mt-8 max-w-sm" />
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

          <div className="mt-14 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-2">
            {offices.map((o) => (
              <address key={o.city} className="border border-white/10 p-5 not-italic" aria-label={`${o.city} office`}>
                <p className="flex items-baseline justify-between gap-3">
                  <span className="font-heading text-lg font-semibold uppercase tracking-[0.08em]">{o.city}</span>
                  <span className="mono-label text-white/50">{o.label}</span>
                </p>
                <ul className="mt-3 space-y-2 text-[0.9375rem] text-white/70">
                  <li className="flex gap-3">
                    <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-cyan-300" />
                    <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                      {o.address}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Phone aria-hidden className="mt-1 size-4 shrink-0 text-cyan-300" />
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="hover:text-cyan-300">
                      {o.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail aria-hidden className="mt-1 size-4 shrink-0 text-cyan-300" />
                    <a href={`mailto:${o.email}`} className="hover:text-cyan-300">
                      {o.email}
                    </a>
                  </li>
                  <li className="mono-label pl-7 text-white/50">{o.hours}</li>
                </ul>
              </address>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60">
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-cyan-300"
            >
              <MessageCircle aria-hidden className="size-4" /> WhatsApp {site.whatsapp}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <a href={`mailto:${emails.tenders}`} className="hover:text-cyan-300">
              Tenders: {emails.tenders}
            </a>
          </div>
        </div>

        {/* Large outlined wordmark that fills with cyan on hover */}
        <div className="group relative mt-10 select-none" aria-hidden>
          <svg viewBox="0 0 1000 250" className="block w-full" preserveAspectRatio="xMidYMax meet">
            <text
              x="500"
              y="235"
              textAnchor="middle"
              textLength="960"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="var(--font-barlow), sans-serif"
              fontWeight="800"
              fontSize="300"
              className="fill-transparent stroke-white/30 transition-[fill,stroke] duration-700 group-hover:fill-cyan group-hover:stroke-cyan"
              strokeWidth="1.5"
            >
              UMS
            </text>
          </svg>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {site.fullName}. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex items-center gap-5">
              <Link href="/search" className="hover:text-cyan-300">
                Search
              </Link>
            </nav>
            <BackToTop className="self-start sm:self-auto" />
          </div>
        </div>
      </footer>
    </>
  );
}
