import { jsonLd } from "@/lib/seo";

/** Renders one or more schema.org objects as JSON-LD. "<" is escaped by jsonLd(), so content cannot close the tag. */
export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(d) }} />
      ))}
    </>
  );
}
