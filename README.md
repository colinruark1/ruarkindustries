# Ruark Industries

Personal site for Colin Ruark — AI Courses, Consulting & Work for Hire.

Built with **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4**, and
**shadcn/ui**, with **Magic UI** components available via the shadcn registry.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Structure

```
src/
  app/
    layout.tsx        Root layout: fonts (Fraunces / Lora / Libre Baskerville),
                      no-flash theme init, global CSS imports.
    page.tsx          Renders <SiteApp/>.
    globals.css       Tailwind v4 theme + shadcn design tokens (brand palette).
    legacy.css        Original site styles, scoped into @layer components with
                      --lg-* prefixed variables so Tailwind/shadcn always win.
  components/
    site-app.tsx      Client orchestrator: tab state, hash sync, scroll/focus.
    site/
      nav.tsx         Tab navigation context + <TabLink>.
      panel.tsx       Tab-panel wrapper.
      site-header.tsx Nav, mobile menu, theme toggle (View Transitions wipe).
      panels/         Home, About, Courses, Consult, Portfolio, Contact.
      portfolio-cardstack.tsx   Draggable stacked-cards showcase.
      calendly-embed.tsx        Lazy-loaded, theme-aware Calendly widget.
    ui/               shadcn + Magic UI components (button, aurora-text,
                      dot-pattern, animated-shiny-text, …).
public/
  images/             Hero photos + logos.
src/fonts/            Self-hosted Lora & Libre Baskerville.
```

## Theming

Light/dark is driven by `data-theme` on `<html>` (persisted under `cr-theme`,
defaulting to the system preference). Both the original design tokens (`--lg-*`)
and the shadcn tokens respond to it.

## Adding components

This project keeps the shadcn registry wired up, so dropping in new components
is a single command:

```bash
npx shadcn@latest add "https://magicui.design/r/<component>.json"   # Magic UI
npx shadcn@latest add "https://21st.dev/r/<...>"                    # 21st.dev
npx shadcn@latest add <component>                                   # shadcn/ui
```

> Note: Magic UI's animated components require the `motion` package
> (`npm install motion`), and shadcn's current "nova" preset uses Base UI —
> polymorphic components use the `render` prop, not `asChild`.

## Booking

The Contact tab embeds Calendly (`CALENDLY_URL` in
[src/components/site/calendly-embed.tsx](src/components/site/calendly-embed.tsx)).
