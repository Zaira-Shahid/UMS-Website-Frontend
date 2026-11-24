import { OfficeCard } from "@/components/contact/OfficeCard";
import { rfqResponseTime } from "@/content/dummy";
import { offices } from "@/content/offices";
import { services } from "@/content/services";

/**
 * Desktop side panel for the RFQ form. Facts come from /content.
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
          <p className="mt-3 text-sm text-ink">
            The tender desk replies <strong className="font-semibold text-navy">{rfqResponseTime}</strong> with
            questions or a pricing route.
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
