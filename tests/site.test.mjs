import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
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

function pngSize(buffer, name) {
    assert.equal(buffer.toString('hex', 0, 8), '89504e470d0a1a0a', `${name} is not a PNG`);
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

test('the site icon, touch icon and share image exist and are linked (AC9)', async () => {
    const publicFile = (name) => readFile(path.join(REPO_ROOT, 'public', name));
    assert.deepEqual(pngSize(await publicFile('og.png'), 'og.png'), { width: 1200, height: 630 });
    assert.deepEqual(pngSize(await publicFile('apple-touch-icon.png'), 'apple-touch-icon.png'), { width: 180, height: 180 });
    const ico = await publicFile('favicon.ico');
    assert.equal(ico.toString('hex', 0, 4), '00000100', 'favicon.ico must be an ICO file');
    assert.equal(ico.readUInt16LE(4), 2, 'favicon.ico must hold two sizes');
    const html = await readBuilt('server', 'app', 'index.html');
    assert.match(html, /<link[^>]*rel="icon"[^>]*href="\/crest\.svg"/);
    assert.match(html, /<link[^>]*rel="apple-touch-icon"[^>]*href="\/apple-touch-icon\.png"/);
    assert.match(html, /<meta[^>]*property="og:image"[^>]*content="https:\/\/www\.orionaimedia\.com\/og\.png"/);
});

const BUILT_PAGES = ['index.html', 'privacy.html', '_not-found.html'];
const RETIRED_COPY = ['Acquire', 'From $', 'Book a call', 'Ohio'];
const TRACKING_AND_THIRD_PARTY = ['googletagmanager', 'plausible', 'gtag(', 'fonts.googleapis.com', 'fonts.gstatic.com'];

test('no tracking, no forms and no third-party assets on any page (AC7)', async () => {
    for (const page of BUILT_PAGES) {
        const html = await readBuilt('server', 'app', page);
        for (const banned of [...TRACKING_AND_THIRD_PARTY, '<form', '<input']) {
            assert(!html.includes(banned), `${page} contains "${banned}"`);
        }
        // Everything the browser loads: src, srcset and imagesrcset values, and <link> hrefs
        // other than canonical/alternate (which are metadata, not loads).
        const candidates = [...html.matchAll(/\s(?:src|srcset|imagesrcset)="([^"]+)"/gi)].map((m) => m[1]);
        for (const [tag] of html.matchAll(/<link\s[^>]*>/gi)) {
            const rel = (/\srel="([^"]+)"/i.exec(tag) || [])[1] || '';
            if (rel === 'canonical' || rel === 'alternate') continue;
            const href = (/\shref="([^"]+)"/i.exec(tag) || [])[1];
            if (href) candidates.push(href);
        }
        for (const value of candidates) {
            for (const entry of value.split(',')) {
                const url = entry.trim().split(/\s+/)[0];
                assert(url.startsWith('/') || url.startsWith('data:'), `${page} loads a third-party asset: ${url}`);
            }
        }
    }
});

test('no retired-era copy in authored source (AC7)', async () => {
    // Checked in source rather than built HTML: live video titles are part of the built page
    // and must not be able to fail this check.
    for (const dir of ['app', 'components', 'lib']) {
        for (const name of await readdir(path.join(REPO_ROOT, dir), { recursive: true })) {
            if (!/\.(tsx?|mjs|css)$/.test(name)) continue;
            const text = await readFile(path.join(REPO_ROOT, dir, name), 'utf8');
            for (const copy of RETIRED_COPY) assert(!text.includes(copy), `${dir}/${name} still says "${copy}"`);
        }
    }
});

test('authored copy contains no long dashes (AC7)', async () => {
    for (const dir of ['app', 'components', 'lib']) {
        for (const name of await readdir(path.join(REPO_ROOT, dir), { recursive: true })) {
            if (!/\.(tsx?|mjs|css)$/.test(name)) continue;
            const text = await readFile(path.join(REPO_ROOT, dir, name), 'utf8');
            assert(!/[\u2013\u2014\u2015]/.test(text), `${dir}/${name} contains a long dash`);
        }
    }
});

test('the privacy note states what is collected, points onward and names the owner (AC8)', async () => {
    const html = await readBuilt('server', 'app', 'privacy.html');
    for (const text of [
        'standard hosting logs',
        'no tracking cookies',
        'href="mailto:hello@orionaimedia.com"',
        'href="https://orionawakens.com/privacy"'
    ]) {
        assert(html.includes(text), `privacy note is missing ${text}`);
    }
    assert.match(html, /Orion Ascend Media is a brand of [A-Z][^<_]{2,}\./);
    assert.match(html, /<meta[^>]*property="og:url"[^>]*content="https:\/\/www\.orionaimedia\.com\/privacy"/);
    assert.match(html, /<meta[^>]*property="og:image"[^>]*content="https:\/\/www\.orionaimedia\.com\/og\.png"/);
});
