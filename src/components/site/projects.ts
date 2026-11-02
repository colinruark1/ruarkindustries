/**
 * Projects shown in the portfolio card stack.
 *
 * This list drives the swipeable cards on the Portfolio section and the
 * Selected Work tiles on Home. The full write-up for each project lives in its
 * own page under src/app/<slug>/page.tsx (e.g. src/app/naiss/page.tsx) — those
 * are hand-authored, not generated here.
 */

export type ProjectVariant = "a" | "b" | "c";

export type Project = {
  /** URL segment, e.g. "slammedu" -> /slammedu. */
  slug: string;
  title: string;
  meta: string;
  /** Optional cover image under /public. Falls back to a palette gradient. */
  img?: string;
  variant?: ProjectVariant;
  /** One-line outcome, shown when the project is featured on Home. */
  summary?: string;
};

export const PROJECTS: Project[] = [
  { slug: "naiss", title: "Nittany AI Student Society", meta: "Leadership · 2023-2026", img: "/images/NAiSS.jpeg", variant: "a", summary: "As President, I've helped over 500 members grow their AI skills and taught our Machine Learning Bootcamp." },
  { slug: "wsh", title: "West Shore Home", meta: "Automated Workflows · 2026", img: "/images/WSH.jpg", variant: "b" },
  { slug: "slammedu", title: "Slammedu", meta: "Full Stack Development · 2026", img: "/images/Slammedu.png", variant: "c", summary: "I lead software development for this student engagement platform, built with Supabase, Vercel, and Stripe." },
  { slug: "meridian", title: "Meridian", meta: "AI Strategy & Implementation · 2026", img: "/images/Meridian.jpeg", variant: "a" },
  { slug: "sarover", title: "SaRover", meta: "E-Commerce Website · Live Site", img: "/images/Sarover.png", variant: "b" },
  { slug: "meganfaith", title: "Megan Faith Music", meta: "Artist Website · Live Site", img: "/images/MeganFaith.jpeg", variant: "c" },
  { slug: "oc", title: "Ocean Cleaners", meta: "Rapid Prototyping · 2025", img: "/images/Ocean%20Cleaners.jpeg", variant: "a" },
  { slug: "challenge", title: "Nittany AI Challenge", meta: "Analytics · 2026", img: "/images/Challenge.jpeg", variant: "b" },
];
