// Store-only ZIP: no compression dependency. Filenames are fixed by the exporter.
// Archive validity is checked independently by unzip in the download tests.
const encoder = new TextEncoder();
const crcTable = Uint32Array.from({ length: 256 }, (_, value) => {
  for (let bit = 0; bit < 8; bit++)
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function record(size) {
  const bytes = new Uint8Array(size);
  return { bytes, view: new DataView(bytes.buffer) };
}
export function storedZip(files) {
  const entries = [],
    central = [];
  let offset = 0;
  for (const [filename, content] of Object.entries(files)) {
    const name = encoder.encode(filename),
      data = encoder.encode(content),
      checksum = crc32(data);
    if (name.length > 65535 || data.length > 0xffffffff)
      throw new RangeError("Project exceeds ZIP size limits");
    const local = record(30);
    local.view.setUint32(0, 0x04034b50, true);
    local.view.setUint16(4, 20, true);
    local.view.setUint16(6, 0x0800, true); // UTF-8
    local.view.setUint16(12, 33, true); // 1980-01-01; deterministic archives
    local.view.setUint32(14, checksum, true);
    local.view.setUint32(18, data.length, true);
    local.view.setUint32(22, data.length, true);
    local.view.setUint16(26, name.length, true);
    entries.push(local.bytes, name, data);
    const header = record(46);
    header.view.setUint32(0, 0x02014b50, true);
    header.view.setUint16(4, 20, true);
    header.view.setUint16(6, 20, true);
    header.view.setUint16(8, 0x0800, true);
    header.view.setUint16(14, 33, true);
    header.view.setUint32(16, checksum, true);
    header.view.setUint32(20, data.length, true);
    header.view.setUint32(24, data.length, true);
    header.view.setUint16(28, name.length, true);
    header.view.setUint32(42, offset, true);
    central.push(header.bytes, name);
    offset += local.bytes.length + name.length + data.length;
  }
  const centralSize = central.reduce((total, part) => total + part.length, 0);
  const count = Object.keys(files).length;
  if (count > 65535 || offset + centralSize > 0xffffffff)
    throw new RangeError("Project exceeds ZIP size limits");
  const end = record(22);
  end.view.setUint32(0, 0x06054b50, true);
  end.view.setUint16(8, count, true);
  end.view.setUint16(10, count, true);
  end.view.setUint32(12, centralSize, true);
  end.view.setUint32(16, offset, true);
  return new Blob([...entries, ...central, end.bytes], {
    type: "application/zip",
  });
}
