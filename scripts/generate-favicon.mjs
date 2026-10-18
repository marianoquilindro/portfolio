import sharp from "sharp";
import fs from "fs";

async function main() {
  const svg = fs.readFileSync("src/app/icon.svg");
  
  // Generate 32x32 PNG
  const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
  // Generate 192x192 PNG for apple-touch-icon / high res
  const png192 = await sharp(svg).resize(192, 192).png().toBuffer();
  
  fs.writeFileSync("public/icon-192.png", png192);
  fs.writeFileSync("public/icon-32.png", png32);
  fs.writeFileSync("src/app/apple-icon.png", png192);

  // Construct valid ICO container containing the 32x32 PNG
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0); // Width 32
  dirEntry.writeUInt8(32, 1); // Height 32
  dirEntry.writeUInt8(0, 2);  // Palette
  dirEntry.writeUInt8(0, 3);  // Reserved
  dirEntry.writeUInt16LE(1, 4); // Color planes
  dirEntry.writeUInt16LE(32, 6); // Bits per pixel
  dirEntry.writeUInt32LE(png32.length, 8); // Size
  dirEntry.writeUInt32LE(22, 12); // Offset 6 + 16 = 22

  const icoBuffer = Buffer.concat([header, dirEntry, png32]);
  fs.writeFileSync("src/app/favicon.ico", icoBuffer);
  fs.writeFileSync("public/favicon.ico", icoBuffer);
  console.log("Favicon successfully generated! Sizes:", {
    ico: icoBuffer.length,
    png32: png32.length,
    png192: png192.length
  });
}

main().catch(console.error);
