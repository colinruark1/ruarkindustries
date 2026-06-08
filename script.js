/* =========================================================
   Colin Ruark — site interactions
   - Tabbed single-page navigation (hash-aware)
   - Light / dark theme toggle (persisted + system default)
   - Mobile nav menu
   - Contact form (demo handler)
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var navLinks = document.querySelectorAll("[data-tab]");
  var panels = document.querySelectorAll(".tab-panel");
  var menuLinks = document.querySelectorAll(".nav-link");

  /* ---------- Theme ---------- */
  var THEME_KEY = "cr-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function initTheme() {
    var saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved === "light" || saved === "dark") {
      applyTheme(saved);
    } else {
      var prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }
  initTheme();

  /* ---------- Tab navigation ---------- */
  function showTab(name, updateHash) {
    var found = false;
    panels.forEach(function (panel) {
      var active = panel.getAttribute("data-panel") === name;
      panel.classList.toggle("is-active", active);
      if (active) found = true;
    });
    if (!found) { showTab("home", true); return; }

    menuLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-tab") === name);
    });

    if (updateHash) {
      if (history.replaceState) history.replaceState(null, "", "#" + name);
      else location.hash = name;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    var panel = document.getElementById(name);
    if (panel) panel.focus({ preventScroll: true });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showTab(link.getAttribute("data-tab"), true);
      closeMenu();
    });
  });

  window.addEventListener("hashchange", function () {
    showTab(location.hash.replace("#", "") || "home", false);
  });

  // Initial tab from hash (e.g. shared link)
  showTab((location.hash || "#home").replace("#", ""), false);

  /* ---------- Mobile menu ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("is-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Calendly scheduling widget ---------- */
  // The booking link is set in index.html via window.CALENDLY_URL.
  var embed = document.getElementById("calendly-embed");
  var fallback = document.getElementById("calendly-fallback");
  var fallbackLink = document.getElementById("calendly-link");
  var calendlyUrl = (window.CALENDLY_URL || "").trim();
  var calendlyLoaded = false;

  // Build the embed URL with colors that match the active theme.
  function calendlyEmbedUrl() {
    var dark = root.getAttribute("data-theme") === "dark";
    var colors = dark
      ? "background_color=1C333C&text_color=F2F0EF&primary_color=3E8BA8"
      : "background_color=FFFFFF&text_color=1B2A30&primary_color=245F73";
    var sep = calendlyUrl.indexOf("?") > -1 ? "&" : "?";
    return calendlyUrl + sep + colors + "&hide_gdpr_banner=1";
  }

  // (Re)render the inline widget — also used when the theme changes.
  function renderCalendly() {
    if (!embed || !window.Calendly || !calendlyUrl) return;
    embed.innerHTML = "";
    window.Calendly.initInlineWidget({
      url: calendlyEmbedUrl(),
      parentElement: embed
    });
  }

  function showFallback(message) {
    if (!fallback) return;
    fallback.hidden = false;
    if (fallbackLink && calendlyUrl) fallbackLink.href = calendlyUrl;
    if (message && embed) {
      embed.innerHTML = '<p class="calendly-setup">' + message + "</p>";
    }
  }

  // Lazily load Calendly's assets, then render.
  function loadCalendly() {
    if (calendlyLoaded || !embed) return;
    calendlyLoaded = true;

    if (!calendlyUrl || calendlyUrl.indexOf("your-name") > -1) {
      showFallback(
        "Set <code>window.CALENDLY_URL</code> in index.html to your Calendly link to show the booking calendar here."
      );
      return;
    }

    if (window.Calendly) { renderCalendly(); return; }

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(css);

    var script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = renderCalendly;
    script.onerror = function () {
      showFallback("Couldn't load the scheduler.");
    };
    document.head.appendChild(script);
  }

  // Only load when the Contact panel is actually shown (it's a hidden tab).
  function maybeLoadCalendly() {
    var contact = document.getElementById("contact");
    if (contact && contact.classList.contains("is-active")) loadCalendly();
  }
  maybeLoadCalendly();
  menuLinks.forEach(function (link) {
    if (link.getAttribute("data-tab") === "contact") {
      link.addEventListener("click", maybeLoadCalendly);
    }
  });
  window.addEventListener("hashchange", maybeLoadCalendly);

  // Re-skin the widget when the user toggles light/dark.
  if (window.MutationObserver && embed) {
    new MutationObserver(function () {
      if (calendlyLoaded && window.Calendly) renderCalendly();
    }).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
