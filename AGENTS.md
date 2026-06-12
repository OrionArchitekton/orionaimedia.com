# AGENTS.md — oam-web

## Repo Role

Production marketing website for Orion AI Media (orionaimedia.com) — the OAM
holding-company web presence. Next.js 14 (App Router) + React 18 + Tailwind,
with a Resend-backed contact form and Puppeteer-based build-time asset
generation. GitHub repo name `orionaimedia.com` is a registry
domain_repo_exception (recommended name: `oam-web`).

## Boundaries

Owns:

- the public OAM web surface: routes under `app/`, shared `components/`,
  helpers in `lib/` (schema, tracking), `styles/`, static assets in `public/`
- the contact email API route (`app/api/contact/route.ts`, Resend, env-gated)
  and the edge OG image route (`app/og/[slug]/`)
- build-time asset generation under `scripts/` (`og:build`, `cases:build`)

Does not own:

- product or service backends — the only server-side surfaces here are the
  contact route and the edge OG route

## Start Here

- [README.md](README.md) — stack, scripts, env vars, deploy, known gaps
  (primary doc; documents copy not yet reconciled across pages)
- [DEPLOY.md](DEPLOY.md) — deploy steps (Vercel target)
- [DESIGN_TOKENS_REFERENCE.md](DESIGN_TOKENS_REFERENCE.md) — design tokens,
  alongside [tailwind.config.js](tailwind.config.js)
- [app/layout.tsx](app/layout.tsx) — root layout, fonts, metadata
- Root-level scaffold-era handoff docs (START_HERE.md, HANDOFF.md, STATUS.md,
  FINAL_SUMMARY.md, etc.) are historical artifacts, not current state.

## Validation

```bash
npm run lint
npm run build
```

- WARNING: `lint` is non-gating — the script is `next lint || echo 'skip'` and
  always exits 0. No ESLint config exists, so `next lint` currently stops at
  its interactive setup prompt and the wrapper masks the failure: no linting
  actually runs. Do not treat a green exit as a pass.
- `npm run build` is the effective gate. No test suite is declared.

## Estate Authority

- Estate doctrine: `/home/orion/src/orion-estate/platform/orion-estate-audit/AGENTS.md`
- Registry row: logical_id `business-oac-oam-web` in
  `/home/orion/src/orion-estate/platform/orion-estate-audit/estate_home_registry.yaml`
  (home_status `active`, transition `current-but-transitional`)
