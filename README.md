# ruarkindustries — Personal Site

Base concept for a personal website highlighting **AI Courses**, **Consultations**, and **Work for Hire**. Serving Small Businesses.

## Pages / Tabs
Home · About · Courses · Consult · Portfolio · Contact

All content is placeholder Lorem Ipsum — ready to be replaced.

## Features
- Single-page tabbed navigation (hash-aware, shareable links)
- **Light & Dark mode** toggle (persists in `localStorage`, falls back to system preference)
- Fully responsive with a mobile menu
- Accessible: skip link, focus states, reduced-motion support
- No build step — plain HTML/CSS/JS

## Color Palette
| Hex | Use |
|---|---|
| `#F2F0EF` | Light background |
| `#BBBDBC` | Neutral gray |
| `#245F73` | Primary (teal) |
| `#733E24` | Secondary (brown) |

## Run
Just open `index.html` in a browser, or serve locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files
- `index.html` — markup & content
- `styles.css` — theming (CSS variables) + layout
- `script.js` — tabs, theme toggle, mobile menu, Calendly widget
- `server/` — *(optional/unused)* Node/Express Microsoft Bookings backend

## Meeting scheduler (Calendly)

The **Contact** tab embeds a [Calendly](https://calendly.com) inline widget so
visitors can book a meeting directly. It needs no backend or API keys.

**Set your link:** open `index.html`, find the Contact section, and replace the
placeholder URL:

```html
<script>window.CALENDLY_URL = "https://calendly.com/your-name/30min";</script>
```

The widget lazy-loads when the Contact tab is opened and automatically recolors
to match the site's light/dark theme. Until the link is set, the embed shows a
short "set your Calendly link" note instead of the calendar.

> The `server/` folder holds an earlier Microsoft Bookings + Teams API. It is
> **not used** by the current Calendly setup — kept only as a reference/option.
