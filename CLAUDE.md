# Hadar Sapir — Personal Website

Static portfolio site. No frameworks, no build tools, no bundler. Edit files directly.

## Files & Edit Landmarks

| File | Lines | What's inside | Key landmarks |
|------|-------|---------------|---------------|
| `index.html` | ~305 | Single page, all content | Sections: `#home`, `#experience`, `#mid-cta`, `#travel`, `#mission`, `#contact` |
| `style.css` | ~1124 | All styles, CSS vars in `:root` | `:root` vars at top; media queries at bottom (1024px, 768px) |
| `script.js` | ~422 | D3.js travel map + scroll animations | `cities` array (~line 1-80), `initMap()`, IntersectionObserver setup |
| `analytics.js` | ~97 | Visitor tracking via Supabase | `trackVisit()` on load; ipapi.co geo lookup, UA parsing |
| `dashboard.html` | ~380 | Private analytics dashboard | Password gate, D3.js charts, reads Supabase `page_views` table |
| `profile.jpg` | 1MB | Hero image | — |
| `adventure.jpg` | 3.6MB | Hero image | — |
| `.github/workflows/deploy.yml` | — | GitHub Pages deploy on push to `master` | — |

## Stack

HTML5 + CSS3 + vanilla JS. External CDN libs only: D3.js v7, TopoJSON v3, Inter font, Supabase JS v2. Supabase free tier for analytics DB (table: `page_views`).

## Section Order

`#home` (hero/bento grid) → `#experience` → `#mid-cta` → `#travel` (D3 map) → `#mission` → `#contact`

To add a new section: insert a `<section>` between existing ones in `index.html`, follow the `.section > .section-container > .section-badge + .section-heading` pattern, add styles to `style.css` before the media queries block.

## Design Tokens (`:root` in `style.css`)

Colors: `--color-*` vars. Radii: `--radius-*`. Transitions: `--transition-*`. Max width: `--max-width: 1200px`. Dark theme only. Palette: navy bg (`--color-bg`), blue primary (`--color-primary`), cyan accents (`--color-accent`), white text (`--color-text`).

**Always use existing CSS custom properties. Never hardcode hex/rgb values.**

## Code Patterns

- **CSS**: BEM-like (`.card-hero`, `.btn-primary`, `.section-heading`). New styles go before media queries.
- **JS**: Vanilla DOM APIs only. No modules, no imports, no `npm`.
- **D3 map**: Natural Earth projection, lazy-init via IntersectionObserver, coords as `[lng, lat]`.
- **Scroll animations**: IntersectionObserver adds `.visible` class.
- **Map data**: `cdn.jsdelivr.net/npm/world-atlas@2`.
- **Responsive**: Breakpoints at 1024px and 768px. Respects `prefers-reduced-motion`.

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
- Add build tools, bundlers, or frameworks
- Modify the `cities` array in `script.js` without explicit request
- Change the deploy workflow without explicit request
- Hardcode color/spacing values — use CSS custom properties
- Commit directly to `master` for multi-file changes without asking

**ALWAYS:**
- Read the specific file section before editing (use landmarks above to target reads)
- Keep the profile photo fallback SVG in `index.html`
- Follow `.section > .section-container > .section-badge + .section-heading` for new sections
- Test responsiveness at 375px, 768px, 1024px, and desktop widths
