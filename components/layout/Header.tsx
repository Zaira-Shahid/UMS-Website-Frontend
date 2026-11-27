import Link from "next/link";
import { ChevronDown, FileText, Menu, Search } from "@/components/ui/lucide";
import { Button } from "@/components/ui/Button";
import { WhatsappIcon } from "@/components/ui/SocialIcons";
import { mainNav, quoteHref } from "@/content/navigation";
import { contact } from "@/content/site";
import { markNavScript } from "@/lib/nav-active";
import { cn } from "@/lib/utils";
import { HeaderBehavior } from "./HeaderBehavior";
import { Logo } from "./Logo";
import { AboutPanel, ServicesPanel } from "./MegaMenu";

/** WhatsApp button. Until a number is set in content/site.ts it links to /contact, so no number is ever invented. */
const whatsappHref = contact.whatsapp ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}` : "/contact";

function WhatsappButton({ className }: { className?: string }) {
  const external = whatsappHref.startsWith("https://");
  return (
    <a
      href={whatsappHref}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label="Chat on WhatsApp"
      className={cn("flex size-11 shrink-0 items-center justify-center rounded-full bg-[#dcf8e8] text-[#25d366] transition-colors hover:bg-[#c6f2d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366]", className)}
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}

/**
 * Site header (PROJECT_SPEC.md 4.1): white, sticky, with a soft shadow. It is plain server markup, dropdown panels included,
 * so it paints and reads without any JavaScript. The active item is marked by a small inline script (lib/nav-active.ts), and
 * HeaderBehavior (a tiny client component that renders nothing until search or the mobile menu opens) adds what needs
 * scripting: the dropdowns on hover, click and keyboard, the full-screen mobile menu, and search. Open and active states are
 * `data-open` and `data-active` on each item, which the classes below react to.
 */
export function Header() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-[0_2px_16px_-6px_rgb(15_42_74/0.2)]">
        <div className="wrap flex h-16 items-center justify-between gap-4 xl:h-[var(--header-h)] 2xl:gap-6">
          <Logo />

          <nav aria-label="Main" data-main-nav className="hidden xl:block">
            <ul className="flex items-center gap-3 min-[1400px]:gap-6 2xl:gap-8">
              {mainNav.map((item) => {
                const hasMenu = Boolean(item.children);
                const match = [item.href, ...(item.children ?? []).map((c) => c.href).filter((h) => h !== "/")].join(" ");
                const itemClass =
                  "relative inline-flex items-center gap-1 py-2 text-[1.0625rem] font-medium text-navy transition-colors hover:text-blue-700 group-data-[active=true]:font-semibold group-data-[active=true]:text-blue-700 group-data-[open=true]:font-semibold group-data-[open=true]:text-blue-700 min-[1400px]:text-[1.125rem] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue";
                const underline = (
                  <span aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-1 hidden h-1 rounded-full bg-blue group-data-[active=true]:block" />
                );
                return (
                  <li key={item.label} className="group relative" data-nav-item data-match={match} {...(hasMenu ? { "data-menu": item.label } : {})}>
                    {hasMenu ? (
                      // The label is a link to the section page; the chevron is a separate button that toggles the dropdown.
                      <div className="flex items-center gap-0.5">
                        <Link href={item.href} data-nav-link className={itemClass}>
                          {item.label}
                          {underline}
                        </Link>
                        <button
                          type="button"
                          data-menu-toggle
                          aria-label={`${item.label} menu`}
                          aria-expanded="false"
                          aria-controls={`menu-${item.label}`}
                          className="flex size-7 items-center justify-center rounded-full text-navy transition-colors hover:text-blue-700 group-data-[active=true]:text-blue-700 group-data-[open=true]:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
                        >
                          <ChevronDown aria-hidden className="size-4 transition-transform group-data-[open=true]:rotate-180" />
                        </button>
                      </div>
                    ) : (
                      <Link href={item.href} data-nav-link className={itemClass}>
                        {item.label}
                        {underline}
                      </Link>
                    )}

                    {hasMenu && (
                      // The top padding is a hover bridge: the pointer never leaves the <li> on its way to the panel.
                      <div id={`menu-${item.label}`} data-menu-panel className="absolute left-0 top-full z-10 hidden pt-5 group-data-[open=true]:block group-data-[open=true]:animate-menu-in">
                        {item.label === "Services" ? <ServicesPanel /> : <AboutPanel links={item.children ?? []} />}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 xl:flex">
            <button
              type="button"
              data-open-search
              aria-label="Search (Ctrl+K)"
              aria-keyshortcuts="Control+K Meta+K"
              className="flex size-11 items-center justify-center rounded-full bg-[#e4f2fb] text-navy transition-colors hover:bg-[#d2eaf8]"
            >
              <Search className="size-5" aria-hidden />
            </button>
            <WhatsappButton />
            <Button href={quoteHref()} data-quote-link variant="navy" className="rounded-full pl-4 pr-5 xl:px-4 min-[1400px]:pl-4 min-[1400px]:pr-5">
              <FileText aria-hidden className="size-5 text-blue" />
              Request a Quote
            </Button>
          </div>

          {/* Mobile and tablet actions */}
          <div className="flex items-center gap-1.5 min-[420px]:gap-2 xl:hidden">
            <Button href={quoteHref()} data-quote-link variant="navy" size="sm" className="rounded-full pl-3 pr-3.5 max-[419px]:text-[0.8125rem] min-[420px]:pr-4">
              <FileText aria-hidden className="size-4 text-blue max-[399px]:hidden" />
              Get a Quote
            </Button>
            <WhatsappButton className="size-10 max-[419px]:size-9" />
            <button
              type="button"
              data-open-mobile
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center text-navy min-[420px]:size-11"
            >
              <Menu className="size-7" aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <script dangerouslySetInnerHTML={{ __html: markNavScript }} />
      <HeaderBehavior />
    </>
  );
}
