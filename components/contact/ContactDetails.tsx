import { contact, type OfficeConfig } from "@/content/site";
import { cn } from "@/lib/utils";

const telHref = (v: string) => `tel:${v.replace(/[^\d+]/g, "")}`;
const waHref = (v: string) => `https://wa.me/${v.replace(/\D/g, "")}`;

const hasOffice = (o: OfficeConfig) => !!(o.address || o.phone || o.email || o.hours);

/**
 * Contact details from content/site.ts, as plain open typography. Every line renders only when its value is
 * filled in, and the whole component renders nothing when nothing is.
 */
export function ContactDetails({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  const offices = contact.offices.filter(hasOffice);
  const general = [
    contact.phone && { label: "Phone", text: contact.phone, href: telHref(contact.phone) },
    contact.whatsapp && { label: "WhatsApp", text: contact.whatsapp, href: waHref(contact.whatsapp) },
    contact.email.general && { label: "Email", text: contact.email.general, href: `mailto:${contact.email.general}` },
    contact.email.tenders && { label: "Tenders", text: contact.email.tenders, href: `mailto:${contact.email.tenders}` },
  ].filter((x): x is { label: string; text: string; href: string } => !!x);

  if (offices.length === 0 && general.length === 0) return null;

  const muted = dark ? "text-white/60" : "text-muted";
  const link = dark ? "hover:text-cyan-300" : "hover:text-blue-700";

  return (
    <div className={cn("space-y-8", dark ? "text-white" : "text-navy", className)}>
      {offices.map((o) => (
        <address key={o.city} className="not-italic">
          <p className="font-heading text-lg font-semibold uppercase tracking-[0.08em]">{o.city}</p>
          <div className={cn("mt-2 space-y-1 text-[0.9375rem]", muted)}>
            {o.address &&
              (o.mapUrl ? (
                <p>
                  <a href={o.mapUrl} target="_blank" rel="noopener noreferrer" className={link}>
                    {o.address}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              ) : (
                <p>{o.address}</p>
              ))}
            {o.phone && (
              <p>
                <a href={telHref(o.phone)} className={link}>
                  {o.phone}
                </a>
              </p>
            )}
            {o.email && (
              <p>
                <a href={`mailto:${o.email}`} className={link}>
                  {o.email}
                </a>
              </p>
            )}
            {o.email2 && (
              <p>
                <a href={`mailto:${o.email2}`} className={link}>
                  {o.email2}
                </a>
              </p>
            )}
            {o.hours && <p>{o.hours}</p>}
          </div>
        </address>
      ))}
      {general.length > 0 && (
        <ul className={cn("space-y-1 text-[0.9375rem]", muted)}>
          {general.map((g) => (
            <li key={g.label}>
              {g.label}:{" "}
              <a
                href={g.href}
                className={link}
                {...(g.label === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {g.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
