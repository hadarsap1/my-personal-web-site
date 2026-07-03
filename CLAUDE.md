# Hadar Sapir — Personal Website

Static portfolio site. No build tools, no bundler. Tailwind CSS via pinned CDN (v3.4.17) + custom CSS.

## Files & Edit Landmarks

| File | Lines | What's inside | Key landmarks |
|------|-------|---------------|---------------|
| `index.html` | ~977 | Single page, all content | Sections: `#home`, `#track-record`, `#pillars`, `#experience`, `#references`, `#projects`, `#travel`, `#mission`, `#contact`. Nav: floating dock `#mobile-toggle` / `#mobile-menu` |
| `style.css` | ~1930 | Custom CSS — bento cards, D3 map, animations, dark mode | `.bento-card`, `.gitlog-card`, `.terminal-card`, `.api-card`, D3 map styles, `.fade-in`, `.section-reveal`, dark-mode selectors `html.dark ...` |
| `script.js` | ~737 | D3 travel map, scroll animations, terminal, git-log, API card, theme toggle, pillar tabs | `cities` array (lines 6–32), `insightGroups` (34–47), `initD3Map()`, `initTerminal()`, `initGitLog()`, `initApiCard()`, `initThemeToggle()`, `initPillarTabs()` |
| `analytics.js` | ~248 | Visitor tracking via Supabase REST API (no SDK) | `init()` inserts visit row; `updateEngagement()` patches on leave; geo via `ipwho.is` → `ipapi.co`; salted SHA-256 ip_hash; Supabase table: `visits` |
| `dashboard.html` | ~1321 | Private analytics dashboard | Client-side password gate, D3.js charts, reads `visits` table |
| `404.html` | — | GitHub Pages custom 404 | Auto-served by GitHub Pages for missing routes |
| `now/index.html` | — | /now page (what I'm doing now) | Standalone page, shares `style.css` |
| `projects/clearday/index.html` | — | Clearday case study | — |
| `projects/property-landing-builder/index.html` | — | Property Landing Builder case study | — |
| `projects/wine-tracker/index.html` | — | Wine Tracker case study | — |
| `privacy-policy.html` | — | Privacy policy (linked from contact) | — |
| `logos/` | — | SVG/PNG company logos for marquee strip | arpalus, kimberly-clark, nestle, storenext (color + mono variants) |
| `.github/workflows/deploy.yml` | — | GitHub Pages deploy on push to `master` | — |

## Images

All hero images have WebP versions (served via `<picture>` in index.html):

| File | Size | Used for |
|------|------|----------|
| `profile-linkedin.webp` | 16KB | Hero photo (LCP element, `fetchpriority="high"`) |
| `profile-linkedin.png` | 1.2MB | Fallback for profile WebP |
| `adventure.webp` | 302KB | Full-bleed photo break |
| `adventure.jpg` | 3.6MB | Fallback for adventure WebP |
| `mission-running.webp` | 80KB | Running with Rami section |
| `mission-running.png` | 1.6MB | Fallback for mission WebP |
| `og-card.webp` | 20KB | Social sharing OG card |
| `og-card.png` | 879KB | Fallback for OG card |

When adding or replacing images: produce a WebP at display resolution, keep the original as fallback, wrap in `<picture>` in HTML.

## Stack

HTML5 + Tailwind CSS 3.4.17 (CDN, pinned) + vanilla JS. External CDN libs: Tailwind CSS, D3.js v7, TopoJSON v3. Fonts: DM Sans + Fraunces + JetBrains Mono (Google Fonts). Supabase free tier for analytics (table: `visits`). Analytics uses direct REST `fetch` — no supabase-js SDK needed.

## Design System

**Theme**: Light/dark toggle persisted in `localStorage`. Default follows `prefers-color-scheme`. Dark mode uses `html.dark` class set by inline script before first paint (FOUC prevention at `index.html:27`).

- Light: `#f8f9fa` bg, white cards, `#111827` text, `#0d9488` teal accent
- Dark: `#0a0e1a` bg, `#111827` cards, `#f9fafb` text, `#0d9488` teal accent

**Typography**:
- Body: `DM Sans` (sans-serif)
- Display headings: `Fraunces` (serif, italic)
- Code/terminal/mono: `JetBrains Mono`

**Card system**: `.bento-card` — white bg, 24px radius, 1px `#e5e7eb` border, subtle shadow + hover lift. Variants: `.bento-card-dark` (inverted), `.bento-card-accent` (warm tint). Dark-mode overrides in `style.css` under `html.dark .bento-card`.

**Navigation**: Floating pill nav (glassmorphic, `backdrop-blur`). Desktop: `.nav-link` items + `#theme-toggle`. Mobile: `#mobile-toggle` reveals `#mobile-menu`.

## Section Order (index.html)

`#home` → `#track-record` (logo marquee) → `#pillars` (tabbed 01/02/03) → `#experience` (git-log timeline) → `#references` (testimonials) → `#projects` (featured + grid) → `#travel` (D3 map) → adventure photo break → `#mission` (Running with Rami) → `#contact` → footer

## Code Patterns

- **CSS**: Tailwind utilities for layout, spacing, color. `style.css` only for: `.bento-card` chrome, scroll animations, D3 map elements, terminal/gitlog/api-card chrome, dark-mode overrides, reduced-motion, section reveals.
- **JS**: Vanilla DOM APIs only. No modules, no imports, no npm.
- **Dark mode**: `html.dark` class. CSS selectors pattern: `html.dark .some-class { ... }`. Tailwind `dark:` prefix also works because `darkMode: 'class'` is set in the inline config.
- **D3 map**: Natural Earth projection, lazy-init via IntersectionObserver on `#travel`. Coords as `[lng, lat]`. Dark bg (`#0a0e1a`). `cities` array in `script.js:6` — **never modify without explicit request**.
- **Scroll animations**: IntersectionObserver adds `.visible` to `.fade-in` / `.section-reveal` elements.
- **Map data**: `cdn.jsdelivr.net/npm/world-atlas@2`.
- **Mobile nav**: `#mobile-toggle` toggles `hidden` on `#mobile-menu`.
- **Analytics**: `analytics.js` uses plain `fetch` against Supabase REST API — no SDK. `visitId` stored in `sessionStorage`; cross-tab deduplication via `localStorage`. IP hashed with salt before storage.
- **Responsive**: Tailwind breakpoints (`sm:`, `md:`, `lg:`). Test at 375px, 768px, 1024px, 1280px+.

## Deployment & Git

- GitHub Pages from `master` branch. Push to `master` = auto-deploy.
- **Create a feature branch** for any multi-file change. Only push to `master` when explicitly asked.
- Commit messages: imperative mood, short (`add contact form`, `fix mobile nav overlap`).

## Validation

No build step. To verify changes:
1. `python3 -m http.server` in project root → open `localhost:8000`
2. Check mobile at 375px and 768px widths
3. Toggle dark mode — confirm no unstyled flicker
4. Confirm no console errors
5. If editing `analytics.js` or `dashboard.html`: verify Supabase calls in Network tab

## Supabase Analytics (security note)

The `visits` table uses anon `INSERT` + `UPDATE` via RLS. For a future hardening pass: restrict anon to `INSERT` only, move engagement updates to a Postgres RPC, and gate dashboard reads via an Edge Function with a real secret instead of client-side password.

## Rules

**NEVER:**
- Add build tools, bundlers, or frameworks (Tailwind CDN is OK — it is pinned to 3.4.17)
- Modify the `cities` array in `script.js` without explicit request
- Change the deploy workflow without explicit request
- Commit directly to `master` for multi-file changes without asking
- Bump the Tailwind CDN URL without also verifying all utility classes still render

**ALWAYS:**
- Read the specific file section before editing (use landmarks above to target reads)
- Keep the `<picture>` + fallback `<img>` pattern for images; add WebP alongside any new image
- Keep the profile photo fallback SVG `onerror` in `index.html`
- Use Tailwind utility classes for layout/spacing/color; only add to `style.css` for animations, D3, card chrome, or dark-mode overrides
- Update `sitemap.xml` lastmod dates when making content changes
