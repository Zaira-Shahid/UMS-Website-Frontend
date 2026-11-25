import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TiktokIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import { footerServiceOrder, serviceLabel } from "@/content/service-labels";
import { quoteHref } from "@/content/navigation";
import { contact, site } from "@/content/site";
import { FooterCTA } from "./FooterCTA";
import { LogoMark } from "./Logo";

/** Social icons appear only once a real URL (or, for WhatsApp, a number) is set in content/site.ts. */
const socials = [
  { label: "LinkedIn", href: contact.social.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: contact.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: contact.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: contact.social.youtube, Icon: YoutubeIcon },
  { label: "X", href: contact.social.x, Icon: XIcon },
  { label: "TikTok", href: contact.social.tiktok, Icon: TiktokIcon },
  { label: "WhatsApp", href: contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` : "", Icon: WhatsappIcon },
].filter((s) => !!s.href);

const explore = [
  { label: "About UMS", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

const linkClass = "inline-block py-2 text-[1.1875rem] text-white/90 transition-colors hover:text-cyan focus-visible:text-cyan";

function ColumnHead({ children }: { children: string }) {
  return (
    <>
      <h2 className="font-heading text-[1.875rem] font-bold leading-tight text-white">{children}</h2>
      <span aria-hidden className="mt-3 block h-1 w-28 rounded-full bg-cyan" />
    </>
  );
}

/** One column of the footer. From the large breakpoint the columns are separated by a thin cyan line. */
function Column({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`min-w-0 lg:border-l-2 lg:border-cyan lg:pl-8 ${className ?? ""}`}>{children}</div>;
}

export function Footer() {
  const head = contact.offices.find((o) => o.city === "Islamabad");
  const headHasLocation = !!(head && (head.address || head.mapUrl));

  return (
    <>
      <FooterCTA />
      <footer className="bg-navy-950 text-white">
        <div className="wrap pt-12 lg:pt-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:grid-cols-[1.35fr_1fr_1.1fr_1fr_1.1fr]">
            {/* Brand */}
            <div className="min-w-0 sm:col-span-2 lg:col-span-4 xl:col-span-1">
              <Link href="/" aria-label={`${site.fullName}, home`} className="inline-block rounded-xl bg-white px-3 py-2.5">
                <LogoMark className="h-14 w-auto" />
              </Link>
              <p className="mt-5 font-heading text-[2rem] font-bold leading-[1.12] text-white">{site.fullName}</p>
              <span aria-hidden className="mt-3 block h-1 w-24 rounded-full bg-cyan" />
              {socials.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-3" aria-label="Social links">
                  {socials.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="flex size-11 items-center justify-center rounded-lg border-2 border-cyan text-white transition-colors hover:bg-cyan hover:text-navy-950"
                      >
                        <Icon className="size-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <Image
                src="/images/sections/footer-building.png"
                alt=""
                width={417}
                height={145}
                sizes="(min-width:1024px) 22rem, 70vw"
                className="mt-6 hidden h-auto w-full max-w-[24rem] [mask-image:radial-gradient(ellipse_at_center,black_62%,transparent_100%)] sm:block"
              />
            </div>

            <Column>
              <nav aria-label="Explore">
                <ColumnHead>Explore</ColumnHead>
                <ul className="mt-5">
                  {explore.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Column>

            <Column>
              <nav aria-label="Services">
                <ColumnHead>Services</ColumnHead>
                <ul className="mt-5">
                  {footerServiceOrder.map((slug) => (
                    <li key={slug}>
                      <Link href={`/services/${slug}`} className={linkClass}>
                        {serviceLabel[slug]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </Column>

            <Column>
              <ColumnHead>Offices</ColumnHead>
              <ul className="mt-5">
                {contact.offices.map((o) => (
                  <li key={o.city}>
                    {o.mapUrl ? (
                      <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {o.city}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="inline-block py-2 text-[1.1875rem] text-white/90">{o.city}</span>
                    )}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`${linkClass} mt-4`}>
                View Office Locations
              </Link>
            </Column>

            <Column className="sm:col-span-2 lg:col-span-1">
              <ColumnHead>Contact Us</ColumnHead>
              <ul className="mt-5">
                {headHasLocation ? (
                  <>
                    <li>
                      <Link href="/contact" className={linkClass}>
                        Head Office Location
                      </Link>
                    </li>
                    {head?.mapUrl && (
                      <li>
                        <a href={head.mapUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                          Get Directions
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  <li>
                    <Link href="/contact" className={linkClass}>
                      Contact page
                    </Link>
                  </li>
                )}
              </ul>
              <Button href={quoteHref()} variant="outline-cyan" className="mt-6">
                Request a Quote
              </Button>
            </Column>
          </div>
        </div>

        <div className="mt-10 border-t-2 border-cyan">
          <div className="wrap flex flex-col gap-2 py-5 text-[1.1875rem] text-white/90 sm:flex-row sm:items-center sm:justify-between">
            <p>{site.fullName}</p>
            <Link href="/privacy-policy" className="hover:text-cyan">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
