# Website Upgrade Plan — Job-Search Focus

Goal: make hadarsap.online noticeably more attractive AND turn it into an active job-search asset.
Audience (per PRODUCT.md): recruiters and founders who scan fast and want signal, not polish.

The site's bones are strong — terminal hero, git-log timeline, D3 map, bento system, dark mode.
The gaps are conversion (recruiter can't get the resume instantly), proof depth (no professional
case study), and visual specificity (emoji instead of product screenshots). The plan attacks those
in priority order.

---

## Phase 1 — Remove job-search friction (highest impact)

### 1.1 Instant resume access
Today "Get My Resume" scrolls to an email-capture that opens a mailto and promises delivery
"within 24 hours." Recruiters won't wait — most will bounce.

- Build `/resume/` — an HTML resume page sharing `style.css`, print-optimized (`@media print`)
  so ⌘P produces a clean one-page PDF. Always up to date, no binary in git to forget.
- Add `resume.pdf` (exported from that page) for a one-click **Download PDF** button.
- Hero CTA "Get My Resume" → links straight to `/resume/`. Keep the email field in #contact as a
  secondary "want it in your inbox?" option, not the only path.
- Track `resume_view` / `resume_download` events in `analytics.js` (new event column or reuse
  visits table pattern) so Hadar can see recruiter engagement on the dashboard.

**Needs from Hadar:** current resume content (or approve generating it from site content + LinkedIn).

### 1.2 "What I'm looking for" card
Recruiters need role fit in 5 seconds. Add a compact card near the hero or in #experience's right
column: target roles (Head of Product / Senior PM — AI & data products), location (Israel,
hybrid/remote), availability (immediate), company stage preference. Specific beats vague.

### 1.3 Real contact form
mailto links silently fail for people without a configured mail client. Supabase is already wired
in via REST (`analytics.js` pattern) — add a `messages` table (anon INSERT only, RLS), a small
name/email/message form in #contact, and a Supabase trigger or dashboard check for new messages.
Keep mailto + copy-email as alternatives.

---

## Phase 2 — Visual attractiveness pass

### 2.1 Real product screenshots instead of emoji
The featured Property Landing Builder card shows a 🏡 emoji; project cards use 🍷🏫💰. For a
product leader, showing the actual product is the single biggest visual credibility upgrade.
- Capture clean screenshots of Property Landing Builder, Wine Tracker, Clearday (framed in a
  minimal browser/device mockup, WebP + fallback per image rules).
- Featured card: screenshot fills the right panel with a subtle tilt/hover-zoom.
- Grid cards: thumbnail strip on top of each card.

### 2.2 Editorial typography pass
Fraunces (the distinctive serif) currently appears only in the hero tagline and one pull quote.
Apply it to section display headings ("Experience & Expertise", "Things I've Built", contact
headline) — italic accents on key words. This is the cheapest way to make the site feel
editorial/designed rather than template-y, and it matches DESIGN.md's "handmade, not generated."

### 2.3 Depth & motion micro-polish
- Subtle grain/gradient wash on the page background (light + dark) so sections don't float on flat gray.
- Hover states: project cards get a gentle image parallax; chips already interactive.
- Scroll-linked progress or active-section highlight in the floating nav.
- Marquee logos: slightly larger, mono variants in dark mode if not already.
- All gated behind existing `prefers-reduced-motion` support.

---

## Phase 3 — Proof depth (senior-PM credibility)

### 3.1 One professional case study
Side-project case studies exist; the professional 0→1 story doesn't. Add
`/projects/arpalus-ai-platform/` (NDA-safe): problem → strategy → what shipped → the +3.4%
retail sales lift and 90% reporting-time metrics already cited on the homepage. This is what
senior-PM hiring loops actually read. Link it from the Impact card and the git-log Arpalus entry.

**Needs from Hadar:** 30 min of input on what's shareable.

### 3.2 More testimonials
Three short quotes today. Pull 2–3 more from LinkedIn recommendations (ideally one manager, one
report — shows leading up and down). Consider a "from my LinkedIn recommendations" link.

### 3.3 Refresh /now
Page says June 2026; it's July. A stale /now page signals the opposite of what it's for. Add
"actively interviewing — currently in processes" line if true.

---

## Phase 4 — Discoverability & measurement

- SEO: add `/resume/` + case study to `sitemap.xml`, JSON-LD `Person` → add `seeks` /
  `hasOccupation`; refresh lastmod dates.
- OG card: regenerate if hero positioning copy changes.
- Analytics: dashboard tile for resume views/downloads and contact-form submissions —
  the site becomes a measurable job-search funnel.
- Lighthouse pass at the end: LCP (hero photo already optimized), no CLS from new images
  (explicit width/height), keep 90+ scores.

---

## Sequencing & effort

| Phase | Items | Est. effort | Depends on Hadar |
|-------|-------|-------------|------------------|
| 1 | Resume page + PDF, looking-for card, contact form | 1 session | Resume content ✔ |
| 2 | Screenshots, typography, motion polish | 1–2 sessions | Screenshot approval |
| 3 | Arpalus case study, testimonials, /now refresh | 1 session | Case-study input, quotes |
| 4 | SEO, analytics events, Lighthouse | small, folded into each phase | — |

## Explicitly not doing
- No frameworks/build tools (per CLAUDE.md rules); stays static HTML + Tailwind CDN + vanilla JS.
- No redesign of the D3 map / cities data.
- No blog (high maintenance cost while job searching; /now covers "alive" signal).
