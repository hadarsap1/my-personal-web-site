# hadarsapir.com - Personal Portfolio

**Senior Product Leader | Builder | Globe-Trotter** | Built with [Claude Code](https://claude.ai/claude-code)

A static, zero-build portfolio site that tells my professional story through data, travel, and impact — powered by vanilla HTML/CSS/JS, D3.js, and a privacy-first analytics layer.

## Live Site

Deployed on GitHub Pages with auto-deploy on push to `master`.

## What's Inside

### Hero & Professional Identity
Name, role (Head of Product), availability badge, career facts (11+ years, 0-to-1 builds, 25+ countries), and expertise chips — all above the fold.

### Experience Timeline
Career trajectory from Marketing Data Analyst (StoreNext) through Category Manager (Nestle & Kimberly-Clark) to Head of Product (Arpalus). Impact metrics with gradient styling: +3.4% sales lift, 90% reporting time saved.

### Interactive Travel Map (D3.js)
A Natural Earth projection world map plotting **25+ cities across 5 continents** with:
- **12 leadership insight groups** — each region links to a lesson learned on the road
- **Flight path animations** — dashed lines radiating from Israel (home marker with pulsing glow)
- **Click-to-zoom** — select a region from the sidebar passport card to focus the map
- **Hover tooltips** — city name, insight title, leadership lesson
- **Lazy-loaded** — map only initializes when the Travel section scrolls into view

### Mission: Running with Rami
11-year volunteer initiative supporting 100+ PTSD veterans per week in Jerusalem. Full-bleed photo divider with impact story.

### Contact
CTA section with email, LinkedIn, and GitHub links.

## Analytics System

### Visitor Tracking (analytics.js)
Privacy-first tracking via Supabase:
- **Geo data**: Country, city, region, lat/lon, timezone, ISP (via ipwho.is with ipapi.co fallback)
- **Device data**: Type (mobile/tablet/desktop), browser, OS, screen resolution, language
- **Returning visitors**: IP hashed with SHA-256 — raw IP never stored
- **Time on page**: Captured on `visibilitychange`/`beforeunload` with `keepalive` fetch

### Private Dashboard (dashboard.html)
Password-gated analytics UI with:
- **KPI cards**: Total visits, unique visitors, today's count, returning %, avg time on page, top country/city/org
- **Visitor timeline**: D3.js area chart with 7/30/90-day/all-time toggle
- **Geographic map**: Visitor dots sized by visit count with zoom controls
- **Bar charts**: Countries, cities, organizations, screen sizes, languages, timezones
- **Donut charts**: Device type, browser, OS distribution
- **Time histogram**: Visit duration buckets (0-10s, 10-30s, 30-60s, 1-3m, 3-5m, 5m+)
- **Visitor log table**: 100 most recent visits with full metadata
- **Self-contained dark theme**: Independent from main site styling

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **HTML** | Semantic HTML5, no frameworks |
| **CSS** | Tailwind CSS 4 (CDN) + custom CSS for animations/D3 |
| **JavaScript** | Vanilla ES6+, zero bundler |
| **Data Viz** | D3.js + TopoJSON (CDN) |
| **Analytics DB** | Supabase (PostgreSQL) |
| **Geo API** | ipwho.is (primary), ipapi.co (fallback) |
| **Fonts** | Inter (Google Fonts) |
| **Deployment** | GitHub Pages (auto-deploy on push) |

## Design System

| Element | Style |
|---------|-------|
| **Background** | Off-white (`#f8f9fa`) |
| **Cards** | White with glassmorphism (`rgba(255,255,255,0.7)` + 12px blur), 20px radius |
| **Text** | Charcoal (`#111827`), secondary grays for labels |
| **Accents** | Blue (`#3b82f6`) for CTAs, cyan (`#22d3ee`) for map markers |
| **Layout** | Bento grid (4-col desktop, responsive collapse) |
| **Navigation** | Floating dock with glassmorphism, hamburger on mobile |
| **Animations** | Scroll fade-ins via IntersectionObserver, respects `prefers-reduced-motion` |

## File Structure

```
index.html       # Main page — all sections, Tailwind config, semantic structure
style.css        # Custom CSS — card variants, D3 styles, scroll animations
script.js        # D3.js travel map, scroll animations, mobile nav, lazy loading
analytics.js     # Supabase visitor tracking, geo lookup, time-on-page
dashboard.html   # Password-gated analytics dashboard with D3.js charts
profile.jpg      # Hero portrait
adventure.jpg    # Full-bleed divider image (Travel → Mission)
```

## Local Development

```bash
# No build step needed — just serve the files
python3 -m http.server
# or open index.html directly in a browser
```

Test at: 375px (mobile), 768px (tablet), 1024px (desktop).

## About the Builder

**Hadar Sapir** — Senior Product Manager & Builder with 11+ years of experience at Nestle, Kimberly-Clark, and startup scaling (0 to 100). I build tools that solve real-world friction using product thinking and AI-assisted development.
