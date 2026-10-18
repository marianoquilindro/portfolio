// Imprime, para algunas filas, los tramos horizontales de lima puro.
// Sirve para ubicar los bordes de la marca del hero.
import sharp from "sharp";

const archivo = process.argv[2];
const filas = process.argv.slice(3).map(Number);

const { data, info } = await sharp(archivo)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log(`${archivo} (${info.width}x${info.height})`);

for (const y of filas) {
  if (y < 0 || y >= info.height) continue;
  const tramos = [];
  let inicio = -1;
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lima = g > 235 && r > 190 && r < 235 && b < 90;
    if (lima && inicio === -1) inicio = x;
    if (!lima && inicio !== -1) {
      tramos.push(`${inicio}-${x - 1}`);
      inicio = -1;
    }
  }
  if (inicio !== -1) tramos.push(`${inicio}-${info.width - 1}`);
  console.log(`y=${String(y).padStart(4)}: ${tramos.length ? tramos.join("  ") : "(sin lima)"}`);
}
