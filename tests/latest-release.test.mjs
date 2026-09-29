import assert from 'node:assert/strict';
import test from 'node:test';
import { decodeXmlText, parseFullLengthReleases, selectLatestRelease } from '../lib/latest-release.ts';
import { readFileSync } from 'node:fs';

const LAST_KNOWN = { videoId: 'lastKnown01', title: 'Last known', published: '2026-09-01T00:00:00+00:00' };

function entry({ id, title = `Video ${id}`, published, shorts = false }) {
    const href = shorts ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;
    return [
        '<entry>',
        `  <id>yt:video:${id}</id>`,
        `  <yt:videoId>${id}</yt:videoId>`,
        title === null ? '' : `  <title>${title}</title>`,
        `  <link rel="alternate" href="${href}"/>`,
        published === undefined ? '' : `  <published>${published}</published>`,
        `  <media:group><media:title>${title ?? ''}</media:title></media:group>`,
        ' </entry>'
    ].join('\n');
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
        'unparseable date': feed(entry({ id: 'dateHHHHHHH', published: 'yesterday' })),
        'id too short': feed(entry({ id: 'abcdefghij', published: '2026-09-02T00:00:00+00:00' })),
        'id too long': feed(entry({ id: 'abcdefghijkl', published: '2026-09-02T00:00:00+00:00' })),
        'no title': feed(entry({ id: 'noTitleJJJJ', title: null, published: '2026-09-02T00:00:00+00:00' })),
        'no publish time': feed(entry({ id: 'noDateKKKKK' })),
        'non-ISO date': feed(entry({ id: 'looseDateLL', published: 'Sep 2 2026' })),
        'impossible month': feed(entry({ id: 'monthQQQQQQ', published: '2026-13-01T00:00:00+00:00' })),
        'no timezone': feed(entry({ id: 'noZoneRRRRR', published: '2026-09-02T00:00:00' })),
        'impossible day': feed(entry({ id: 'feb30SSSSSS', published: '2026-02-30T00:00:00+00:00' })),
        'truncated feed': feed(entry({ id: 'cutTTTTTTTT', published: '2026-09-02T00:00:00+00:00' })).replace('</feed>', ''),
        'unclosed entry': feed(entry({ id: 'openMMMMMMM', published: '2026-09-02T00:00:00+00:00' }).replace('</entry>', ''))
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

test('compares publish times across timezone offsets (AC2)', () => {
    const xml = feed(
        entry({ id: 'pacificNNNN', published: '2026-09-02T18:00:00-07:00' }), // 01:00 UTC on the 3rd
        entry({ id: 'utcPPPPPPPP', published: '2026-09-03T00:30:00+00:00' })
    );
    assert.equal(selectLatestRelease(xml, LAST_KNOWN).videoId, 'pacificNNNN');
});

test('a flood of unclosed entries falls back quickly', () => {
    const started = performance.now();
    assert.deepEqual(selectLatestRelease('<entry>'.repeat(60000), LAST_KNOWN), fallback);
    assert(performance.now() - started < 1000, 'parsing must stay linear');
});

test('accepts a real leap day (AC2)', () => {
    const xml = feed(entry({ id: 'leapUUUUUUU', published: '2028-02-29T12:00:00+00:00' }));
    assert.equal(selectLatestRelease(xml, LAST_KNOWN).videoId, 'leapUUUUUUU');
});

test('reads a real recorded feed: skips the newer Short and finds all full-length videos (AC2)', () => {
    const xml = readFileSync(new URL('./fixtures/orion-awakens-feed.xml', import.meta.url), 'utf8');
    assert.equal(parseFullLengthReleases(xml).length, 5);
    assert.deepEqual(selectLatestRelease(xml, LAST_KNOWN), {
        videoId: 'gJUe5KmLhJc',
        title: 'Guided Inner Child Meditation | The Room Before Choice',
        published: '2026-09-28T16:00:12+00:00',
        source: 'feed'
    });
});
