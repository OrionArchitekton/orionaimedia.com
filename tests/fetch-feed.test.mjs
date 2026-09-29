import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchFeed } from '../lib/fetch-feed.ts';

test('returns the feed text on 200, requesting six-hour revalidation', async (t) => {
    const calls = [];
    t.mock.method(globalThis, 'fetch', async (url, init) => {
        calls.push({ url, init });
        return new Response('<feed/>', { status: 200 });
    });
    assert.equal(await fetchFeed('UCabcdefghijklmnopqrstuv'), '<feed/>');
    assert.equal(calls[0].url, 'https://www.youtube.com/feeds/videos.xml?channel_id=UCabcdefghijklmnopqrstuv');
    assert.equal(calls[0].init.next.revalidate, 21600);
    assert(calls[0].init.signal instanceof AbortSignal, 'the request must carry a timeout signal');
});

test('returns null on an error status', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('nope', { status: 503 }));
    assert.equal(await fetchFeed('UCabcdefghijklmnopqrstuv'), null);
});

test('returns null when the body is far larger than any real feed', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => new Response('x'.repeat(2_000_001), { status: 200 }));
    assert.equal(await fetchFeed('UCabcdefghijklmnopqrstuv'), null);
});

test('returns null when the request throws (network error or timeout)', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => {
        throw new DOMException('timed out', 'TimeoutError');
    });
    assert.equal(await fetchFeed('UCabcdefghijklmnopqrstuv'), null);
});

test('returns null when the fetch never settles, even if it ignores the abort signal', async (t) => {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    t.mock.method(globalThis, 'fetch', () => new Promise(() => {}));
    const pending = fetchFeed('UCabcdefghijklmnopqrstuv');
    t.mock.timers.tick(5000);
    const winner = await Promise.race([pending, new Promise((resolve) => setImmediate(() => resolve('STILL_PENDING')))]);
    assert.equal(winner, null);
});
