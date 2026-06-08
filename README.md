# Orion Ascend Media

Marketing site for Orion Ascend Media (OAM), a governed digital-asset acquisition and growth arm within the Orion Apex Capital ecosystem.

Live: https://www.orionaimedia.com

OAM operates as an internal growth and asset-optimization arm governed by Orion Apex Capital, not as a client-facing retail agency. The site presents the mandate — **Acquire. Improve. Recycle.** — and routes external inquiries to the parent organization.

> Note: the repo is mid-transition. The home, about, and contact pages carry the current "internal governed arm" framing, while the services, channels, packages, and work pages still carry older client-facing agency copy (pricing tiers, podcast/YouTube/newsletter production, case studies). Treat the older pages as not-yet-reconciled. See [Known gaps](#known-gaps).

## Stack

- Next.js 14 (App Router) + React 18
- TypeScript 5
- Tailwind CSS 3 (design tokens in `tailwind.config.js`)
- framer-motion 11 (client-side entrance animations)
- Resend — contact email delivery (`app/api/contact/route.ts`)
- sanitize-html — server-side input sanitization
- next/og — dynamic Open Graph images at the edge (`app/og/[slug]/route.tsx`)
- Puppeteer + Sharp — build-time asset generation (OG PNGs, case-study screenshots)
- Google Fonts via `next/font` — Cinzel (headings), Inter (body)
- Deploy target: Vercel

## Local development

```bash
# 1. Clone
git clone https://github.com/OrionArchitekton/orionaimedia.com.git
cd orionaimedia.com

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000.

The contact API and analytics are env-gated — the site renders and the contact form
returns a clear `503` ("Email service not configured") until `RESEND_API_KEY` and
`CONTACT_TO` are set. See [Environment variables](#environment-variables).

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Next.js dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | `next lint` (non-failing: wrapped as <code>next lint &#124;&#124; echo skip</code>, never blocks a build) |
| `npm run og:build` | Render Open Graph PNGs into `public/og/` (`scripts/batch-og.mjs`) |
| `npm run cases:build` | Capture case-study screenshots via Puppeteer (`scripts/case-shots.mjs`) |
| `npm run assets:build` | Run `og:build` then `cases:build` |

`og:build` fetches the edge OG route (`/og/<slug>`) from a running server, so a dev or
production server must be up first. Override the origin with `SITE_ORIGIN`
(default `http://localhost:3000`):

```bash
npm run dev               # in one terminal
SITE_ORIGIN=http://localhost:3000 npm run og:build
```

## Environment variables

No `.env.example` is committed. All keys are read from `process.env`; none are required
to render the site, but the contact form and analytics stay inert until they are set.
Set these in Vercel project settings (or a local `.env.local`, which is gitignored).

### Server (contact pipeline — `app/api/contact/route.ts`)

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes (for contact) | Resend API key. Email sends from `noreply@orionaimedia.com`. |
| `CONTACT_TO` | Yes (for contact) | Destination inbox for inquiries. |

If either is missing, `POST /api/contact` returns `503` and the form surfaces a mailto fallback.

### Client (optional)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_GA_ID` | Enables env-gated GA4 (`gtag`) in `app/layout.tsx`. Page views are sent manually via `lib/track.ts`. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables the Plausible script in `app/layout.tsx`. |
| `NEXT_PUBLIC_CAL_URL` | Embeds a scheduling iframe (Cal.com / Calendly) in `components/ContactForm.tsx`. When unset, the component falls back to a hardcoded Calendly link. |

### Build script

| Variable | Purpose |
| --- | --- |
| `SITE_ORIGIN` | Origin that `scripts/batch-og.mjs` fetches OG images from. Default `http://localhost:3000`. |

Never commit real values. `.gitignore` excludes `.env*.local`.

## Contact pipeline

The live contact form is `components/ContactForm.tsx` (a client component), which
`POST`s to `app/api/contact/route.ts`. The route:

- sanitizes every field with `sanitize-html` (tags and attributes stripped),
- rate-limits per IP (5 submissions / 10 min, in-memory per runtime instance),
- rejects submissions with a filled honeypot field (`__hp`),
- validates required fields (name, email, message) and email format,
- sends via Resend when `RESEND_API_KEY` + `CONTACT_TO` are set, otherwise returns `503`.

Note: `app/contact/page.tsx` is **not** a form — it is a static page stating that OAM
"does not offer open retail services" and linking inquiries to
`https://orionapexcapital.com/contact`. The `ContactForm` component is wired separately
and is where the scheduling embed lives.

## SEO and metadata

- Per-page metadata via the App Router `metadata` export; root metadata in `app/layout.tsx`.
- JSON-LD structured data: `Organization` and `WebSite` injected in `app/layout.tsx`.
  `lib/schema.ts` also exports `breadcrumbSchema()`, `articleSchema()`, `webPageSchema()`,
  and `caseStudySchema()` for use on content pages.
- Dynamic Open Graph images are generated at request time by `app/og/[slug]/route.tsx`
  (edge runtime, `next/og` `ImageResponse`). They are not a single static `og.png` to swap out.
- `sitemap.xml` (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`) are generated routes.
- `next.config.js` enforces a canonical-host 301 (`orionaimedia.com` → `www.orionaimedia.com`)
  and a legacy `/blog` → `/insights` 301.

## Design system

Defined in `tailwind.config.js` and loaded in `app/layout.tsx`.

- **Colors:** graphite-900 `#0E141B` (background), graphite-800 `#151D28` (panels),
  royal `#183B73` (accents), pulse-cyan `#53D3F8` (links/waveforms), imperial gold scale
  (`#FFF1C2 → #E6C56E → #B3842A`), metallic `#E5E7EB` (body text).
- **Typography:** Cinzel (headings), Inter (body), via `next/font/google`.
- **Motion:** framer-motion entrance animations; background respects `prefers-reduced-motion`.

The OG image generator (`app/og/[slug]/route.tsx`) uses a different palette
(navy `#0D1B2A`, copper `#B87654`, lime `#E6FF4D`) than the Tailwind tokens above —
this divergence is intentional-or-stale and not yet reconciled.

## Deploy

Ships to Vercel from the `main` branch (Vercel's default Git integration runs
`next build`). For a manual or alternative host:

```bash
npm run build
npm start
```

There are no CI workflows in this repo (`.github/workflows` is absent), so lint and
build are not gated in CI; rely on Vercel's build step and local checks.

## Project structure

```
app/
  layout.tsx            Root layout: fonts, metadata, JSON-LD, env-gated GA4/Plausible
  page.tsx              Home (Acquire/Improve/Recycle, governed-arm framing)
  about/                About (governance copy)
  contact/              Static redirect page → Orion Apex Capital (not a form)
  services/             Services (older agency copy — see Known gaps)
  method/               Method (30/60/90)
  work/                 Case studies (older agency copy)
  channels/             Podcast/YouTube/Newsletter (older agency copy)
  packages/             Pricing tiers (older agency copy)
  designs/              Design examples
  assets/               Assets & holdings
  playbook/             Playbook
  insights/             Insights index
  insights/[slug]/      Insight posts (hardcoded mock content)
  privacy/  terms/      Legal pages
  not-found.tsx         404
  robots.ts             /robots.txt
  sitemap.ts            /sitemap.xml
  api/contact/route.ts  Contact POST handler (Resend + sanitize + rate-limit)
  og/[slug]/route.tsx   Dynamic OG image generation (edge, next/og)

components/
  Header.tsx  Footer.tsx  Hero.tsx  Cards.tsx  CTA.tsx  PackagesTable.tsx
  ContactForm.tsx         Live contact form (POSTs to /api/contact)
  AnimateInClient.tsx     framer-motion entrance wrapper
  TrackedLink.tsx         Link with analytics tracking
  ui/                     Button, Container, Logo, Section

lib/
  schema.ts               JSON-LD builders (Organization, WebSite, Article, Breadcrumb, CreativeWork)
  track.ts                Client analytics helper

scripts/
  batch-og.mjs            Fetch /og/<slug> → write public/og/*.png (uses SITE_ORIGIN)
  case-shots.mjs          Puppeteer case-study screenshots

public/                   Crest assets, og.png, site.webmanifest
styles/globals.css        Tailwind layers + custom utilities
tailwind.config.js  postcss.config.js  next.config.js  tsconfig.json
```

## Known gaps

These are real, verifiable issues in the current tree — listed so the next maintainer
does not rediscover them:

- **Mixed positioning.** Home/about/contact use the governed internal-arm framing;
  services/channels/packages/work still carry the pre-pivot client-facing agency copy.
  Reconcile these to one identity.
- **Insights are mock content.** `app/insights/[slug]/page.tsx` ships hardcoded posts
  ("replace with CMS/MDX in production").
- **Insights index link 404s.** The index (`app/insights/page.tsx`) links
  `90-day-revamp-playbook`, which does not exist in the `[slug]` route or `sitemap.ts`
  (both list a different set of six slugs). Either add the post or fix the link.
- **OG palette drift.** The OG generator palette differs from the Tailwind design tokens
  (see [Design system](#design-system)).
- **Doc clutter.** The repo root carries a dozen overlapping status/handoff docs
  (e.g. `🎉_COMPLETE.md`, `HANDOFF.md`, `STATUS.md`, `LAUNCH_CHECKLIST.md`); several still
  repeat the stale Formspree/agency claims this README corrects. Consolidate into
  `README` + `DEPLOY.md` + `CHANGELOG.md`.

## License

No `LICENSE` file is committed. The project is proprietary — all rights reserved by
Orion Ascend Media.
