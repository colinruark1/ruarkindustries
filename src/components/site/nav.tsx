import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export const TABS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

/** Map a tab id to its route ("home" is the index route). */
export const tabHref = (tab: TabId) => (tab === "home" ? "/" : `/${tab}`);

/**
 * Internal link to a section route. Uses next/link for client-side navigation
 * with clean paths (e.g. /about, not /#about).
 */
export function TabLink({
  tab,
  ...props
}: { tab: TabId } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return <Link href={tabHref(tab)} {...props} />;
}
