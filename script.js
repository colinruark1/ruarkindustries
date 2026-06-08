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

  // Animated circular reveal (View Transitions API) — expands the new
  // theme outward from the toggle button, mirroring magicui's
  // AnimatedThemeToggler. Falls back to an instant swap where unsupported.
  function toggleTheme(button) {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    var prefersReduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || prefersReduced) {
      applyTheme(next);
      return;
    }

    var transition = document.startViewTransition(function () {
      applyTheme(next);
    });

    transition.ready.then(function () {
      var rect = button.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.animate(
        {
          clipPath: [
            "circle(0px at " + x + "px " + y + "px)",
            "circle(" + endRadius + "px at " + x + "px " + y + "px)"
          ]
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)"
        }
      );
    });
  }

  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      toggleTheme(themeToggle);
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

  /* ---------- Portfolio card stack ----------
     A vanilla port of a draggable "stacked cards" showcase: the front card
     can be dragged up/down (or sent via the arrow buttons) to cycle through
     projects, with shuffle/reset and a progress indicator.

     Edit PROJECTS to add work. `img` is an optional image URL — when empty,
     the card falls back to a palette gradient (variant "a" | "b" | "c"). */
  var PROJECTS = [
    { title: "Lorem Project",     meta: "AI workflow · 2025",  href: "",  img: "", variant: "a" },
    { title: "Ipsum Platform",    meta: "LLM tooling · 2025",  href: "",  img: "", variant: "b" },
    { title: "Dolor System",      meta: "Automation · 2024",   href: "",  img: "", variant: "c" },
    { title: "Amet Engine",       meta: "RAG pipeline · 2024", href: "",  img: "", variant: "a" },
    { title: "Sit Dashboard",     meta: "Analytics · 2024",    href: "",  img: "", variant: "b" },
    { title: "Consectetur App",   meta: "Mobile · 2023",       href: "",  img: "", variant: "c" }
  ];

  (function initCardStack() {
    var stack = document.getElementById("cardstack");
    var list = document.getElementById("cardstack-cards");
    if (!stack || !list || !PROJECTS.length) return;

    var progress = document.getElementById("cardstack-progress");
    var prevBtn = document.getElementById("cardstack-prev");
    var nextBtn = document.getElementById("cardstack-next");
    var shuffleBtn = document.getElementById("cardstack-shuffle");
    var resetBtn = document.getElementById("cardstack-reset");

    var MAX_VISIBLE = 4;          // cards rendered behind the front one
    var SWIPE_THRESHOLD = 60;     // px of drag needed to commit a swipe
    var prefersReduced = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // `order` holds indices into PROJECTS; order[0] is the front card.
    var order = PROJECTS.map(function (_, i) { return i; });
    var cardEls = [];

    function buildCard(project) {
      var li = document.createElement("li");
      li.className = "cardstack-card";

      var media = document.createElement("div");
      media.className = "cardstack-media";
      if (project.img) {
        var img = document.createElement("img");
        img.src = project.img;
        img.alt = project.title;
        img.draggable = false;
        media.appendChild(img);
      } else {
        media.classList.add("cardstack-media-" + (project.variant || "a"));
      }
      li.appendChild(media);

      var info = document.createElement("div");
      info.className = "cardstack-info";
      var h3 = document.createElement("h3");
      h3.textContent = project.title;
      var p = document.createElement("p");
      p.textContent = project.meta;
      info.appendChild(h3);
      info.appendChild(p);

      if (project.href) {
        var a = document.createElement("a");
        a.href = project.href;
        a.target = "_blank";
        a.rel = "noopener";
        a.className = "cardstack-link";
        a.textContent = "View project";
        a.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
        info.appendChild(a);
      }
      li.appendChild(info);
      return li;
    }

    function buildProgress() {
      if (!progress) return;
      progress.innerHTML = "";
      PROJECTS.forEach(function () {
        progress.appendChild(document.createElement("span"));
      });
    }

    // Position every card based on its depth from the front.
    function layout(dragOffset) {
      var dots = progress ? progress.children : [];
      for (var depth = 0; depth < order.length; depth++) {
        var el = cardEls[order[depth]];
        var hidden = depth >= MAX_VISIBLE;
        el.style.zIndex = String(order.length - depth);
        el.style.opacity = hidden ? "0" : "1";
        el.style.pointerEvents = depth === 0 ? "auto" : "none";
        el.classList.toggle("is-front", depth === 0);

        var translateY = depth * -22;       // px each card peeks above the one in front
        var scale = 1 - depth * 0.05;
        var brightness = Math.max(0.55, 1 - depth * 0.12);
        var rotate = 0;

        if (depth === 0 && dragOffset) {
          translateY += dragOffset;
          rotate = Math.max(-8, Math.min(8, dragOffset / -18));
        }

        el.style.transform =
          "translateY(" + translateY + "px) scale(" + scale.toFixed(3) + ") rotate(" + rotate + "deg)";
        el.style.filter = "brightness(" + brightness.toFixed(2) + ")";
      }

      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle("is-active", d === order[0]);
      }
    }

    function withTransition(fn) {
      list.classList.add("is-animating");
      fn();
      window.clearTimeout(withTransition._t);
      withTransition._t = window.setTimeout(function () {
        list.classList.remove("is-animating");
      }, 350);
    }

    function next() { withTransition(function () { order.push(order.shift()); layout(0); }); }
    function prev() { withTransition(function () { order.unshift(order.pop()); layout(0); }); }

    function shuffle() {
      withTransition(function () {
        for (var i = order.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = order[i]; order[i] = order[j]; order[j] = tmp;
        }
        layout(0);
      });
    }

    function reset() {
      withTransition(function () {
        order = PROJECTS.map(function (_, i) { return i; });
        layout(0);
      });
    }

    // ----- Pointer drag on the front card -----
    var dragging = false, startY = 0, frontEl = null;

    function onPointerDown(e) {
      var front = cardEls[order[0]];
      if (!front.contains(e.target)) return;
      dragging = true;
      startY = e.clientY;
      frontEl = front;
      list.classList.remove("is-animating");
      front.setPointerCapture && front.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      layout(e.clientY - startY);
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      var delta = e.clientY - startY;
      frontEl && frontEl.releasePointerCapture && frontEl.releasePointerCapture(e.pointerId);
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        delta < 0 ? next() : prev();
      } else {
        withTransition(function () { layout(0); });
      }
    }

    // ----- Wire everything up -----
    PROJECTS.forEach(function (project) {
      var el = buildCard(project);
      cardEls.push(el);
      list.appendChild(el);
    });
    buildProgress();
    layout(0);

    if (prevBtn) prevBtn.addEventListener("click", prev);
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (shuffleBtn) shuffleBtn.addEventListener("click", shuffle);
    if (resetBtn) resetBtn.addEventListener("click", reset);

    if (!prefersReduced) {
      list.addEventListener("pointerdown", onPointerDown);
      list.addEventListener("pointermove", onPointerMove);
      list.addEventListener("pointerup", onPointerUp);
      list.addEventListener("pointercancel", onPointerUp);
    }

    // Keyboard support when the stack is focused.
    stack.setAttribute("tabindex", "0");
    stack.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
    });
  })();

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
