---
name: Hadar Sapir — Personal Site
description: A PM's working portfolio. Proof over polish. Signal over noise.
colors:
  teal-action: "#0d9488"
  teal-deep: "#0f766e"
  teal-light: "#2dd4bf"
  teal-subtle: "#5eead4"
  cyan-signal: "#22d3ee"
  night-canvas: "#0a0e1a"
  panel-dark: "#0d1117"
  panel-dark-border: "#30363d"
  ink: "#111827"
  gray-mid: "#374151"
  gray-soft: "#6b7280"
  gray-muted: "#9ca3af"
  gray-border: "#e5e7eb"
  gray-surface: "#f3f4f6"
  day-canvas: "#f9fafb"
typography:
  display:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.10em"
  mono:
    fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace"
    fontSize: "0.775rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  pill: "9999px"
  card: "20px"
  card-mobile: "16px"
  inner: "12px"
  icon: "10px"
  chip: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.teal-action}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.teal-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "#d1d5db"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  chip-default:
    backgroundColor: "rgba(243, 244, 246, 0.5)"
    textColor: "{colors.gray-soft}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  chip-blue:
    backgroundColor: "#f0fdfa"
    textColor: "{colors.teal-action}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  bento-card:
    backgroundColor: "rgba(255, 255, 255, 0.7)"
    rounded: "{rounded.card}"
    padding: "24px"
  bento-card-dark:
    backgroundColor: "{colors.panel-dark}"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Hadar Sapir — Personal Site

## 1. Overview

**Creative North Star: "The Maker's Portfolio"**

This is a portfolio built by someone who builds things. The design doesn't perform ambition — it demonstrates it. Every structural choice is a proof point: a real git log instead of a timeline graphic, a real D3 map instead of a flag-emoji list, a real terminal card instead of a pull quote. The system is clean and purposeful because the work itself provides the personality, and decoration would only dilute the signal.

The palette is restrained in the light mode — cream canvas, white glass cards, one teal accent — with deliberate contrast pockets: dark code panels (terminal, git log, API response) that live inside light-mode cards and make the technical depth visible without overwhelming. Dark mode inverts the base but keeps the same logic: one accent, dark glass, the same code panels unchanged.

This system explicitly rejects: SaaS-cream + purple gradient aesthetics, "passionate problem-solver" copy energy expressed through rounded pastel UI, bento grids where every card is the same size and says the same kind of thing, gradient text on hero names, and the hero-metric template (big glowing number + supporting stats + gradient accent). The distinctiveness comes from specificity, not decoration.

**Key Characteristics:**
- Restrained light base with deliberate dark inserts (not a dark-mode-first design)
- One accent color (`#0d9488`) used sparingly; cyan (`#22d3ee`) is reserved for data/code contexts only
- Glassmorphic cards in light mode; tonal dark glass in dark mode
- Monospace as a semantic signal — only inside genuine code/data components
- Hover states that lift, not glow — physical metaphor, not tech metaphor

## 2. Colors: The Proof Palette

Two worlds live in this palette: the clean light surface where content breathes, and the dark technical inserts where data lives. The accent bridges both.

### Primary
- **Action Teal** (`#0d9488`): The single accent. Used on primary buttons, focus rings, active states, timeline dots, and the terminal dollar prompt. Its rarity is the point — when it appears, something is interactive or important.
- **Action Teal Deep** (`#0f766e`): Hover state for Action Teal only. Never used as a base color independently.

### Secondary
- **Teal Light** (`#2dd4bf`): Gradient terminus, chip color in dark mode, tooltip label text inside dark panels. Never used on light backgrounds — only where Action Teal would be too saturated.
- **Teal Subtle** (`#5eead4`): Chip text in dark mode, hover tints on dark active states. Background tints use `rgba(13, 148, 136, 0.08–0.12)`, not this value directly.

### Tertiary
- **Signal Cyan** (`#22d3ee`): Reserved exclusively for data/code/map contexts — D3 map markers, terminal caret, API method badges, git log star. Never appears in navigation, buttons, or prose UI. Its scarcity makes it read as "technical output", not "brand accent".

### Neutral
- **Night Canvas** (`#0a0e1a`): Dark mode page background. Also the map container background regardless of theme — the map is always dark.
- **Panel Dark** (`#0d1117`): Terminal card and git log card background. Slightly lighter than Night Canvas; the distinction creates subtle depth within dark contexts.
- **Panel Border** (`#30363d`): Border for dark code panels.
- **Ink** (`#111827`): Primary text in light mode, dark card background (CTA section).
- **Gray Mid** (`#374151`): Secondary text, dark card borders.
- **Gray Soft** (`#6b7280`): Tertiary text, meta information, disabled states.
- **Gray Muted** (`#9ca3af`): Labels in dark mode, de-emphasized copy.
- **Gray Border** (`#e5e7eb`): Card borders, dividers in light mode.
- **Gray Surface** (`#f3f4f6`): Social link backgrounds, chip backgrounds, input fills.
- **Day Canvas** (`#f9fafb`): Page background in light mode.

### Named Rules
**The One Accent Rule.** Action Teal (`#0d9488`) is the only color that can appear on interactive elements in prose UI (buttons, focus rings, active nav states). Signal Cyan (`#22d3ee`) is data-only — map, terminal, API — and must not appear in navigation, chips, or callouts.

**The Dark Insert Rule.** Dark panels (terminal, git log, API response) are not dark-mode UI. They are deliberate contrast inserts that exist in both light and dark mode unchanged. Do not make them adapt to the theme toggle.

## 3. Typography

**Body Font:** Inter (Google Fonts CDN), with `-apple-system, sans-serif` fallback.
**Mono Font:** SF Mono → Fira Code → Cascadia Code → Courier New, monospace. Used only inside code panels.

**Character:** Inter's neutral geometry gives every card room to breathe; the tight negative letter-spacing on display and headline sizes creates the confident compression of a well-typeset resume, not the bouncy energy of a startup site.

### Hierarchy
- **Display** (900 weight, `clamp(2.5rem, 5vw, 4rem)`, -0.05em tracking, line-height 1.05): Hero name only. One instance per page. Small screens disable the gradient treatment and fall back to solid ink.
- **Headline** (700 weight, `1.5rem`, -0.02em tracking, line-height 1.25): Section headings, card primary titles. Never capitalized in full — title case only.
- **Title** (700 weight, `0.875–1rem`, -0.01em tracking): Card subheadings, company names in the timeline, commit messages in the git log.
- **Body** (400 weight, `0.9375rem`, line-height 1.7): Prose content. Cap at 65ch per line. Color: Ink (`#111827`) in light, gray-mid (`#d1d5db`) in dark.
- **Label** (700 weight, `0.65–0.72rem`, 0.06–0.14em tracking, UPPERCASE): Year stamps, section eyebrows, chip text, API keys, git metadata. The uppercase + tight size + high tracking creates the "system label" register — terse, structural.
- **Mono** (400 weight, `0.775rem`, line-height 1.6): Terminal commands, API JSON lines, git hashes. Never used outside dark code panels.

### Named Rules
**The Gradient Text Ban.** The hero name uses a CSS gradient clip (`background-clip: text`) because the effect is a subtle gray-to-gray on ink. This is the single permitted use. No rainbow gradients, no teal-to-cyan gradients, no gradient text in headings or chips. If it looks like a Dribbble shot, stop.

**The Mono Quarantine Rule.** Monospace type is a semantic signal meaning "this is data/code output." It is prohibited in navigation, cards, chips, or any prose context. Its presence inside dark panels is precisely what makes those panels readable as technical artifacts.

## 4. Elevation

This system is flat-by-default in light mode with two explicit exception layers, and fully flat in dark mode (where tonal contrast replaces shadows).

**Light mode:** Cards sit 1px above the page with a near-invisible ambient shadow (`0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)`). Hover lifts them physically with a larger shadow + 4px translateY. The hover lift is the primary depth signal — not the resting shadow.

**Dark inserts (terminal, git log, API):** These dark panels have heavier shadows (`0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)`) that read as embedded objects, not floating cards.

**Dark mode:** Glassmorphic cards use tonal layering (darker base, lighter card, no shadow). Shadows are suppressed in favor of the `border: 1px solid rgba(255,255,255,0.06)` hairline that separates surfaces.

### Shadow Vocabulary
- **Resting** (`0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)`): All bento cards at rest in light mode.
- **Hover lift** (`0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)` + `translateY(-4px)`): Bento cards on hover. The physical metaphor is a card being picked up, not glowing.
- **Dark insert** (`0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)`): Terminal, git log, and CTA dark cards. These never lift on hover.
- **Button glow** (`0 4px 16px rgba(13,148,136,0.35)`): Primary button on hover only. The only teal-colored shadow in the system.

### Named Rules
**The Flat-at-Rest Rule.** Shadows exist only as state responses. At rest, a card's depth comes from its white glass background against the cream canvas — not from a shadow. Adding a dramatic resting shadow makes the card look like a landing page template.

## 5. Components

### Buttons
Clean pill shape with decisive color. No border-radius ambiguity — fully pill (`9999px`) or nothing.

- **Shape:** Full pill (`border-radius: 9999px`)
- **Primary:** Action Teal (`#0d9488`) fill, white text, `0.75rem 1.5rem` padding, 700 weight, `0.875rem` size. Hover: deep teal (`#0f766e`) + `translateY(-1px)` + button glow shadow.
- **Focus:** `outline: 2px solid #0d9488; outline-offset: 2px` — consistent with the global focus ring.
- **Ghost (secondary):** Transparent fill, `#374151` border (1px), `#d1d5db` text. Hover: teal `rgba(13,148,136,0.1)` tint, `#5eead4` text, teal border tint. Used only in dark card contexts (CTA section).

### Chips
Low-profile pill tags. Two semantic variants — not visual decoration.

- **Default:** `rgba(243,244,246,0.5)` fill, gray-soft text, `rgba(229,231,235,0.6)` border. Used for supporting skills and secondary labels.
- **Blue (Superpower):** `#f0fdfa` fill, teal-action text, `#ccfbf1` border. Used for core competency chips only — the teal signals primary capability.
- **Shape:** Full pill. `0.3rem 0.75rem` padding. `0.72rem` size, 500 weight.
- **Interactive:** Chips in the expertise section have a hover shadow and 12ms transform on tilt interaction. No color change on hover — the chip tilt is a delight detail, not a state signal.

### Cards / Containers
The system's primary layout unit. Two families: light glass (most cards) and dark panel (code/data inserts).

- **Bento card (light):** `rgba(255,255,255,0.7)` background, `backdrop-filter: blur(12px)`, `border-radius: 20px` (16px mobile), `1px solid rgba(255,255,255,0.3)` border, resting shadow. Hover: lift shadow + `translateY(-4px)` + border brightens to `rgba(255,255,255,0.5)`.
- **Bento card (dark, CTA):** `#111827` fill, `#374151` border, heavier shadow. Does not lift on hover.
- **Bento card (accent, mission):** `rgba(240,253,250,0.8)` teal-tinted fill, `#99f6e4` border. Used once — mission pull quote. Not a reusable pattern.
- **Terminal / Git log / API card:** `#0d1117` fill, `#30363d` border, `border-radius: 12–20px`. Always dark regardless of theme. Title bars at `#161b22`. No hover lift.
- **Internal padding:** `24px` standard. `1.75rem 1.5rem` inside dark code panels.

### Inputs / Fields
- **Style:** Minimal — no visible fill in light mode, `1px solid rgba(255,255,255,0.08)` border in dark contexts.
- **Focus:** `outline: 2px solid #0d9488; outline-offset: 2px` — same as the global focus ring. No custom inset border shift.

### Navigation
Floating pill dock — centered, glassmorphic, position-fixed at top.

- **Container:** `backdrop-filter: blur(16px)`, `rgba(255,255,255,0.8)` fill, `1px solid rgba(255,255,255,0.2)` border, `border-radius: 9999px`, top offset + drop shadow.
- **Links (`.nav-link`):** `0.8125rem`, 500 weight, `#6b7280` default. Hover: `#111827` + `rgba(0,0,0,0.07)` pill background. Active: `#111827` + `rgba(0,0,0,0.07)` (`.nav-active`).
- **CTA pill ("Get in Touch"):** `#111827` fill, white text, pill, same size. The only filled nav element.
- **Mobile:** Hamburger reveals a `backdrop-filter` dropdown below the dock. Same typography, full-width links with pill hover.
- **Dark mode:** All fills invert; the logo and CTA become `#f9fafb` on `#0a0e1a`.

### Signature: Dark Code Panels
The system's most distinctive element. Three variants (terminal, git log, API response) share the same construction logic: `#0d1117` base, `#161b22` title bar, `#30363d` borders, monospace throughout, `#22d3ee` (Signal Cyan) for the primary data accent.

- **Terminal:** Blinking caret (`#22d3ee`), green dollar prompt (`#0d9488`), white command text, dim/ok/accent output lines in gray-soft, green, and cyan. Typewriter animation on the command.
- **Git log:** Expandable commits. Orange hash (`#f0a050`), cyan HEAD tag, gray metadata. Expand/collapse via grid-template-rows transition (no height animation — layout-safe).
- **API response:** Fade-in JSON lines, blue keys (`#7dd3fc`), green strings (`#86efac`), status dot with pulse animation.

## 6. Do's and Don'ts

### Do:
- **Do** use Action Teal (`#0d9488`) as the single interactive accent — buttons, focus rings, active dots, active sidebar items. Its rarity is the signal.
- **Do** use dark code panels (terminal, git log, API) as proof-of-technical-depth inserts. They should feel like real artifacts embedded in the page, not decorative dark cards.
- **Do** lift cards on hover with `translateY(-4px)` — the physical metaphor of picking up a card. Transitions at `0.4s ease`.
- **Do** use uppercase labels (`0.68rem`, 700 weight, `0.10em` tracking) for section eyebrows, year stamps, chip text, and API field names. The uppercase register signals "structural information."
- **Do** preserve `prefers-reduced-motion` overrides — disable all animations and transitions for users who opt out.
- **Do** maintain Signal Cyan (`#22d3ee`) exclusively inside dark code/data panels. If it appears in a light-mode chip or a nav element, it's wrong.
- **Do** keep body line length at 65ch max in prose cards.

### Don't:
- **Don't** use gradient text on headings, chips, or any element outside the hero name's subtle gray-to-gray treatment. Gradient text is the single most recognizable mark of an AI-generated portfolio.
- **Don't** make every bento card the same size with the same content structure (icon + heading + paragraph). The grid's power is its variety — different card sizes, different content registers (number, timeline entry, code panel, photo).
- **Don't** use Signal Cyan (`#22d3ee`) as a brand accent in prose UI. It is data-only. A teal chip with cyan text is wrong; a terminal prompt with cyan is correct.
- **Don't** add dramatic resting shadows to light bento cards. The resting state is nearly flat; the hover is where depth appears. A heavy resting shadow reads as a landing page template.
- **Don't** use the hero-metric template: big number + small label + gradient accent. The fact rows (`11+ years`, `0→100 scaling`) use this construction — they work because the numbers are real and specific. Do not replicate the visual pattern for fabricated or generic stats.
- **Don't** write copy with adjective-stacks: "passionate," "driven," "results-oriented," "cross-functional." Every word of copy should carry a specific claim or proof point, not a personality assertion.
- **Don't** add monospace type outside dark code panel contexts. Not in chips, not in nav, not in card titles.
- **Don't** use glassmorphism as decoration on dark panels — the dark code panels intentionally have no backdrop blur. Blur belongs to light glass cards on the cream canvas.
- **Don't** introduce new accent colors (purple, orange, pink, magenta) without explicit discussion. The palette is deliberately tight: one warm accent (teal), one cold data color (cyan), everything else neutral.
