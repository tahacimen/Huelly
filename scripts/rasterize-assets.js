// Rasterise the brand SVGs in assets/ into the PNGs @capacitor/assets expects.
// Run after editing assets/icon.svg or assets/splash.svg:
//   node scripts/rasterize-assets.js && npx capacitor-assets generate --android
const sharp = require('sharp');
const path = require('path');

const A = p => path.join(__dirname, '..', 'assets', p);

async function run() {
  await sharp(A('icon.svg'), { density: 400 })
    .resize(1024, 1024)
    .png()
    .toFile(A('icon.png'));
  console.log('icon.png 1024x1024');

  // The game is dark-only, so the light and dark splash are the same artwork.
  for (const out of ['splash.png', 'splash-dark.png']) {
    await sharp(A('splash.svg'), { density: 200 })
      .resize(2732, 2732)
      .png()
      .toFile(A(out));
    console.log(out + ' 2732x2732');
  }
}

run().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
