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
