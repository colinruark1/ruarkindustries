"use client";

import { createContext, useContext } from "react";
import type { AnchorHTMLAttributes } from "react";

export const TABS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "courses", label: "Courses" },
  { id: "consult", label: "Consult" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

type NavContextValue = {
  active: TabId;
  navigate: (tab: TabId) => void;
};

const NavContext = createContext<NavContextValue | null>(null);

export const NavProvider = NavContext.Provider;

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used within NavProvider");
  return ctx;
}

/**
 * Anchor that switches tabs in-app (mirrors the original [data-tab] links:
 * it keeps the #hash for deep-linking but intercepts the click).
 */
export function TabLink({
  tab,
  onClick,
  ...props
}: { tab: TabId } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { navigate } = useNav();
  return (
    <a
      href={`#${tab}`}
      data-tab={tab}
      onClick={(e) => {
        e.preventDefault();
        navigate(tab);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
