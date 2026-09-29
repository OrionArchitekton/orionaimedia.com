import assert from 'node:assert/strict';
import test from 'node:test';
import { decodeXmlText, selectLatestRelease } from '../lib/latest-release.ts';

const LAST_KNOWN = { videoId: 'lastKnown01', title: 'Last known', published: '2026-09-01T00:00:00+00:00' };

function entry({ id, title = `Video ${id}`, published, shorts = false }) {
    const href = shorts ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
    return `<entry>
  <id>yt:video:${id}</id>
  <yt:videoId>${id}</yt:videoId>
  <title>${title}</title>
  <link rel="alternate" href="${href}"/>
  <published>${published}</published>
  <media:group><media:title>${title}</media:title></media:group>
 </entry>`;
}

function feed(...entries) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns:media="http://search.yahoo.com/mrss/" xmlns="http://www.w3.org/2005/Atom">
 <title>A channel</title>
 ${entries.join('\n ')}
</feed>`;
}

const fallback = { ...LAST_KNOWN, source: 'last-known' };

test('picks the newest full-length video and skips a newer Short (AC2)', () => {
    const xml = feed(
        entry({ id: 'shortAAAAAA', published: '2026-09-28T18:00:00+00:00', shorts: true }),
        entry({ id: 'longBBBBBBB', title: 'The Room Before Choice', published: '2026-09-28T16:00:00+00:00' }),
        entry({ id: 'longCCCCCCC', published: '2026-09-20T16:00:00+00:00' })
    );
    assert.deepEqual(selectLatestRelease(xml, LAST_KNOWN), {
        videoId: 'longBBBBBBB',
        title: 'The Room Before Choice',
        published: '2026-09-28T16:00:00+00:00',
        source: 'feed'
    });
});

test('orders by publish time, not by position in the feed (AC2)', () => {
    const xml = feed(
        entry({ id: 'olderDDDDDD', published: '2026-09-01T00:00:00+00:00' }),
        entry({ id: 'newerEEEEEE', published: '2026-09-02T00:00:00+00:00' })
    );
    assert.equal(selectLatestRelease(xml, LAST_KNOWN).videoId, 'newerEEEEEE');
});

test('decodes XML entities in titles (AC2)', () => {
    const xml = feed(entry({ id: 'titleFFFFFF', title: 'Art &amp; Music: Don&#39;t &quot;rush&quot;', published: '2026-09-02T00:00:00+00:00' }));
    assert.equal(selectLatestRelease(xml, LAST_KNOWN).title, 'Art & Music: Don\'t "rush"');
});

test('falls back to the last-known release when the feed cannot supply one (AC3)', () => {
    const cases = {
        'no feed': null,
        'not xml': 'Service Unavailable',
        'empty feed': feed(),
        'only Shorts': feed(entry({ id: 'shortGGGGGG', published: '2026-09-02T00:00:00+00:00', shorts: true })),
        'bad identifier': feed(entry({ id: 'bad id!', published: '2026-09-02T00:00:00+00:00' })),
        'unparseable date': feed(entry({ id: 'dateHHHHHHH', published: 'yesterday' }))
    };
    for (const [name, xml] of Object.entries(cases)) {
        assert.deepEqual(selectLatestRelease(xml, LAST_KNOWN), fallback, name);
    }
});

test('skips an entry with a bad identifier but still uses a valid one (AC3)', () => {
    const xml = feed(
        entry({ id: 'x"><script>', published: '2026-09-03T00:00:00+00:00' }),
        entry({ id: 'validIIIIII', published: '2026-09-02T00:00:00+00:00' })
    );
    assert.equal(selectLatestRelease(xml, LAST_KNOWN).videoId, 'validIIIIII');
});

test('decodeXmlText leaves unknown entities and invalid code points untouched', () => {
    assert.equal(decodeXmlText('&nbsp; &#0; &#x110000; &amp;'), '&nbsp; &#0; &#x110000; &');
});
