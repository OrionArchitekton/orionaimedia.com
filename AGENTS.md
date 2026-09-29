# AGENTS.md: oam-web

## Repo Role

Production website for Orion Ascend Media (orionaimedia.com). A two-page Next.js 14 (App
Router) site: the front door, which shows each featured channel's latest full-length release
from its public YouTube feed, and a privacy note. Every earlier page redirects to the front
door. GitHub repo name `orionaimedia.com` is a registry domain_repo_exception (recommended
name: `oam-web`).

## Boundaries

Owns:

- the public OAM web surface: `app/` (front door, privacy note, 404, sitemap, robots),
  `components/`, `lib/` (channel data, feed fetch, release selection, JSON-LD), `styles/`,
  `public/`
- the retired-page redirect list (`retired-paths.mjs`, used by `next.config.js`)
- the brand image generator (`scripts/build-brand-images.mjs`)

Does not own:

- the properties it links to (Orion Awakens and its shop, printables, newsletter and apps;
  the YouTube and TikTok channels); change those in their own repos
- any form, email sending or analytics: the site deliberately has none

## Start Here

- [specs/oam-front-door-spec.md](specs/oam-front-door-spec.md): behavior and acceptance criteria
- [docs/runbooks/front-door-channels.md](docs/runbooks/front-door-channels.md): channels,
  freshness, fallbacks, rollback
- [DESIGN_TOKENS_REFERENCE.md](DESIGN_TOKENS_REFERENCE.md): Observatory palette and type
- Root-level scaffold-era docs (START_HERE.md, HANDOFF.md, STATUS.md, FINAL_SUMMARY.md, etc.)
  are historical artifacts, not current state.

## Validation

```bash
npm test          # production build, then every tests/*.test.mjs
npm run test:unit # the unit seam only, no build
```

- Node 24 is required: tests import `.ts` files directly (type stripping).
- `npm test` runs on every pull request (`.github/workflows/ci.yml`).
- `npm run lint` is non-gating: no ESLint config exists and the script always exits 0.
- Merging to `main` deploys to production (Vercel). Verify on www.orionaimedia.com after merge.

## Estate Authority

- Estate doctrine: `orion-estate-audit/AGENTS.md` (sibling estate repo, not in this checkout)
- Registry row: logical_id `business-oac-oam-web` in
  `orion-estate-audit/estate_home_registry.yaml` (same sibling repo;
  home_status `active`, transition `current-but-transitional`)
