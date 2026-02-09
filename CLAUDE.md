# Project: Hadar Sapir Personal Website

## Overview
A personal portfolio/landing page for Hadar Sapir (Senior Product & Data). Static site with HTML/CSS/JS — no build tools, no framework.

## Tech Stack
- **HTML5** — Single `index.html` page
- **CSS3** — `style.css` with custom properties, grid layouts, responsive design
- **Vanilla JS** — `script.js` with D3.js for interactive world map
- **Fonts** — Inter (Google Fonts)
- **Libraries** — D3.js v7, TopoJSON v3 (loaded via CDN)

## Architecture
- Single-page site with sections: Hero, Experience, Travel (D3 map), Mission, Contact
- Bento grid layout in hero section
- Interactive travel map using D3.js Natural Earth projection with SVG markers
- Scroll-triggered fade-in animations via IntersectionObserver
- Glass-morphic tooltip design

## Design System
- **Background:** `#0a0e1a` (dark navy)
- **Primary accent:** `#3b82f6` (blue)
- **Secondary accent:** `#22d3ee` (cyan — used for map markers/dots)
- **Text primary:** `#fff`
- **Text secondary:** `#c8cdd8`
- **Text muted:** `#6b7280`
- **Card background:** `#111827`
- **Border style:** `rgba(255, 255, 255, 0.06)` subtle borders

## Code Conventions
- No build step — edit files directly
- CSS uses BEM-like naming (`.card-hero`, `.btn-primary`, `.section-heading`)
- JS uses vanilla DOM APIs, no modules
- D3 code initializes lazily via IntersectionObserver (only when travel section is visible)
- All map coordinates use `[longitude, latitude]` format (D3 convention)

## Important Notes
- Images: `profile.jpg` and `adventure.jpg` — include fallback SVG for profile photo
- The map loads world data from `cdn.jsdelivr.net/npm/world-atlas@2`
- Mobile responsive breakpoints: 1024px and 768px
- Respects `prefers-reduced-motion`
