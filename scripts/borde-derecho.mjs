// Muestrea columnas del borde derecho para identificar la franja vertical.
import sharp from "sharp";

const archivo = process.argv[2];
const ys = process.argv.slice(3).map(Number);

const { data, info } = await sharp(archivo)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log(`${archivo} (${info.width}x${info.height})`);

function px(x, y) {
  const i = (y * info.width + x) * info.channels;
  return `${data[i]},${data[i + 1]},${data[i + 2]}`;
}

for (const y of ys) {
  const linea = [];
  for (let x = info.width - 12; x < info.width; x++) linea.push(`${x}:${px(x, y)}`);
  console.log(`y=${String(y).padStart(4)}  ${linea.join("  ")}`);
}
