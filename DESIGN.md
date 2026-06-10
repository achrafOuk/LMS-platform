---
name: LMS Platform
description: Learning management platform with confident blue-and-gold brand identity
colors:
  background: "#f7f9fa"
  foreground: "#1a2332"
  primary: "#3d5a80"
  primary-foreground: "#ffffff"
  secondary: "#e8b84a"
  secondary-foreground: "#3d3420"
  muted: "#eef1f3"
  muted-foreground: "#5c6670"
  accent: "#4a8fd4"
  border: "#d8dee4"
  card: "#fefefe"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Google Sans Flex, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  none: "0px"
  pill: "9999px"
spacing:
  section-y: "clamp(3rem, 8vw, 6rem)"
  content-gap: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
---

## Overview

LMS Platform uses a cool-tinted light background with a committed primary blue and gold secondary accent. Display typography is Playfair Display serif; UI and body copy use Google Sans Flex. Corners are sharp (0px radius) on surfaces; CTAs use full pill shapes. The landing hero is image-led with centered copy and a product or learning photograph below.

## Colors

| Role | Token | Usage |
|------|-------|-------|
| Background | `--background` oklch(0.98 0.005 211) | Page canvas |
| Foreground | `--foreground` oklch(0.22 0.03 218) | Headings, body |
| Primary | `--primary` oklch(0.48 0.087 221) | CTAs, links, brand emphasis |
| Secondary | `--secondary` oklch(0.82 0.17 79) | Accents, stars, highlights |
| Muted | `--muted` / `--muted-foreground` | Subtext, borders |

Dark mode tokens are defined in `.dark` and mirror the same roles.

## Typography

- **Display (h1–h2):** `font-serif` — Playfair Display, medium weight, `text-balance`, letter-spacing ≥ -0.04em, max display size 4rem via clamp.
- **Body:** `font-sans` — Google Sans Flex, 18–20px on hero subcopy, `text-pretty` for prose.
- **Line length:** Cap body copy near 65ch (`max-w-2xl` / `max-w-3xl`).

## Elevation

Prefer single solid borders at `--border` on frames and cards. Avoid pairing 1px border with wide soft shadows on the same element. Hero product frame uses border only; primary buttons may use `--shadow-md` without an additional border.

## Components

- **Primary CTA:** Pill button, `bg-primary`, white text, hover lift with `motion-safe`, `focus-visible:ring-ring`.
- **Secondary CTA:** Pill outline, `border-border`, no shadow; hover `bg-muted`.
- **Nav auth links:** Match primary CTA styling for consistency.
- **Hero visual:** `<figure>` with `<img>` (explicit width/height), optional minimal browser chrome, no nested fake dashboard cards.

## Do's and Don'ts

**Do**
- Use design tokens from `styles.css`
- Hide decorative visuals from screen readers (`aria-hidden` or real `alt` on images)
- Wire CTAs to distinct routes

**Don't**
- Stack avatar + star rating + partner logo strips
- Use CSS card grids as product screenshots
- Apply `blur-3xl` glows or ghost-card border+shadow pairs
- Repeat uppercase tracked eyebrows on every section
