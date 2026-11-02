import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./legacy.css";
import { SiteHeader } from "@/components/site/site-header";
import { TabLink } from "@/components/site/nav";

// Site-wide face — self-hosted from src/fonts.
const lora = localFont({
  variable: "--font-lora",
  src: [
    { path: "../fonts/Lora-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Lora-Italic.ttf", weight: "400", style: "italic" },
    { path: "../fonts/Lora-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Lora-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Lora-Bold.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Lora-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "Ruark Industries - Transparency, Dedication, Outcomes",
  description: "Personal site for AI Consultations and Builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      // The no-flash script below rewrites data-theme before hydration, so the
      // server-rendered value is expected to mismatch on this element.
      suppressHydrationWarning
      className={`${lora.variable} h-full antialiased`}
    >
      <body>
        {/* No-flash theme init — runs before paint, mirrors the original
            cr-theme persistence + system preference fallback. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("cr-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />

        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <SiteHeader />

        <main id="main">{children}</main>

        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} Colin Ruark · Letting you run your
            business.
          </p>
          <p className="footer-links">
            <TabLink tab="home">Privacy Policy</TabLink>
            <TabLink tab="home">Terms and Conditions</TabLink>
          </p>
        </footer>
      </body>
    </html>
  );
}
