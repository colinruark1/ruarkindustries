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

  /* ---------- Contact form (demo) ---------- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        if (note) note.textContent = "Please fill in the required fields.";
        form.reportValidity();
        return;
      }
      var name = (document.getElementById("name") || {}).value || "there";
      if (note) note.textContent = "Thanks, " + name + "! This is a demo form — wire it to your backend.";
      form.reset();
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
