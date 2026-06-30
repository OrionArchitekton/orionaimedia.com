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

`orionaimedia.com` is the Orion AI Media holding-company web surface. It owns
the OAM public site, static content, web-local routes, env-gated contact API,
metadata routes, and build-time asset generation.

The repo name is a domain-repo exception. The role is web-only.

## Owns

- public OAM web UI, routes, content, and static assets
- contact API route behavior when environment-gated
- edge Open Graph image route and metadata routes
- build-time web asset generation under `scripts/`
- web-local analytics hooks when explicitly env-gated
- README-documented known gaps and positioning reconciliation notes

## Does Not Own

- OAM business workflow truth
- lane graphs, prompts, tools, or orchestration
- ops consoles, backoffice workflows, or operator queues
- Orion Runtime substrate or Cosmocrat kernel behavior
- infra packaging, deploy-target canon, or shared services
- product backends outside web-local APIs

## Allowed Dependencies

- repo-local Next.js, React, Tailwind, framer-motion, Resend, sanitize-html,
  and asset tooling
- approved public OAM content and static assets
- env-gated contact, analytics, and scheduling integrations
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

For implementation changes, follow `AGENTS.md`; `npm run build` is the current
effective local gate.

## Basis

- `AGENTS.md`
- `README.md`
- `DEPLOY.md`
- `repos/repo_contract_registry_20260317.csv` in
  `OrionArchitekton/orion-estate-audit`
- `oam_web_surface_family_repo_contract_20260630.md` in
  `OrionArchitekton/orion-estate-audit`
