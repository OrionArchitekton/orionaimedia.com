// Renders public/og.png, public/apple-touch-icon.png and public/favicon.ico from public/crest.svg
// in the Observatory palette. Run after changing the crest or palette, then commit the three files:
//   npm run brand:build
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import sharp from 'sharp';

const PUBLIC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public');
const crestSvg = await readFile(path.join(PUBLIC, 'crest.svg'));
const crestDataUri = `data:image/svg+xml;base64,${crestSvg.toString('base64')}`;

const SHARE_IMAGE_HTML = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500&family=Inter:wght@500&display=swap" rel="stylesheet">
<style>
  body { margin: 0; width: 1200px; height: 630px; display: flex; flex-direction: column;
    align-items: center; justify-content: center; color: #FEF2CA; font-family: Inter, sans-serif;
    background:
      radial-gradient(1.5px 1.5px at 12% 20%, rgb(255 255 255 / 0.6) 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 80% 14%, rgb(255 255 255 / 0.6) 50%, transparent 51%),
      radial-gradient(2px 2px at 66% 32%, rgb(253 215 139 / 0.7) 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 28% 72%, rgb(255 255 255 / 0.45) 50%, transparent 51%),
      radial-gradient(1.5px 1.5px at 90% 70%, rgb(255 255 255 / 0.5) 50%, transparent 51%),
      radial-gradient(ellipse at 50% -10%, #1B3A8F 0%, #0A1B4D 40%, #050A1F 80%); }
  img { width: 132px; height: 132px; margin-bottom: 28px; }
  .wordmark { font-family: 'Cormorant Garamond', serif; font-weight: 600; font-size: 76px; letter-spacing: 0.14em;
    background: linear-gradient(180deg, #FDD78B, #E8B45C 60%, #B3842A); -webkit-background-clip: text; color: transparent; }
  .tagline { margin-top: 14px; font-size: 18px; letter-spacing: 0.4em; text-transform: uppercase; color: #E8B45C; }
  .lede { margin-top: 26px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 34px; }
</style></head><body>
<img src="${crestDataUri}" alt="">
<div class="wordmark">ORION ASCEND MEDIA</div>
<div class="tagline">Imagine · Create · Transcend</div>
<div class="lede">A small house of original channels for stillness, sound and wonder.</div>
</body></html>`;

const browser = await puppeteer.launch();
try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.setContent(SHARE_IMAGE_HTML, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await writeFile(path.join(PUBLIC, 'og.png'), await page.screenshot({ type: 'png' }));
} finally {
    await browser.close();
}

const crestPng = (size) => sharp(crestSvg, { density: 384 }).resize(size, size).png().toBuffer();

// Touch icon: the crest centred on midnight.
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#050A1F' } })
    .composite([{ input: await crestPng(140), gravity: 'centre' }])
    .png()
    .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));

// favicon.ico: an ICO container holding 32px and 48px PNG images.
const sizes = [32, 48];
const images = await Promise.all(sizes.map(crestPng));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // image type: icon
header.writeUInt16LE(images.length, 4);
let offset = header.length + 16 * images.length;
const directory = images.map((png, index) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(sizes[index], 0); // width
    entry.writeUInt8(sizes[index], 1); // height
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
});
await writeFile(path.join(PUBLIC, 'favicon.ico'), Buffer.concat([header, ...directory, ...images]));

console.log('wrote public/og.png, public/apple-touch-icon.png, public/favicon.ico');
