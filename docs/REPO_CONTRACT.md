# OAM Web Repo Contract

Date: 2026-06-30

Status: binding repo-local contract.

## Current Name

- `orionaimedia.com`

## Recommended Name

- `oam-web`

## Role

- `web`

## Purpose

`orionaimedia.com` is the Orion Ascend Media web surface. It owns the OAM public site
(a front door and a privacy note), static content, web-local routes, and build-time
asset generation. The only server-side behavior is reading the three public YouTube
feeds for the front door, with six-hour revalidation and a last-known-release fallback.

The repo name is a domain-repo exception. The role is web-only.

## Owns

- public OAM web UI, routes, content, and static assets
- reading the three public YouTube feeds server-side for the front door
- retired-page redirects to the front door (`retired-paths.mjs`, used by `next.config.js`)
- metadata routes
- build-time web asset generation under `scripts/`
- README-documented known gaps and positioning reconciliation notes

## Does Not Own

- OAM business workflow truth
- lane graphs, prompts, tools, or orchestration
- ops consoles, backoffice workflows, or operator queues
- Orion Runtime substrate or Cosmocrat kernel behavior
- infra packaging, deploy-target canon, or shared services
- product backends outside web-local APIs

## Allowed Dependencies

- repo-local Next.js, React, Tailwind, and asset tooling
- approved public OAM content and static assets
- estate doctrine from `orion-estate-audit`

## Forbidden Logic / Forbidden Ownership

- lane, ops, runtime, kernel, or infra ownership
- background workers or product backend services
- business workflow orchestration
- deployment topology or secret-scope authority
- treating stale agency pages as current product doctrine

## PR Reject Rules

- reject PRs that move business workflow, lane, ops, runtime, kernel, or infra
  ownership here
- reject PRs that add product backend or worker ownership
- reject PRs that add deploy-target or secret-scope authority without registry
  admission
- reject PRs that resolve positioning drift by inventing new doctrine

## Verification

For docs-only contract changes:

```bash
git diff --check
```

For implementation changes, follow `AGENTS.md`; `npm test` (production build plus
every `tests/*.test.mjs`) is the current effective local gate, with `npm run test:unit`
for the unit seam. CI runs `npm test` on every pull request.

## Basis

- `AGENTS.md`
- `README.md`
- `DEPLOY.md`
- `repos/repo_contract_registry_20260317.csv` in
  `OrionArchitekton/orion-estate-audit`
- `oam_web_surface_family_repo_contract_20260630.md` in
  `OrionArchitekton/orion-estate-audit`
