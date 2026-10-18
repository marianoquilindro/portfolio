// Recorta una region de una captura y mide ahi la caja del lima puro.
import sharp from "sharp";

const archivo = process.argv[2];
const left = Number(process.argv[3]);
const top = Number(process.argv[4]);
const width = Number(process.argv[5]);
const height = Number(process.argv[6]);
const salida = process.argv[7];

const { data, info } = await sharp(archivo)
  .extract({ left, top, width, height })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

if (salida) {
  await sharp(archivo).extract({ left, top, width, height }).toFile(salida);
}

let minX = Infinity;
let maxX = -1;
let minY = Infinity;
let maxY = -1;

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (g > 235 && r > 190 && r < 235 && b < 90) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

console.log(`recorte: ${left},${top} ${width}x${height} (de ${archivo})`);
if (maxX < 0) {
  console.log("sin lima");
} else {
  console.log(`lima (relativo al recorte): x ${minX}..${maxX}  y ${minY}..${maxY}`);
  console.log(`ancho visible: ${maxX - minX + 1}  alto visible: ${maxY - minY + 1}`);
  console.log(`centro x: ${(minX + maxX) / 2}  (centro del recorte: ${(width - 1) / 2})`);
  console.log(`margen izquierdo: ${minX}  margen derecho: ${width - 1 - maxX}`);
}
