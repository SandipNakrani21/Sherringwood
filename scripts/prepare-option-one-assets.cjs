const sharp = require('sharp');
const path = require('path');

// Extract original artwork, never regenerate faces or substitute photography.
// Coordinates use the approved 673 × 2048 reference as the design coordinate system.
const source = process.argv[2];
if (!source) throw new Error('Supply the path to the highest-resolution original mockup.');

const crops = {
  hero: [265, 58, 408, 319],
  science: [26, 555, 395, 218],
  violin: [429, 555, 219, 218],
  painting: [26, 781, 198, 163],
  football: [231, 781, 190, 163],
  celebration: [429, 781, 219, 163],
  film: [30, 998, 351, 149],
  learning: [338, 1195, 303, 223],
  campus: [0, 1527, 463, 133],
  journalArt: [30, 1717, 300, 74],
  journalLearning: [348, 1717, 166, 99],
  leaf: [604, 1017, 69, 131],
  // Ornament-only areas: text is rendered separately in the page.
  valuesOrnament: [0, 378, 128, 58],
};

async function prepare() {
  const { width, height } = await sharp(source).metadata();
  const scaleX = width / 673;
  const scaleY = height / 2048;
  for (const [name, [x, y, w, h]] of Object.entries(crops)) {
    const left = Math.round(x * scaleX);
    const top = Math.round(y * scaleY);
    const cropWidth = Math.min(Math.round(w * scaleX), width - left);
    const cropHeight = Math.min(Math.round(h * scaleY), height - top);
    await sharp(source)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .webp({ lossless: true })
      .toFile(path.join(process.cwd(), 'public/images/option-1', `${name}-original.webp`));
    console.log(`${name}: ${cropWidth} × ${cropHeight} source pixels`);
  }
}

prepare().catch((error) => { console.error(error.message); process.exitCode = 1; });
