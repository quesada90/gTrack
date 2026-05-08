#!/usr/bin/env node
// Generates icon-192.png and icon-512.png using only Node.js built-ins
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// 5×7 bitmap glyphs for 'g' and 'T'
const GLYPH_G = [
  [0,1,1,1,0],
  [1,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,1],
  [0,0,0,0,1],
  [1,0,0,0,1],
  [0,1,1,1,0],
];
const GLYPH_T = [
  [1,1,1,1,1],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
  [0,0,1,0,0],
];

const BG  = [10, 10, 10];    // #0A0A0A
const FG  = [249, 115, 22];  // #F97316

// ── PNG encoding ──────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const b of buf) c = (c >>> 8) ^ CRC_TABLE[(c ^ b) & 0xFF];
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function chunk(type, data) {
  const t   = Buffer.from(type, 'ascii');
  const len = Buffer.allocUnsafe(4); len.writeUInt32BE(data.length);
  const crc = Buffer.allocUnsafe(4); crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function encodePNG(width, height, pixels) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.allocUnsafe(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = ihdr[11] = ihdr[12] = 0; // 8-bit RGB

  // scanlines: filter byte (0 = None) + RGB row
  const raw = Buffer.allocUnsafe(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 3)] = 0;
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 3;
      const dst = y * (1 + width * 3) + 1 + x * 3;
      raw[dst]     = pixels[src];
      raw[dst + 1] = pixels[src + 1];
      raw[dst + 2] = pixels[src + 2];
    }
  }

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Icon rendering ─────────────────────────────────────────────────────────────

function renderIcon(size) {
  const pixels = new Uint8Array(size * size * 3);
  // fill background
  for (let i = 0; i < size * size; i++) {
    pixels[i*3] = BG[0]; pixels[i*3+1] = BG[1]; pixels[i*3+2] = BG[2];
  }

  function fillRect(x, y, w, h, color) {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        const px = x + dx, py = y + dy;
        if (px < 0 || px >= size || py < 0 || py >= size) continue;
        const i = (py * size + px) * 3;
        pixels[i] = color[0]; pixels[i+1] = color[1]; pixels[i+2] = color[2];
      }
    }
  }

  // scale: each glyph pixel → s×s block
  const s     = Math.max(1, Math.round(size / 32));
  const glyphW = 5 * s;
  const glyphH = 7 * s;
  const gap    = 2 * s;
  const totalW = glyphW * 2 + gap;
  const offsetX = Math.floor((size - totalW) / 2);
  const offsetY = Math.floor((size - glyphH) / 2);

  for (const [glyph, colIdx] of [[GLYPH_G, 0], [GLYPH_T, 1]]) {
    const x0 = offsetX + colIdx * (glyphW + gap);
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        if (glyph[row][col]) {
          fillRect(x0 + col * s, offsetY + row * s, s, s, FG);
        }
      }
    }
  }

  return pixels;
}

// ── Output ────────────────────────────────────────────────────────────────────

const outDir = path.join(__dirname, '../gtrack-app/public');
fs.mkdirSync(outDir, { recursive: true });

for (const size of [192, 512]) {
  const pixels = renderIcon(size);
  const png    = encodePNG(size, size, pixels);
  const out    = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(out, png);
  console.log(`✅ icon-${size}.png (${png.length} bytes)`);
}
