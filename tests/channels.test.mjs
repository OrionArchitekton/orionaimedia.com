import assert from 'node:assert/strict';
import test from 'node:test';
import { CHANNELS, IN_DEVELOPMENT } from '../lib/channels.ts';

test('the featured channels are the three live ones, in spec order', () => {
    assert.deepEqual(CHANNELS.map((c) => c.name), ['Orion Awakens', 'Orion Frequency', 'Elsewhere Unfolds']);
});

test('every channel has a valid feed id, a valid last-known release and https links', () => {
    for (const channel of CHANNELS) {
        assert.match(channel.youtubeChannelId, /^UC[A-Za-z0-9_-]{22}$/, channel.name);
        assert.match(channel.lastKnown.videoId, /^[A-Za-z0-9_-]{11}$/, channel.name);
        assert(!Number.isNaN(Date.parse(channel.lastKnown.published)), channel.name);
        for (const url of [channel.homeUrl, ...channel.links.map((link) => link.href)]) {
            assert.match(url, /^https:\/\//, `${channel.name}: ${url}`);
        }
    }
});

test('the in-development row names Talking Plants (no link yet) and Yin vs Yang', () => {
    assert.deepEqual(IN_DEVELOPMENT, [
        { name: 'Talking Plants' },
        { name: 'Yin vs Yang', href: 'https://www.tiktok.com/@theyinyang.house' }
    ]);
});
