import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "./legacy.css";
import { SiteHeader } from "@/components/site/site-header";
import { TabLink } from "@/components/site/nav";

// Display / heading face — variable weight, served from Google.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Body face — self-hosted from src/fonts.
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

// Logo lockup face.
const libre = localFont({
  variable: "--font-libre",
  src: [
    { path: "../fonts/LibreBaskerville-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/LibreBaskerville-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/LibreBaskerville-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Ruark Industries - Transparency, Dedication, Outcomes",
  description: "Personal site for AI Courses, Consultations, and Builds.",
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
      className={`${fraunces.variable} ${lora.variable} ${libre.variable} h-full antialiased`}
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
            <TabLink tab="courses">Terms and Conditions</TabLink>
          </p>
        </footer>
      </body>
    </html>
  );
}
