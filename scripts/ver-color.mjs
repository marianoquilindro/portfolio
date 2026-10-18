// Describe una captura por color, no solo por brillo: distingue el lima del
// sitio (#D2FF3A) del crema del texto (#F4F3EF) sobre el fondo oscuro.
import sharp from "sharp";

const archivo = process.argv[2];
const COLS = Number(process.argv[3] ?? 64);
const FILAS = Number(process.argv[4] ?? 44);

const { data, info } = await sharp(archivo)
  .resize(COLS, FILAS, { fit: "fill" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const filas = [];
for (let y = 0; y < info.height; y++) {
  let linea = "";
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * info.channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;

    if (lum < 22) {
      linea += " ";
      continue;
    }

    // Lima: mucho verde y azul bajo. Crema: los tres canales parejos y altos.
    const esLima = g > r + 18 && g > b + 40;
    const esCrema = Math.abs(r - g) < 40 && b > 90;

    let ch;
    if (esLima) ch = lum > 170 ? "L" : "l";
    else if (esCrema) ch = lum > 170 ? "#" : "+";
    else ch = lum > 170 ? "@" : lum > 90 ? "=" : ":";
    linea += ch;
  }
  filas.push(linea);
}

console.log(`${archivo} → ${COLS}x${FILAS}`);
console.log("L/l = lima   #/+ = crema o claro   @/=/: = otros   (espacio = casi negro)");
console.log("");
console.log("   " + "_".repeat(COLS));
filas.forEach((f, y) => console.log(String(y).padStart(2) + "|" + f + "|"));
