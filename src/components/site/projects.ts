/**
 * Projects shown in the portfolio card stack.
 *
 * This list only drives the swipeable cards on the Portfolio section. The full
 * write-up for each project lives in its own page under src/app/<slug>/page.tsx
 * (e.g. src/app/naiss/page.tsx) — those are hand-authored, not generated here.
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
};

export const PROJECTS: Project[] = [
  { slug: "naiss", title: "Nittany AI Student Society", meta: "Leadership · 2023-2026", img: "/images/NAiSS.jpeg", variant: "a" },
  { slug: "wsh", title: "West Shore Home", meta: "Automated Workflows · 2026", img: "/images/WSH.jpg", variant: "b" },
  { slug: "slammedu", title: "Slammedu", meta: "Full Stack Development · 2026", img: "/images/Slammedu.png", variant: "c" },
  { slug: "oc", title: "Ocean Cleaners", meta: "Rapid Prototyping · 2025", img: "/images/Ocean%20Cleaners.jpeg", variant: "a" },
  { slug: "challenge", title: "Nittany AI Challenge", meta: "Analytics · 2026", img: "/images/Challenge.jpeg", variant: "b" },
  { slug: "ips", title: "Invent Penn State", meta: "Retrieval-Augmented Generation · 2023", img: "", variant: "c" },
];
