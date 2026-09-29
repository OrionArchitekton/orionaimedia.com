# Orion Ascend Media front door

Status: approved design, 2026-09-28. This spec is the living validation reference for the
orionaimedia.com front door. Later changes to this behavior update this file in the same PR.

## Summary

orionaimedia.com becomes a two-page site for **Orion Ascend Media**: a single front door that
shows the channels the company makes, each with its latest real release, plus a short privacy
note. Every page from the site's earlier agency and website-flipping era is retired and
redirects to the front door. The site sells nothing, collects nothing, and keeps itself current
by reading each channel's public YouTube feed.

## Terms

One term per concept; the synonyms on the right are not used in code, copy, or tests.

| Term | Meaning | Not |
| --- | --- | --- |
| front door | the site's home page | landing page, homepage hub |
| channel card | one card per featured channel on the front door | tile, portal (portal is only the visual style) |
| latest release | the newest full-length video on a channel's public feed | newest upload (which may be a Short) |
| last-known release | a per-channel release recorded in the repo, used when the feed cannot supply a latest release | cache, default |
| in-development row | the row naming projects that are not yet featured channels | coming soon, pipeline |
| retired page | any page that existed before this change and is not the front door or the privacy note | legacy page, old page |

## Content

- Name: **Orion Ascend Media**. Wordmark in capitals; tagline "Imagine · Create · Transcend";
  one-line lede: "A small house of original channels for stillness, sound and wonder."
- Channel cards, in this order:
  1. **Orion Awakens**: guided meditations and reflective essays. Links: hub
     (orionawakens.com), shop, printables, newsletter, Abundance 919.
  2. **Orion Frequency**: original 432 Hz music for meditation and rest. Links: YouTube.
  3. **Elsewhere Unfolds**: cinematic journeys through invented worlds, with original ambient
     music. Links: YouTube.
- Each channel card's title links to the channel's home (the hub for Orion Awakens, the
  YouTube channel for the others); the latest release line links to that video.
- In-development row: **Talking Plants** (no link until it has a public home) and
  **Yin vs Yang** (links to its TikTok).
- Footer: an AI disclosure ("All work here is made with AI-assisted production, including AI
  voices, music and imagery."), a contact email link (hello@orionaimedia.com), and a link to
  the privacy note.
- Visual direction: "Observatory". Midnight to indigo night-sky background with sparse stars,
  gold serif wordmark, the existing crest, arched channel cards with a gold hairline border.
  Palette and type sit in the same family as Orion Awakens.

## Scenarios

Each scenario is an end-to-end slice through feed reading, selection, rendering and routing.

### S1. A visitor sees current work

Given each channel's feed is reachable, when a visitor opens the front door, then each channel
card shows that channel's latest release: its thumbnail at 16:9, its title as plain text, and a
link to the video. A Short is never chosen as the latest release, even when it is the newest
upload.

### S2. A feed fails and the card still works

Given a channel's feed is unreachable, malformed, or lists no full-length video among its
entries, when the front door is rendered, then that channel card shows the channel's
last-known release. The other cards are unaffected. No card is ever blank or broken.

### S3. The front door stays current without edits

Given a channel publishes a new full-length video, when about six hours have passed and a
visitor opens the front door, then that card shows the new video, with no code change,
redeploy, or manual edit.

### S4. An old link lands somewhere current

Given a visitor follows a link to any retired page, when the request arrives, then it is
permanently redirected to the front door.

### S5. A visitor reads the privacy note

Given a visitor opens the privacy note, then it states that the site collects nothing beyond
standard hosting logs, sets no tracking cookies, offers a contact email, and points to each
property's own policy for anything collected there. It names the site owner.

### S6. The site presents itself correctly elsewhere

Given a search engine, browser, or social app reads the site, then the sitemap lists exactly the
front door and the privacy note, the browser shows the crest as the site icon, and link previews
use an image in the Observatory palette with the current name.

### S7. A broken build cannot be merged unnoticed

Given a pull request changes the site, then an automated check runs the full test suite and
reports failure on the pull request before anyone merges.

## Constraints

- The site collects nothing: no analytics, no tracking scripts, no cookies, no forms, no
  newsletter capture. Newsletter sign-up happens only on the Orion Awakens newsletter page.
- Visitors' browsers make no third-party requests. Fonts are self-hosted and thumbnails are
  served from the site's own domain through its image proxy.
- Feed reading happens on the server, at most once per six hours per channel.
- Feed text is untrusted. Titles render as plain text only. A video identifier is used only
  when it matches YouTube's 11-character identifier format.
- Thumbnails keep their 16:9 shape: titles are baked into them, so other crops cut words off.
- Copy carries no metrics, testimonials, prices, client claims, health claims, or dated
  predictions, and no long dashes.

## Acceptance criteria

- **AC1** The front door renders the name, tagline, lede, three channel cards in the order
  above, the in-development row, the AI disclosure, the contact email link, and the privacy link.
- **AC2** Latest-release selection skips Shorts and returns the newest full-length video.
- **AC3** Latest-release selection returns the last-known release when the feed is unreachable,
  malformed, has no full-length entry, or yields an identifier outside the 11-character format.
- **AC4** Feed results are reused for six hours; a new full-length video appears within that
  window without a deploy.
- **AC5** Every retired page permanently redirects to the front door, and no retired page
  renders its own content.
- **AC6** The sitemap lists exactly the front door and the privacy note.
- **AC7** The built site contains no analytics or tracking scripts, no form elements, and none
  of the retired-era copy (including "Acquire", "From $", "Book a call", "Ohio").
- **AC8** The privacy note matches S5 and names the site owner.
- **AC9** The site icon, touch icon, and link-preview image exist and use the crest and the
  Observatory palette; no favicon request returns 404.
- **AC10** An automated pull request check runs the test suite and blocks on failure.
- **AC11** The existing root canonical contract still holds.

## Test seams

Two seams, chosen so every criterion is exercised at the highest level that can observe it:

1. **Latest-release selection** (AC2, AC3): a pure function from feed text plus a last-known
   release to the release to show. Tested directly with recorded feeds: normal, Shorts-first,
   Shorts-only, malformed, empty, and a bad identifier.
2. **The built site** (AC1, AC5 to AC9, AC11): the production build's output, the same seam the
   root canonical test already uses. Tests read generated pages, the redirect table, and the
   sitemap.

AC4 is a configuration fact checked at the built-site seam; AC10 is checked by the pull request
itself.

## Out of scope

- Any property not listed above, and any change to the properties' own sites.
- Email sending of any kind; the contact route is removed with its only form.
- A blog, news, or about page.

## Open item (needed before launch, not before implementation)

- The owner line for the privacy note: "Orion Ascend Media, a brand of ___".
