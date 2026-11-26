import type { Metadata, Viewport } from "next";
import { Barlow_Semi_Condensed, Inter } from "next/font/google";
import { ChatLoader } from "@/components/chat/ChatLoader";
import { Defer } from "@/components/ui/Defer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import "./globals.css";

/** Headings (client proposal): Barlow Semi Condensed. */
const barlow = Barlow_Semi_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

/** Body and UI. */
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
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        {/* The header is fixed: pages with a full-bleed hero sit under it, other pages offset themselves. */}
        <main id="main" className="min-h-svh">
          {children}
        </main>
        <Defer>
          <Footer />
        </Defer>
        <ChatLoader />
      </body>
    </html>
  );
}
