"use client";

import { useEffect, useRef } from "react";

// The booking link (was window.CALENDLY_URL in the original index.html).
const CALENDLY_URL = "https://calendly.com/colinruark1/30min";

type CalendlyGlobal = {
  initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
};
declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

/**
 * Loads Calendly's widget when the Contact route mounts, and re-skins it to
 * match the active theme. Ported from the original script.js.
 */
export function CalendlyEmbed() {
  const embedRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLParagraphElement>(null);
  const fallbackLinkRef = useRef<HTMLAnchorElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const embed = embedRef.current;
    if (!embed) return;
    const root = document.documentElement;
    const url = CALENDLY_URL.trim();

    function embedUrl() {
      const dark = root.getAttribute("data-theme") === "dark";
      const colors = dark
        ? "background_color=1C333C&text_color=F2F0EF&primary_color=3E8BA8"
        : "background_color=FFFFFF&text_color=1B2A30&primary_color=245F73";
      const sep = url.indexOf("?") > -1 ? "&" : "?";
      return url + sep + colors + "&hide_gdpr_banner=1";
    }

    function render() {
      if (!embed || !window.Calendly || !url) return;
      embed.innerHTML = "";
      window.Calendly.initInlineWidget({ url: embedUrl(), parentElement: embed });
    }

    function showFallback(message?: string) {
      const fallback = fallbackRef.current;
      if (!fallback) return;
      fallback.hidden = false;
      if (fallbackLinkRef.current && url) fallbackLinkRef.current.href = url;
      if (message && embed) {
        embed.innerHTML = `<p class="calendly-setup">${message}</p>`;
      }
    }

    function load() {
      if (loadedRef.current || !embed) return;
      loadedRef.current = true;

      if (!url || url.indexOf("your-name") > -1) {
        showFallback(
          'Set <code>CALENDLY_URL</code> in calendly-embed.tsx to your Calendly link to show the booking calendar here.',
        );
        return;
      }
      if (window.Calendly) {
        render();
        return;
      }

      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(css);

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = render;
      script.onerror = () => showFallback("Couldn't load the scheduler.");
      document.head.appendChild(script);
    }

    load();

    // Re-skin the widget when the user toggles light/dark.
    const observer = new MutationObserver(() => {
      if (loadedRef.current && window.Calendly) render();
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="calendly-wrap">
      <div id="calendly-embed" role="region" aria-label="Schedule an appointment" ref={embedRef} />
      <p className="calendly-fallback" id="calendly-fallback" hidden ref={fallbackRef}>
        Having trouble with the scheduler?{" "}
        <a
          id="calendly-link"
          href="#"
          target="_blank"
          rel="noopener"
          ref={fallbackLinkRef}
        >
          Open the booking page in a new tab
        </a>
        .
      </p>
    </div>
  );
}
