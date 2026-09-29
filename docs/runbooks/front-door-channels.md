---
verified: 2026-09-29
review_after: 2027-03-29
topics: [orionaimedia.com, front door, youtube feeds, channels]
references:
  - lib/channels.ts
  - lib/latest-release.ts
  - lib/fetch-feed.ts
  - app/page.tsx
  - retired-paths.mjs
  - scripts/build-brand-images.mjs
---

# Front door channels

The front door shows one card per channel in `lib/channels.ts`. Each card shows the newest
full-length video from the channel's public YouTube feed, re-read at most every six hours.
When a feed cannot supply one, the card shows that channel's `lastKnown` release.

## Check what production is showing

```bash
curl -s https://www.orionaimedia.com/ | grep -o 'watch?v=[A-Za-z0-9_-]\{11\}' | sort -u
```

Compare with the feeds (next section). A card may lag a new upload by up to six hours.

## Print each channel's current latest release

```bash
node --input-type=module -e "
import { CHANNELS } from './lib/channels.ts';
import { parseFullLengthReleases } from './lib/latest-release.ts';
for (const c of CHANNELS) {
  try {
    const res = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + c.youtubeChannelId);
    const latest = res.ok ? parseFullLengthReleases(await res.text())[0] ?? null : null;
    console.log(c.slug, res.status, JSON.stringify(latest));
  } catch (error) {
    console.log(c.slug, 'error', String(error));
  }
}"
```

A status other than 200 means the feed itself is failing; see the section on cards stuck on their last-known release.

## Refresh the last-known releases

Do this when a channel's card has been showing its `lastKnown` release (production matches the
seed, not the feed), and every few months regardless. Copy the printed objects into the
matching `lastKnown` fields in `lib/channels.ts`, run `npm test`, and open a PR.

## Add or retire a channel

1. Edit `CHANNELS` in `lib/channels.ts` (the feed id is the `UC...` channel id).
2. Update the expected names in `tests/channels.test.mjs` and the ordered text in
   `tests/site.test.mjs`, and the content section of `specs/oam-front-door-spec.md`.
3. `npm test`, then a PR. Merging deploys.

## If every card is stuck on its last-known release

Likely causes, in order: YouTube's feed endpoint is having one of its intermittent
outages (it can return 404 or 500 for some channels for minutes or hours, then recover
on its own; check with `curl -s -o /dev/null -w '%{http_code}\n' 'https://www.youtube.com/feeds/videos.xml?channel_id=<id>'` and wait), YouTube changed the feed format, blocked the
host's requests, or retired the endpoint. Save a feed with `curl` and compare it with the fixtures in
`tests/latest-release.test.mjs`; if the format changed, update `parseFullLengthReleases`
and its tests together. The site keeps working meanwhile; only freshness is lost.

## Rebuild the share image and icons

After changing `public/crest.svg` or the palette: `npm run brand:build`, look at
`public/og.png`, commit the three generated files.

## Roll back

Revert the merge commit on `main` (merging deploys), or promote the previous production
deployment in Vercel. Retired-page redirects live in `retired-paths.mjs`.
