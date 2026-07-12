import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT_CANONICAL = 'https://www.orionaimedia.com';

function renderedCanonicalHrefs(html) {
    return (html.match(/<link\b[^>]*>/gi) ?? [])
        .filter((tag) => /\brel=["']canonical["']/i.test(tag))
        .map((tag) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1]);
}

test('the root canonical declarations and rendered value agree', async () => {
    const sources = await Promise.all([
        readFile(path.join(REPO_ROOT, 'app/layout.tsx'), 'utf8'),
        readFile(path.join(REPO_ROOT, 'app/page.tsx'), 'utf8')
    ]);
    const sourceCanonicals = sources.flatMap(
        (source) => [...source.matchAll(/alternates\s*:\s*{\s*canonical\s*:\s*['"]([^'"]+)['"]\s*}/g)]
            .map((match) => match[1])
    );

    assert.deepEqual(sourceCanonicals, [ROOT_CANONICAL, ROOT_CANONICAL]);

    const html = await readFile(path.join(REPO_ROOT, '.next/server/app/index.html'), 'utf8');
    assert.deepEqual(renderedCanonicalHrefs(html), [ROOT_CANONICAL]);
});
