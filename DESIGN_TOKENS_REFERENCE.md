# Design tokens: Observatory

Defined in `tailwind.config.js` and `styles/globals.css`. Same family as the Orion Awakens brand.

| Token | Value | Use |
| --- | --- | --- |
| `midnight` | #050A1F | page background, deepest sky |
| `indigo` | #0A1B4D | mid sky |
| `cosmic` | #1B3A8F | sky glow at the top |
| `gold` | #E8B45C | tagline, accents, card borders (at 40%) |
| `gold-light` | #FDD78B | channel names, hover |
| `gold-deep` | #B3842A | bottom of the wordmark gradient |
| `cream` | #FEF2CA | body text (at 60 to 85%) |

Type: Cormorant Garamond 500/600 and italic (`font-serif`: wordmark, headings, lede), Inter
(`font-sans`: body). Both are self-hosted by `next/font`.

Classes in `styles/globals.css`: `.sky` (star field over the midnight-to-indigo glow),
`.wordmark` (gold gradient text), `.portal` (card background under the arch), `.pill`
(in-development tags).

Rule: YouTube thumbnails keep their 16:9 shape (titles are baked into them). Crop the
letterbox bars of `hqdefault.jpg` with `object-cover` in an `aspect-video` box; never crop
to a circle or a tall arch.
