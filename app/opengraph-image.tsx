import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.fullName}: MEP contracting for complex buildings`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image: navy panel, the official logo on a white badge, and the tagline. */
export default async function OpenGraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/ums-logo-official.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", background: "linear-gradient(135deg,#032139 0%,#03294a 60%,#0a78b5 140%)", color: "white" }}>
        <div style={{ display: "flex", width: 120, height: 10, background: "#1ba6e8", marginBottom: 40 }} />
        <div style={{ display: "flex", alignSelf: "flex-start", background: "white", borderRadius: 24, padding: "22px 32px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={430} height={131} alt="" />
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 44, lineHeight: 1.1 }}>MEP Contracting for Complex Buildings</div>
        <div style={{ fontSize: 32, marginTop: 24, opacity: 0.9 }}>Islamabad &amp; Lahore</div>
      </div>
    ),
    size,
  );
}
