// Mide la caja del lima puro (#D2FF3A) en una captura del sitio del estudio.
// Sirve para saber de qué tamaño y en qué lugar está la marca del hero.
import sharp from "sharp";

const archivo = process.argv[2];
// Tramo vertical a mirar (fracciones), para aislar la marca del hero del resto.
const desde = Number(process.argv[3] ?? 0);
const hasta = Number(process.argv[4] ?? 1);

const { data, info } = await sharp(archivo)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let minX = Infinity;
let maxX = -1;
let minY = Infinity;
let maxY = -1;
let cuenta = 0;

const y0 = Math.round(info.height * desde);
const y1 = Math.round(info.height * hasta);

for (let y = y0; y < y1; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Lima puro del sitio: #D2FF3A
    if (g > 235 && r > 190 && r < 235 && b < 90) {
      cuenta++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const ancho = info.width;
const alto = info.height;

console.log(`archivo: ${archivo} (${ancho}x${alto})  tramo y: ${desde}-${hasta}`);
console.log(`pixeles de lima puro: ${cuenta}`);
if (maxX < 0) {
  console.log("no se encontro lima puro");
} else {
  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  console.log(`caja: x ${minX}..${maxX}  y ${minY}..${maxY}`);
  console.log(`tamano: ${w}x${h}`);
  console.log(`margen izquierdo: ${minX}px (${((minX / ancho) * 100).toFixed(1)}%)`);
  console.log(`margen derecho:   ${ancho - 1 - maxX}px (${(((ancho - 1 - maxX) / ancho) * 100).toFixed(1)}%)`);
  console.log(`centro de la caja: ${(minX + maxX) / 2} (centro del lienzo: ${(ancho - 1) / 2})`);
}
