import { ContactDetails } from "@/components/contact/ContactDetails";
import { services } from "@/content/services";

/** Side notes for the quote form: open typography, no boxes. */
export function RfqAside() {
  return (
    <aside aria-label="About requesting a quote" className="space-y-8 lg:sticky lg:top-28">
      <div>
        <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">Why UMS</h2>
        <ul className="mt-4 space-y-3 text-sm text-ink">
          <li>
            <strong className="font-semibold text-navy">{services.length} MEP disciplines</strong> — priced
            separately or as one coordinated package.
          </li>
          <li>
            <strong className="font-semibold text-navy">Offices in Islamabad &amp; Lahore.</strong>
          </li>
          <li>
            <strong className="font-semibold text-navy">Brief or outline</strong> — send what you have and we will
            tell you what we need to price it.
          </li>
        </ul>
      </div>
      <ContactDetails />
    </aside>
  );
}
