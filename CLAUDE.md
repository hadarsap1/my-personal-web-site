# Hadar Sapir — Personal Website

Static portfolio site. No frameworks, no build tools, no bundler. Edit files directly.

## Files
- `index.html` (~305 lines) — single page, all content
- `style.css` (~1124 lines) — all styles, CSS custom properties in `:root`
- `script.js` (~422 lines) — D3.js travel map + scroll animations
- `profile.jpg` (1MB), `adventure.jpg` (3.6MB) — hero images
- `analytics.js` (~97 lines) — lightweight visitor tracking via Supabase (ipapi.co geo, UA parsing)
- `dashboard.html` (~380 lines) — private analytics dashboard (password-gated, D3.js charts, reads Supabase)
- `.github/workflows/deploy.yml` — GitHub Pages deploy on push to `master`

## Stack
HTML5 + CSS3 + vanilla JS. External: D3.js v7, TopoJSON v3, Inter font, Supabase JS v2 (all CDN). Supabase (free tier) for analytics DB.

## Sections (in order)
`#home` (hero/bento grid) → `#experience` → mid-CTA → `#travel` (D3 map) → `#mission` → `#contact`

## Design Tokens (defined in `style.css :root`)
All colors use `--color-*` vars, radii use `--radius-*`, transitions use `--transition-*`. Max width: `--max-width: 1200px`. Dark theme only. Key palette: navy bg, blue primary, cyan accents, white text.

## Code Patterns
- CSS: BEM-like naming (`.card-hero`, `.btn-primary`, `.section-heading`)
- JS: vanilla DOM APIs, no modules, no imports
- D3 map: Natural Earth projection, lazy-init via IntersectionObserver, coordinates as `[lng, lat]`
- Scroll animations: IntersectionObserver with `.visible` class toggle
- Map data: `cdn.jsdelivr.net/npm/world-atlas@2`
- Breakpoints: 1024px, 768px
- Respects `prefers-reduced-motion`

## Deployment
GitHub Pages from `master` branch. Push to `master` triggers auto-deploy.

## Rules
- NEVER add build tools, bundlers, or frameworks
- NEVER modify the `cities` array data in script.js without explicit request
- NEVER change the deploy workflow without explicit request
- Keep profile photo fallback SVG in index.html
- Use existing CSS custom properties — don't hardcode hex values
- All new sections must follow the `.section > .section-container > .section-badge + .section-heading` pattern
