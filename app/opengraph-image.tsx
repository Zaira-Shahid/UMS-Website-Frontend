import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.fullName}: MEP contracting for complex buildings`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image: navy panel, the brand name and the tagline. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", background: "linear-gradient(135deg,#032139 0%,#03294a 60%,#0a78b5 140%)", color: "white" }}>
        <div style={{ display: "flex", width: 120, height: 10, background: "#1ba6e8", marginBottom: 36 }} />
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -2, color: "#1ba6e8", lineHeight: 1 }}>{site.name}</div>
        <div style={{ fontSize: 44, fontWeight: 700, marginTop: 18 }}>{site.fullName}</div>
        <div style={{ fontSize: 34, marginTop: 40, opacity: 0.92 }}>MEP Contracting for Complex Buildings</div>
      </div>
    ),
    size,
  );
}
