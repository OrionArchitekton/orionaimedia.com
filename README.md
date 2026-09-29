# Orion Ascend Media

The website for Orion Ascend Media, a small house of original channels for stillness, sound
and wonder: https://www.orionaimedia.com

## What it is

Two pages. The front door shows Orion Awakens, Orion Frequency and Elsewhere Unfolds, each
with its latest full-length release read from the channel's public YouTube feed (refreshed at
most every six hours, with a last-known fallback), plus projects in development. The privacy
note explains that the site collects nothing beyond standard hosting logs.

## Develop

Requires Node 24.

```bash
npm ci
npm run dev        # http://localhost:3000
npm test           # production build + all tests
npm run test:unit  # unit tests only
```

## Operate

See [docs/runbooks/front-door-channels.md](docs/runbooks/front-door-channels.md) for adding
channels, refreshing fallbacks, rebuilding the share image and rolling back.

## Deploy

Merging to `main` deploys to production on Vercel. Pull requests run `npm test` in CI.

## License

No `LICENSE` file is committed. The project is proprietary, all rights reserved by
Orion Ascend Media.
