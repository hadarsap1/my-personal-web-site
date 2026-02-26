# Hadar Sapir — Personal Website

Static portfolio site. No build tools, no bundler. Tailwind CSS via CDN + minimal custom CSS.

## Files & Edit Landmarks

| File | Lines | What's inside | Key landmarks |
|------|-------|---------------|---------------|
| `index.html` | ~398 | Single page, all content, Tailwind CDN + inline config | Sections: `#home` (bento grid), `#experience`, `#travel`, `#mission`, `#contact`. Nav: floating dock with `#mobile-toggle`, `#mobile-menu` |
| `style.css` | ~254 | Minimal custom CSS (bento cards, D3 map, animations) | `.bento-card` base, D3 map dark styles, `.fade-in` scroll animations, `.location-item` sidebar, `prefers-reduced-motion` at end |
| `script.js` | ~310 | D3.js travel map + scroll animations + mobile nav | `cities` array (~line 1-80), `initD3Map()`, IntersectionObserver for `.bento-card`, mobile menu toggle |
| `analytics.js` | ~97 | Visitor tracking via Supabase | `trackVisit()` on load; ipapi.co geo lookup, UA parsing |
| `dashboard.html` | ~380 | Private analytics dashboard | Password gate, D3.js charts, reads Supabase `page_views` table |
| `profile.jpg` | 1MB | Hero image | — |
| `adventure.jpg` | 3.6MB | Hero image | — |
| `.github/workflows/deploy.yml` | — | GitHub Pages deploy on push to `master` | — |

## Stack

HTML5 + Tailwind CSS (CDN) + vanilla JS. External CDN libs: Tailwind CSS, D3.js v7, TopoJSON v3, Inter font, Supabase JS v2. Supabase free tier for analytics DB (table: `page_views`).

## Layout Architecture

**Bento Grid** — 4-column CSS Grid via Tailwind (`grid-cols-4`) on desktop, collapses to `grid-cols-1` on mobile. Cards use `.bento-card` class (defined in `style.css`) for consistent styling: white bg, 24px radius, 1px border, subtle shadow with hover lift.

**Navigation** — Floating dock (centered pill, `backdrop-blur`, glassmorphic). Desktop: horizontal nav links (`.nav-link`). Mobile: hamburger `#mobile-toggle` reveals `#mobile-menu` dropdown.

## Section Order

`#home` (hero bento grid) → stats row → `#experience` (timeline + expertise badges) → `#travel` (D3 map + passport sidebar) → `#mission` (Running with Rami) → `#contact` (CTA)

To add a new section: insert a `<section>` in `index.html`, use Tailwind utility classes for layout, add `.bento-card` class to card elements. Only add to `style.css` for animations or D3-specific styles.

## Design System

**Theme**: Light — off-white bg (`bg-gray-50` / `#f9fafb`), white cards, gray-900 text. Blue accents (`blue-600`), cyan for map markers (`#22d3ee`).

**Styling approach**: Tailwind utility classes for layout, spacing, typography, colors. Custom CSS in `style.css` only for: `.bento-card` base, scroll animations, D3 map elements, and reduced-motion preferences.

**Font**: Inter (Google Fonts CDN), tight letter-spacing on headings (`tracking-tight`).

## Code Patterns

- **CSS**: Tailwind utilities for most styling. `style.css` for `.bento-card`, `.fade-in`, D3 map styles, `.location-item` sidebar. No `:root` vars — Tailwind handles design tokens.
- **JS**: Vanilla DOM APIs only. No modules, no imports, no `npm`.
- **D3 map**: Natural Earth projection, lazy-init via IntersectionObserver, coords as `[lng, lat]`. Dark card context (`#0a0e1a` bg).
- **Scroll animations**: IntersectionObserver adds `.visible` class to `.bento-card.fade-in` elements.
- **Map data**: `cdn.jsdelivr.net/npm/world-atlas@2`.
- **Mobile nav**: `#mobile-toggle` toggles `hidden` class on `#mobile-menu`.
- **Responsive**: Tailwind breakpoints (`sm:`, `md:`, `lg:`). Respects `prefers-reduced-motion`.

## Deployment & Git

- GitHub Pages from `master` branch. Push to `master` = auto-deploy.
- **Create a feature branch** for any multi-file change. Only push to `master` when explicitly asked.
- Commit messages: imperative mood, short (`add contact form`, `fix mobile nav overlap`).

## Validation

No build step. To verify changes work:
1. Open `index.html` directly in browser (or `python3 -m http.server` in project root)
2. Check mobile layout at 375px and 768px widths
3. Confirm no console errors
4. If editing `analytics.js` or `dashboard.html`: verify Supabase calls in Network tab

## Rules

**NEVER:**
- Add build tools, bundlers, or frameworks (Tailwind CDN is OK)
- Modify the `cities` array in `script.js` without explicit request
- Change the deploy workflow without explicit request
- Commit directly to `master` for multi-file changes without asking

**ALWAYS:**
- Read the specific file section before editing (use landmarks above to target reads)
- Keep the profile photo fallback SVG in `index.html`
- Use Tailwind utility classes for layout/spacing/color; only add to `style.css` for animations or D3-specific styles
- Test responsiveness at 375px, 768px, 1024px, and desktop widths
