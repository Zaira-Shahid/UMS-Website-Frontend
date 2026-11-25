import type { Metadata, Viewport } from "next";
import { Barlow_Semi_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { PRELOADER_GUARD, PRELOADER_STYLE, Preloader } from "@/components/layout/Preloader";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

/** Technical labels: coordinates, spec tags, section indexes (spec 3.2). */
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export const viewport: Viewport = {
  themeColor: "#173f60",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        {/* Hides the preloader before first paint on repeat visits and with reduced motion. */}
        <style dangerouslySetInnerHTML={{ __html: PRELOADER_STYLE }} />
        <script dangerouslySetInnerHTML={{ __html: PRELOADER_GUARD }} />
        <noscript>
          <style>{".preloader{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <PageTransition />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>
          <Header />
          {/* The header is fixed: pages with a full-bleed hero sit under it, other pages offset themselves. */}
          <main id="main" className="min-h-svh">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
