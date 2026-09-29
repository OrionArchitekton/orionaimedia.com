import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { RETIRED_PATHS } from '../retired-paths.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const builtPath = (...parts) => path.join(REPO_ROOT, '.next', ...parts);
const readBuilt = (...parts) => readFile(builtPath(...parts), 'utf8');

// The spec's retired pages, pinned here independently of retired-paths.mjs, so deleting an
// entry from the shared list cannot silently remove both the redirect and its check.
const REQUIRED_RETIRED_PAGES = [
    '/about', '/assets', '/blog', '/channels', '/contact', '/designs', '/insights',
    '/method', '/packages', '/playbook', '/services', '/terms', '/work'
];

// The redirect Next applies to a URL on the www host: the first rule without a host
// condition whose compiled pattern matches the path.
function redirectFor(redirects, pathname) {
    return redirects.find((rule) => !rule.has && new RegExp(rule.regex).test(pathname));
}

test('every retired page permanently redirects to the front door (AC5)', async () => {
    for (const page of REQUIRED_RETIRED_PAGES) {
        assert(RETIRED_PATHS.includes(page), `${page} is missing from retired-paths.mjs`);
    }
    const { redirects } = JSON.parse(await readBuilt('routes-manifest.json'));
    for (const source of RETIRED_PATHS) {
        const rule = redirects.find((candidate) => candidate.source === source);
        assert(rule, `no redirect for ${source}`);
        assert.equal(rule.destination, '/', `${source} must land on the front door`);
        assert.equal(rule.statusCode, 308, `${source} must be permanent`);
    }
    for (const page of REQUIRED_RETIRED_PAGES) {
        assert(!existsSync(builtPath('server', 'app', `${page.slice(1)}.html`)), `retired page ${page} still renders`);
        assert(!existsSync(builtPath('server', 'app', page.slice(1))), `retired page ${page} still has built children`);
    }
});

test('real retired URLs reach the front door, and old share images the new one (S4)', async () => {
    const { redirects } = JSON.parse(await readBuilt('routes-manifest.json'));
    const expected = {
        '/services': '/',
        '/insights/youtube-seo-2025': '/',
        '/work/case-alpha': '/',
        '/blog': '/',
        '/og/home': '/og.png'
    };
    for (const [pathname, destination] of Object.entries(expected)) {
        const rule = redirectFor(redirects, pathname);
        assert(rule, `${pathname} is not redirected`);
        assert.equal(rule.statusCode, 308, `${pathname} must be permanent`);
        assert.equal(rule.destination, destination, `${pathname} must land on ${destination}`);
    }
    assert.equal(redirectFor(redirects, '/'), undefined, 'the front door must not redirect');
    assert.equal(redirectFor(redirects, '/privacy'), undefined, 'the privacy note must not redirect');
});

test('the sitemap lists exactly the front door and the privacy note (AC6)', async () => {
    const xml = await readBuilt('server', 'app', 'sitemap.xml.body');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.deepEqual(locs, ['https://www.orionaimedia.com', 'https://www.orionaimedia.com/privacy']);
});

const FRONT_DOOR_TEXT_IN_ORDER = [
    'Orion Ascend Media',
    'Imagine · Create · Transcend',
    'A small house of original channels for stillness, sound and wonder.',
    'Orion Awakens',
    'Orion Frequency',
    'Elsewhere Unfolds',
    'In development',
    'Talking Plants',
    'Yin vs Yang',
    'All work here is made with AI-assisted production, including AI voices, music and imagery.'
];

test('the front door shows the name, three channels in order, the in-development row and the footer (AC1)', async () => {
    const html = await readBuilt('server', 'app', 'index.html');
    // Search the rendered page only: the <head> repeats the name, and the RSC payload after
    // </main> repeats every string, so a whole-document search cannot see order or absence.
    const start = html.indexOf('<main');
    const end = html.indexOf('</main>');
    assert(start >= 0 && end > start, 'the front door has no <main> element');
    const main = html.slice(start, end);
    let cursor = -1;
    for (const text of FRONT_DOOR_TEXT_IN_ORDER) {
        const at = main.indexOf(text, cursor + 1);
        assert(at > cursor, `"${text}" is missing or out of order`);
        cursor = at;
    }
    assert.match(main, /href="mailto:hello@orionaimedia\.com"/);
    assert.match(main, /href="\/privacy"/);
});

test('each channel card shows a release, with its thumbnail served through the image proxy (S1)', async () => {
    const html = await readBuilt('server', 'app', 'index.html');
    const watched = new Set(
        [...html.matchAll(/href="https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})"/g)].map((m) => m[1])
    );
    const thumbnails = new Set(
        [...html.matchAll(/src="\/_next\/image\?url=https%3A%2F%2Fi\.ytimg\.com%2Fvi%2F([A-Za-z0-9_-]{11})%2Fhqdefault\.jpg/g)].map((m) => m[1])
    );
    assert.equal(watched.size, 3, 'expected one release per channel');
    assert.deepEqual([...thumbnails].sort(), [...watched].sort(), 'each release needs its own proxied thumbnail');
});

test('the front door refreshes its feeds every six hours (AC4)', async () => {
    const { routes } = JSON.parse(await readBuilt('prerender-manifest.json'));
    assert.equal(routes['/'].initialRevalidateSeconds, 21600);
});
