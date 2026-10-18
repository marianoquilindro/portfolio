// Utilidad de diagnóstico: describe una captura sin poder verla.
//   node scripts/ver-captura.mjs <archivo> [desde] [hasta]
// desde/hasta son fracciones verticales (0 a 1) para mirar solo un tramo.
import sharp from "sharp";

const archivo = process.argv[2];
const desde = Number(process.argv[3] ?? 0);
const hasta = Number(process.argv[4] ?? 1);

const meta = await sharp(archivo).metadata();
const altoRecorte = Math.round(meta.height * (hasta - desde));
const top = Math.round(meta.height * desde);

const base = sharp(archivo).extract({ left: 0, top, width: meta.width, height: altoRecorte });

// ── Perfil de extensión: por cada banda horizontal, dónde empieza y termina lo
// "encendido". Sirve para ver márgenes y detectar contenido cortado al borde.
const BANDAS = 30;
const { data: perfil, info: ip } = await base
  .clone()
  .resize(meta.width, BANDAS, { fit: "fill" })
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

console.log(`archivo: ${archivo}  (${meta.width}x${meta.height})`);
console.log(`tramo y: ${desde}–${hasta}`);
console.log("");
console.log("banda | izq(px) | der(px) | ancho | margen izq % | margen der %");

const UMBRAL = 40;
for (let b = 0; b < ip.height; b++) {
  let izq = -1;
  let der = -1;
  for (let x = 0; x < ip.width; x++) {
    if (perfil[b * ip.width + x] > UMBRAL) {
      if (izq === -1) izq = x;
      der = x;
    }
  }
  const etiqueta = String(desde + ((b + 0.5) / BANDAS) * (hasta - desde)).slice(0, 6);
  if (izq === -1) {
    console.log(`${etiqueta.padEnd(6)}|  (vacío)`);
    continue;
  }
  const mi = ((izq / ip.width) * 100).toFixed(1);
  const md = (((ip.width - 1 - der) / ip.width) * 100).toFixed(1);
  console.log(
    `${etiqueta.padEnd(6)}| ${String(izq).padStart(7)} | ${String(der).padStart(7)} | ${String(der - izq).padStart(5)} | ${mi.padStart(12)} | ${md.padStart(12)}`,
  );
}

// ── Vista ASCII del tramo.
const COLS = 100;
const FILAS = 54;
const { data, info } = await base
  .clone()
  .resize(COLS, FILAS, { fit: "fill" })
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

const rampa = " .:-=+*#%@";
console.log("");
console.log(`vista ASCII (${COLS}x${FILAS}):`);
for (let y = 0; y < info.height; y++) {
  let linea = "";
  for (let x = 0; x < info.width; x++) {
    const v = data[y * info.width + x];
    linea += rampa[Math.min(rampa.length - 1, Math.floor((v / 256) * rampa.length))];
  }
  console.log(linea);
}
