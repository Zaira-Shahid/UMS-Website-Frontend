import { OfficeCard } from "@/components/contact/OfficeCard";
import { Badge } from "@/components/ui/Badge";
import { offices } from "@/content/offices";
import { services } from "@/content/services";

/**
 * Desktop side panel for the RFQ form. Only facts that exist in /content are stated;
 * the response time and office details are placeholders until UMS confirms them.
 */
export function RfqAside() {
  return (
    <aside aria-label="About requesting a quote" className="space-y-6 lg:sticky lg:top-28">
      <section className="border border-line bg-white">
        <div className="border-t-2 border-cyan p-5">
          <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">Why UMS</h2>
          <ul className="mt-4 space-y-3 text-sm text-ink">
            <li>
              <strong className="font-semibold text-navy">{services.length} MEP disciplines</strong> — priced
              separately or as one coordinated package.
            </li>
            <li>
              <strong className="font-semibold text-navy">Two offices</strong>, in Islamabad and Lahore.
            </li>
            <li>
              <strong className="font-semibold text-navy">Brief or outline</strong> — send what you have and we
              will tell you what we need to price it.
            </li>
          </ul>
        </div>
      </section>

      <section className="border border-line bg-white">
        <div className="p-5">
          <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">Response time</h2>
          {/* TODO: client to confirm — typical response time for quote requests */}
          <p className="mt-3">
            <Badge tone="pending">Typical response time · to be confirmed</Badge>
          </p>
        </div>
      </section>

      <div className="space-y-4">
        <h2 className="font-heading text-lg font-semibold uppercase tracking-[0.08em] text-navy">Our offices</h2>
        {offices.map((o) => (
          <OfficeCard key={o.city} office={o} compact />
        ))}
      </div>
    </aside>
  );
}
