"use client";

import { TABS, TabLink, useNav } from "./nav";

const THEME_KEY = "cr-theme";

/**
 * Animated circular reveal (View Transitions API) — expands the new theme
 * outward from the toggle button. Falls back to an instant swap where
 * unsupported or when the user prefers reduced motion. Ported verbatim from
 * the original script.js.
 */
function toggleTheme(button: HTMLElement) {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

  const apply = () => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // startViewTransition isn't in every lib.dom version yet.
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };

  if (!doc.startViewTransition || prefersReduced) {
    apply();
    return;
  }

  const transition = doc.startViewTransition(apply);
  transition.ready.then(() => {
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

export function SiteHeader({
  menuOpen,
  onToggleMenu,
}: {
  menuOpen: boolean;
  onToggleMenu: () => void;
}) {
  const { active } = useNav();

  return (
    <header className="site-header">
      <nav className="nav" aria-label="Primary">
        <TabLink
          tab="home"
          className="brand logo"
          aria-label="Ruark Industries — home"
        >
          <span className="logo-top" aria-hidden="true">
            RUARK
          </span>
          <span className="logo-bottom" aria-hidden="true">
            INDUSTRIES
          </span>
        </TabLink>

        <button
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label="Toggle navigation"
          onClick={onToggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu${menuOpen ? " is-open" : ""}`} id="nav-menu">
          {TABS.map((t) => (
            <li key={t.id}>
              <TabLink
                tab={t.id}
                className={`nav-link${active === t.id ? " is-active" : ""}`}
              >
                {t.label}
              </TabLink>
            </li>
          ))}
        </ul>

        <button
          className="theme-toggle"
          id="theme-toggle"
          aria-label="Switch color theme"
          title="Toggle light / dark mode"
          onClick={(e) => toggleTheme(e.currentTarget)}
        >
          <svg
            className="icon-sun"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="2" x2="12" y2="5" />
              <line x1="12" y1="19" x2="12" y2="22" />
              <line x1="2" y1="12" x2="5" y2="12" />
              <line x1="19" y1="12" x2="22" y2="12" />
              <line x1="4.5" y1="4.5" x2="6.6" y2="6.6" />
              <line x1="17.4" y1="17.4" x2="19.5" y2="19.5" />
              <line x1="4.5" y1="19.5" x2="6.6" y2="17.4" />
              <line x1="17.4" y1="6.6" x2="19.5" y2="4.5" />
            </g>
          </svg>
          <svg
            className="icon-moon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path
              d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
              fill="currentColor"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
