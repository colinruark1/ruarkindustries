"use client";

import { useCallback, useEffect, useState } from "react";
import { NavProvider, TABS, TabLink, type TabId } from "./site/nav";
import { SiteHeader } from "./site/site-header";
import { HomePanel } from "./site/panels/home";
import { AboutPanel } from "./site/panels/about";
import { CoursesPanel } from "./site/panels/courses";
import { ConsultPanel } from "./site/panels/consult";
import { PortfolioPanel } from "./site/panels/portfolio";
import { ContactPanel } from "./site/panels/contact";

const VALID = new Set<string>(TABS.map((t) => t.id));
const tabFromHash = (): TabId => {
  const raw = (typeof location !== "undefined" ? location.hash : "").replace("#", "");
  return (VALID.has(raw) ? raw : "home") as TabId;
};

export function SiteApp() {
  const [active, setActive] = useState<TabId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const showTab = useCallback((name: TabId, updateHash: boolean) => {
    setActive(name);
    if (updateHash) {
      if (history.replaceState) history.replaceState(null, "", "#" + name);
      else location.hash = name;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    const panel = document.getElementById(name);
    panel?.focus({ preventScroll: true });
  }, []);

  const navigate = useCallback(
    (tab: TabId) => {
      showTab(tab, true);
      setMenuOpen(false);
    },
    [showTab],
  );

  // Initial tab from hash (shared link) + respond to back/forward hash changes.
  useEffect(() => {
    setActive(tabFromHash());
    const onHashChange = () => setActive(tabFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <NavProvider value={{ active, navigate }}>
      <SiteHeader menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />

      <main id="main">
        <HomePanel active={active === "home"} />
        <AboutPanel active={active === "about"} />
        <CoursesPanel active={active === "courses"} />
        <ConsultPanel active={active === "consult"} />
        <PortfolioPanel active={active === "portfolio"} />
        <ContactPanel active={active === "contact"} />
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Colin Ruark · Letting you run your business.</p>
        <p className="footer-links">
          <TabLink tab="home">Privacy Policy</TabLink>
          <TabLink tab="courses">Terms and Conditions</TabLink>
        </p>
      </footer>
    </NavProvider>
  );
}
