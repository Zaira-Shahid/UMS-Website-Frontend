import { leadership } from "@/content/about";
import { offices } from "@/content/offices";
import { cn } from "@/lib/utils";

function Box({ name, title, className }: { name?: string; title: string; className?: string }) {
  return (
    <div
      className={cn(
        "border-2 border-navy bg-white px-4 py-3 text-center font-heading text-sm font-semibold uppercase tracking-[0.08em] text-navy",
        className,
      )}
    >
      {title}
      {name && <span className="mt-0.5 block text-xs font-medium normal-case tracking-normal text-muted">{name}</span>}
    </div>
  );
}

const line = "bg-navy/30";

/** Organisation structure: leadership above the two offices. */
export function OrgDiagram() {
  const ceo = leadership[0];
  const heads = leadership.slice(1);
  return (
    <figure aria-labelledby="org-caption">
      <figcaption id="org-caption" className="sr-only">
        Organisation structure: the chief executive officer above the leadership team, with the Islamabad and Lahore
        offices below.
      </figcaption>

      <div className="mx-auto max-w-4xl">
        <Box className="mx-auto max-w-xs" title={ceo.role} name={ceo.name} />
        <div aria-hidden className={cn("mx-auto h-8 w-px", line)} />
        <ul className="grid gap-3 sm:grid-cols-5">
          {heads.map((h) => (
            <li key={h.name}>
              <Box className="h-full" title={h.role} name={h.name} />
            </li>
          ))}
        </ul>
        <div aria-hidden className={cn("mx-auto h-8 w-px", line)} />
        <div className="relative grid grid-cols-2 gap-4 sm:gap-10">
          <div aria-hidden className={cn("absolute left-1/4 right-1/4 top-0 h-px", line)} />
          {offices.map((o) => (
            <div key={o.city} className="relative pt-8">
              <span aria-hidden className={cn("absolute left-1/2 top-0 h-8 w-px", line)} />
              <Box title={`${o.city} office`} name={o.label} />
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
