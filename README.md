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
- `script.js` — tabs, theme toggle, mobile menu, form
