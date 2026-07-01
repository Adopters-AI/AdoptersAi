import fs from "node:fs";
import path from "node:path";

const [, , inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  throw new Error("Usage: node scripts/patch-almarai-font.mjs <input.ttf> <output.ttf>");
}

const font = fs.readFileSync(inputPath);

function tableRecord(tag) {
  const tableCount = font.readUInt16BE(4);
  for (let index = 0; index < tableCount; index += 1) {
    const recordOffset = 12 + index * 16;
    if (font.toString("ascii", recordOffset, recordOffset + 4) === tag) {
      return {
        recordOffset,
        offset: font.readUInt32BE(recordOffset + 8),
        length: font.readUInt32BE(recordOffset + 12)
      };
    }
  }
  throw new Error(`Missing required TrueType table: ${tag}`);
}

function checksum(buffer, offset = 0, length = buffer.length) {
  let total = 0;
  const paddedLength = Math.ceil(length / 4) * 4;
  for (let index = 0; index < paddedLength; index += 4) {
    let word = 0;
    for (let byte = 0; byte < 4; byte += 1) {
      const position = offset + index + byte;
      word = (word << 8) | (position < offset + length ? buffer[position] : 0);
    }
    total = (total + (word >>> 0)) >>> 0;
  }
  return total >>> 0;
}

const head = tableRecord("head");
const hhea = tableRecord("hhea");
const os2 = tableRecord("OS/2");
const unitsPerEm = font.readUInt16BE(head.offset + 18);
const glyphYMin = font.readInt16BE(head.offset + 38);
const padding = Math.round(unitsPerEm * 0.04);
const safeDescent = Math.min(32767, -glyphYMin + padding);
const safeSignedDescent = -safeDescent;

const oldMetrics = {
  hheaDescent: font.readInt16BE(hhea.offset + 6),
  typoDescent: font.readInt16BE(os2.offset + 70),
  winDescent: font.readUInt16BE(os2.offset + 76)
};

font.writeInt16BE(Math.min(oldMetrics.hheaDescent, safeSignedDescent), hhea.offset + 6);
font.writeInt16BE(Math.min(oldMetrics.typoDescent, safeSignedDescent), os2.offset + 70);
font.writeUInt16BE(Math.max(oldMetrics.winDescent, safeDescent), os2.offset + 76);

// Recalculate table checksums and the font-wide checkSumAdjustment.
font.writeUInt32BE(0, head.offset + 8);
for (const table of [head, hhea, os2]) {
  font.writeUInt32BE(checksum(font, table.offset, table.length), table.recordOffset + 4);
}
const adjustment = (0xb1b0afba - checksum(font)) >>> 0;
font.writeUInt32BE(adjustment, head.offset + 8);

if (checksum(font) !== 0xb1b0afba) {
  throw new Error("Patched font checksum validation failed");
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, font);

console.log(JSON.stringify({
  input: inputPath,
  output: outputPath,
  unitsPerEm,
  glyphYMin,
  padding,
  oldMetrics,
  newMetrics: {
    hheaDescent: font.readInt16BE(hhea.offset + 6),
    typoDescent: font.readInt16BE(os2.offset + 70),
    winDescent: font.readUInt16BE(os2.offset + 76)
  }
}, null, 2));
