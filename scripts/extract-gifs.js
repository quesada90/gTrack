#!/usr/bin/env node
// Copies the 20 exercise GIFs from exercises-dataset into gtrack-app/public/videos/
// Usage: node scripts/extract-gifs.js <path-to-exercises-dataset>

const fs   = require('fs');
const path = require('path');

const datasetPath = process.argv[2];
if (!datasetPath) {
  console.error('Usage: node scripts/extract-gifs.js <path-to-exercises-dataset>');
  process.exit(1);
}

// Exact gif_url values from exercises.json mapped to our normalised names
const GIF_MAP = [
  { src: 'videos/2287-V07qpXy.gif', dest: 'leg-press.gif'        },
  { src: 'videos/0577-T0yTjgW.gif', dest: 'chest-press.gif'      },
  { src: 'videos/0603-67n3r98.gif', dest: 'shoulder-press.gif'   },
  { src: 'videos/0153-OQ1otBN.gif', dest: 'pec-deck.gif'         },
  { src: 'videos/0201-3ZflifB.gif', dest: 'triceps-pushdown.gif' },
  { src: 'videos/0464-CosupLu.gif', dest: 'plank.gif'            },
  { src: 'videos/0276-iny3m5y.gif', dest: 'dead-bug.gif'         },
  { src: 'videos/2330-LEprlgG.gif', dest: 'pull-down.gif'        },
  { src: 'videos/0180-hvV79Si.gif', dest: 'low-row.gif'          },
  { src: 'videos/0017-kiJ4Z2K.gif', dest: 'assisted-pull-up.gif' },
  { src: 'videos/0868-G08RZcQ.gif', dest: 'bicep-curl.gif'       },
  { src: 'videos/0202-yUdIGNs.gif', dest: 'face-pull.gif'        },
  { src: 'videos/2333-PXTIwgu.gif', dest: 'dead-hang.gif'        },
  { src: 'videos/3544-5VXmnV5.gif', dest: 'side-plank.gif'       },
  { src: 'videos/0585-my33uHU.gif', dest: 'leg-extension.gif'    },
  { src: 'videos/0586-17lJ1kr.gif', dest: 'leg-curl.gif'         },
  { src: 'videos/0597-CHpahtl.gif', dest: 'hip-abduction.gif'    },
  { src: 'videos/3236-Pjbc0Kt.gif', dest: 'hip-thrust.gif'       },
  { src: 'videos/0605-ykUOVze.gif', dest: 'calf-raise.gif'       },
  { src: 'videos/1014-H6ETwO9.gif', dest: 'hollow-body.gif'      }, // V-up — closest to hollow body hold
];

const outDir = path.join(__dirname, '../gtrack-app/public/videos');
fs.mkdirSync(outDir, { recursive: true });

let ok = 0;
for (const { src, dest } of GIF_MAP) {
  const srcPath  = path.join(datasetPath, src);
  const destPath = path.join(outDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const kb = (fs.statSync(destPath).size / 1024).toFixed(0);
    console.log(`✅ ${dest} (${kb} KB)`);
    ok++;
  } else {
    console.log(`❌ NOT FOUND: ${src} → ${dest}`);
  }
}

console.log(`\n${ok}/${GIF_MAP.length} GIFs extracted to gtrack-app/public/videos/`);
