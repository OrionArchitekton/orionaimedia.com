---
version: "1.0"
name: "Orion Ascend Media"
description: "Gold-on-midnight visual system for orionaimedia.com"
colors:
  midnight: "#050A1F"
  midnight-elevated: "#09122B"
  surface-portal: "#0B1633"
  gold: "#E8B45C"
  gold-light: "#FDD78B"
  gold-deep: "#B3842A"
  cream: "#FEF2CA"
  cream-muted: "#D2C9AF"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "48px"
    fontWeight: 600
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
rounded:
  xl: "12px"
  arch: "72px"
  full: "9999px"
---

# Orion Ascend Media Design System

A quiet midnight-navy observatory canvas (`#050A1F`) illuminated by warm gold tonal light (`#E8B45C`, `#FDD78B`) and soft cream prose (`#FEF2CA`), with zero ambient purple gradients.

## Typography

- Display and headings: `Cormorant Garamond` (weights 500, 600, normal and italic) via `next/font/google`.
- Body and interface links: `IBM Plex Sans` (weights 400, 500, 600, 700) via `next/font/google`.

## Accessibility and Motion

- Semantic landmarks: `<header>` with `<nav aria-label="Primary">`, `<main>`, and `<footer>`.
- Interactive nav links meet `>= 44px` minimum height.
- All text/surface pairs pass WCAG 2.1 AA (`>= 4.5:1`) verified by `colorjs.io` in `tests/brandContrast.test.mjs`.
- `@media (prefers-reduced-motion: reduce)` guards transitions and scroll behavior in `styles/globals.css`.
