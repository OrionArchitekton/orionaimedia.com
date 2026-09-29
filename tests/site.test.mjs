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

test('every retired page permanently redirects to the front door (AC5)', async () => {
    const { redirects } = JSON.parse(await readBuilt('routes-manifest.json'));
    for (const source of RETIRED_PATHS) {
        const rule = redirects.find((candidate) => candidate.source === source);
        assert(rule, `no redirect for ${source}`);
        assert.equal(rule.destination, '/', `${source} must land on the front door`);
        assert.equal(rule.statusCode, 308, `${source} must be permanent`);
    }
    const retiredPages = RETIRED_PATHS.filter((p) => !p.includes(':')).map((p) => p.slice(1));
    for (const page of retiredPages) {
        assert(!existsSync(builtPath('server', 'app', `${page}.html`)), `retired page /${page} still renders`);
    }
});

test('the sitemap lists exactly the front door and the privacy note (AC6)', async () => {
    const xml = await readBuilt('server', 'app', 'sitemap.xml.body');
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    assert.deepEqual(locs, ['https://www.orionaimedia.com', 'https://www.orionaimedia.com/privacy']);
});
