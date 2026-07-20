// Build the Play Store asset set into store/.
//   node scripts/build-store-assets.js
// Screenshots are captured separately from a device/emulator and dropped into
// store/screenshots/; this script only produces the generated artwork.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const A = p => path.join(root, 'assets', p);
const OUT = p => path.join(root, 'store', p);

fs.mkdirSync(path.join(root, 'store'), { recursive: true });

async function run() {
  // Play Store app icon: exactly 512x512, 32-bit PNG.
  await sharp(A('icon.svg'), { density: 400 })
    .resize(512, 512)
    .png()
    .toFile(OUT('icon-512.png'));
  console.log('store/icon-512.png  512x512');

  // Feature graphic: exactly 1024x500, no alpha.
  await sharp(A('feature-graphic.svg'), { density: 200 })
    .resize(1024, 500)
    .flatten({ background: '#121220' })
    .png()
    .toFile(OUT('feature-graphic.png'));
  console.log('store/feature-graphic.png  1024x500');
}

run().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
