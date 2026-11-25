import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import Color from 'colorjs.io';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(fs.readFileSync(path.join(root, 'tokens/brand.tokens.json'), 'utf8'));

function contrast(fgHex, bgHex) {
  return new Color(bgHex).contrast(new Color(fgHex), 'WCAG21');
}

test('Orion Ascend Media W3C DTCG brand tokens pass WCAG 2.1 AA contrast via colorjs.io', () => {
  const c = tokens.color;
  const pairs = [
    ['cream on midnight', c.cream.$value, c.midnight.$value, 4.5],
    ['cream-muted on midnight', c['cream-muted'].$value, c.midnight.$value, 4.5],
    ['gold on midnight', c.gold.$value, c.midnight.$value, 4.5],
    ['gold-light on midnight', c['gold-light'].$value, c.midnight.$value, 4.5],
    ['cream on surface-portal', c.cream.$value, c['surface-portal'].$value, 4.5],
    ['gold-light on surface-portal', c['gold-light'].$value, c['surface-portal'].$value, 4.5],
    ['gold on surface-portal', c.gold.$value, c['surface-portal'].$value, 4.5],
    ['midnight on gold-light CTA', c.midnight.$value, c['gold-light'].$value, 4.5],
  ];

  for (const [label, fg, bg, min] of pairs) {
    const ratio = contrast(fg, bg);
    assert.ok(ratio >= min, `${label}: ${ratio.toFixed(2)}:1 < ${min}:1`);
  }
});

test('oam-web uses Cormorant Garamond + IBM Plex Sans, semantic nav, reduced motion, and zero purple gradients', () => {
  const layout = fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8');
  const page = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
  const css = fs.readFileSync(path.join(root, 'styles/globals.css'), 'utf8');

  assert.match(layout, /Cormorant_Garamond/);
  assert.match(layout, /IBM_Plex_Sans/);
  assert.doesNotMatch(layout, /\bInter\b/);
  assert.match(page, /<nav\s+aria-label="Primary"/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(css, /#1b3a8f/i);
  assert.doesNotMatch(css, /purple|violet|fuchsia/i);
  assert.doesNotMatch(layout + page + css, /[\u2013\u2014\u2015]/);

  const titleMatch = layout.match(/SITE_TITLE\s*=\s*'([^']+)'/) ?? layout.match(/default:\s*'([^']+)'/);
  assert.ok(titleMatch, 'default title present');
  assert.ok(titleMatch[1].length >= 25 && titleMatch[1].length <= 60, `title length ${titleMatch[1].length} out of 25..60 range`);
});
