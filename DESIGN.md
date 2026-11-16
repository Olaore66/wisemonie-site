---
name: Wisemonie
description: A night ledger for salary that is already spoken for. One oxide accent, Besley for the sums, Figtree for the rest.
colors:
  ink: "#17211c"
  ink-strong: "#101612"
  paper: "#eef1ec"
  paper-soft: "#e4e8e2"
  surface: "#f7f8f5"
  surface-strong: "#fbfcfa"
  border: "#c9d2cb"
  muted: "#3d4f46"
  accent: "#0e6b4e"
  accent-deep: "#0a4a36"
  on-accent: "#f4f7f4"
  on-ink: "#f3f6f2"
  on-ink-soft: "#d5e0d8"
typography:
  display:
    fontFamily: "Besley, Iowan Old Style, Palatino Linotype, Palatino, serif"
    fontSize: "clamp(2.7rem, 6.4vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Besley, Iowan Old Style, Palatino Linotype, Palatino, serif"
    fontSize: "clamp(1.7rem, 3vw, 2.45rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Figtree, Segoe UI, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0em"
  body:
    fontFamily: "Figtree, Segoe UI, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Figtree, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.02em"
rounded:
  control: "3px"
  mark: "2px"
spacing:
  gutter: "clamp(24px, 5vw, 40px)"
  section: "4rem"
  band: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    padding: "0 1.1rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.control}"
    padding: "0 1.1rem"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0 1.1rem"
    height: "48px"
  input:
    backgroundColor: "{colors.surface-strong}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "0.6rem 0.8rem"
    height: "48px"
---

# Design System: Wisemonie

## Overview

**Creative North Star: "The Night Ledger"**

The page is the quiet hour after payday, when the salary is already spoken for and each named envelope is waiting for its clock. The strong idea is the split itself: a bar of committed money, with oxide green only on what is left to live. Everything else is paper, ink, and a rule.

This is a ledger, not a bank brochure and not an Apple marketing page. Sections do not share a layout. The salary split, the problem statement, the envelope rules, the feature index, the numbered plan, and the week timetable each have their own structure. Motion is one fill on the salary bar and a short press on controls. Both can be interrupted, and both stop under reduced motion.

The first DESIGN.md for this repo was a scan of the retired mint grid. This file replaces that scan. The logo still carries lime, mint, and teal inside the mark only. The interface does not echo them.

**Key Characteristics:**

- One accent, oxide green, used for what remains and for the primary action.
- Besley for sums and headlines, Figtree for UI and body.
- Rules and type carry the sections. Cards, pills, and icon tiles do not.
- Ink bands use a light green-gray text, never neutral gray.
- The wordmark stays on its night plate. Do not recolor the SVG.

## Colors

Paper is a green-gray, not cream. Ink is a near-black green. Oxide is the only accent.

### Primary

- **Oxide** (`colors.accent`): the left-to-live slice, the primary button, the focus ring, and the clock times.
- **Oxide deep** (`colors.accent-deep`): the pressed and hovered primary button.
- **On oxide** (`colors.on-accent`): text on the primary button. Light, not gray.

### Neutral

- **Ledger ink** (`colors.ink`): body text on paper.
- **Night ink** (`colors.ink-strong`): headlines, committed slices of the salary bar, and full-bleed bands.
- **On ink** (`colors.on-ink`): text on a night band.
- **On ink soft** (`colors.on-ink-soft`): secondary text on a night band. A tinted light green, not gray.
- **Paper** (`colors.paper`): the page.
- **Paper soft** (`colors.paper-soft`): the empty track behind the salary bar.
- **Surface** (`colors.surface-strong`): inputs.
- **Rule** (`colors.border`): 1px dividers.
- **Muted** (`colors.muted`): secondary text on paper only. Never on oxide or on a night band.

### Named Rules

**The One Accent Rule.** Oxide is the only UI color outside the logo. Lime, mint, and teal stay inside the mark.

**The No Gray on Color Rule.** Text on oxide or on night ink is `on-accent`, `on-ink`, or `on-ink-soft`.

## Typography

**Display Font:** Besley, with Iowan Old Style and Palatino behind it. Optical sizing is on. Weight 500.
**Body Font:** Figtree, with Segoe UI behind it.
**Code:** the body face. There is no third brand face.

**Character:** Besley is the voice of the sums. Figtree is the voice of the instructions. They do not swap jobs.

### Hierarchy

- **Display** (500, clamp 2.7rem to 5.25rem, line-height 1.04, tracking -0.03em): the page headline. Max about 11 characters on the homepage.
- **Headline** (500, clamp 1.7rem to 2.45rem, line-height 1.15, tracking -0.03em): a section's one strong line.
- **Title** (Figtree 600, about 1.05rem, tracking 0): a row label in an index.
- **Body** (Figtree 400, 1.0625rem, line-height 1.55, tracking 0): paragraphs. Measure stays near 65–75 characters.
- **Label** (Figtree 600, 0.78rem): a data label such as a weekly total. Not an eyebrow above a heading.

### Named Rules

**The Pairing Rule.** Besley for the claim and the figures. Figtree for everything you operate.

**The Tracking Floor.** Display tracking stays between -0.03em and -0.02em. Do not go past -0.04em.

## Layout

The content column is `min(100% - gutter, 1160px)`. Full-bleed bands (the feature index and the closing invitation) break out of it and pad back to the same measure.

Homepage sections do not repeat:

- Hero: headline beside the salary split.
- Problem: one large line, three quieter lines.
- Solution: a ruled sequence beside the release-rules screenshot.
- Features: a two-column index on night ink.
- Plan: large numerals.
- Week: a timetable.
- Reviews: one large quote, two footnotes.
- Close: one night band, left aligned.

Interior pages are reading columns or indexes. They do not reuse the homepage hero. At 900px, two-column compositions stack. At 640px, the header keeps a menu, not the desktop links. Alignment stays left, including under 1040px.

## Elevation & Depth

The page is flat. Depth is a change of ground: paper, a rule, or a night band. The header is the only translucent material, paper at 88% with a blur, and it becomes solid paper under reduced transparency. There is no card shadow and no glow.

### Named Rules

**The Flat Ledger Rule.** A surface gets a 1px rule or a ground change. Not a shadow, and not both a border and a shadow.

## Shapes

Controls are 3px rectangles. The salary bar and the rules are square. The logo plate is 2px. Pills are not the default. A store glyph may keep its own drawing. Do not turn site buttons into pills to match it.

## Components

### Buttons

- **Shape:** 3px corners, 48px tall.
- **Primary:** oxide ground, on-accent text. Hover darkens to oxide deep. Press scales to 0.98 with a 0.28s settle. No lift, no glow.
- **Ghost:** transparent, 1px ink rule. On a night band the rule and the label switch to on-ink.
- **Focus:** 2px oxide outline, 3px offset.

### Inputs

- **Style:** 1px rule, surface ground, 3px corners, 48px minimum.
- **Focus:** 2px oxide outline. The caret is oxide.

### Navigation

The header is sticky and frosted. Links are Figtree, no pills. The download control is the primary button. Below 780px the links collapse into a paper menu with square corners. The wordmark sits on the existing night plate.

### Salary split

The signature object. Five slices, square, full opacity: rent, tithe, family, and debt step from night ink to a lighter green-gray. Left to live is oxide. Amounts live in the legend, not inside thin slices. One motion fills the bar from the left. Reduced motion shows the finished bar.

## Do's and Don'ts

### Do

- **Do** keep the salary split as the thing the first screen proves.
- **Do** use Besley at weight 500 with optical sizing for headlines and figures.
- **Do** keep text on night bands at on-ink or on-ink-soft.
- **Do** let each section have its own structure.
- **Do** keep the logo's own lime, mint, and teal inside the mark, on the night plate.

### Don't

- **Don't** bring back a purple or blue gradient, a glowing button, or a pill as the default control.
- **Don't** use Inter, Roboto, Arial, or DM Sans as the brand face.
- **Don't** put an icon tile above a heading, or three equal cards in a row, or a card inside a card.
- **Don't** use gray text on oxide or on a night band.
- **Don't** give every block the same radius and the same padding.
- **Don't** recolor the wordmark SVG. The white fill is what makes the plate work.
