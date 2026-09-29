# Changelog

All notable changes to this project will be documented in this file.

## 2026-09-29

- feat: Observatory front door for Orion Ascend Media, with each channel's latest release
- feat: privacy note; site collects nothing beyond standard hosting logs
- feat: every agency-era page permanently redirects to the front door
- chore: remove analytics, contact form, per-page share images and unused dependencies
- ci: run the test suite on pull requests
- chore: Next.js 16 and React 19 (clears the remaining Next.js security advisories); drop the removed `next lint` script

## 2025-10-23

- feat(contact): add working form + calendar embed (env-gated)
- feat(pages): ship services/work/method/packages/about/privacy/terms
- feat(seo): add robots + sitemap + OG + JSON-LD
- perf(images): prepare for optimized images and lazy-load non-critical
- chore(analytics): env-gated GA4/Plausible init
- chore(config): 301 redirect to www
