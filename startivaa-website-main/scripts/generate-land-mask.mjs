import fs from 'fs';
import path from 'path';

const GEOJSON_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson';

function inside(point, vs) {
  const x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0], yi = vs[i][1];
    const xj = vs[j][0], yj = vs[j][1];
    const intersect = ((yi > y) !== (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function isPointInPolygon(point, polygonCoords) {
  if (!polygonCoords || polygonCoords.length === 0) return false;
  // Check outer ring
  if (!inside(point, polygonCoords[0])) return false;
  // Check holes
  for (let i = 1; i < polygonCoords.length; i++) {
    if (inside(point, polygonCoords[i])) return false;
  }
  return true;
}

function isPointInMultiPolygon(point, multiPolygonCoords) {
  for (const polygonCoords of multiPolygonCoords) {
    if (isPointInPolygon(point, polygonCoords)) return true;
  }
  return false;
}

async function run() {
  console.log(`Downloading GeoJSON from ${GEOJSON_URL}...`);
  const res = await fetch(GEOJSON_URL);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const geojson = await res.json();

  console.log('Rasterizing land mask (360x180)...');
  const width = 360;
  const height = 180;
  const totalPixels = width * height;
  const mask = new Uint8Array(totalPixels);

  const features = geojson.features;

  for (let y = 0; y < height; y++) {
    const lat = 90 - (y + 0.5); // Center of pixel
    for (let x = 0; x < width; x++) {
      const lng = (x + 0.5) - 180; // Center of pixel
      const point = [lng, lat];

      let isLand = false;
      for (const feature of features) {
        const geom = feature.geometry;
        if (!geom) continue;

        if (geom.type === 'Polygon') {
          if (isPointInPolygon(point, geom.coordinates)) {
            isLand = true;
            break;
          }
        } else if (geom.type === 'MultiPolygon') {
          if (isPointInMultiPolygon(point, geom.coordinates)) {
            isLand = true;
            break;
          }
        }
      }

      mask[y * width + x] = isLand ? 1 : 0;
    }
  }

  // Pack bits (1 bit per pixel) to keep the payload tiny (8,100 bytes)
  const packedSize = Math.ceil(totalPixels / 8);
  const packed = new Uint8Array(packedSize);
  for (let i = 0; i < totalPixels; i++) {
    const byteIdx = Math.floor(i / 8);
    const bitIdx = i % 8;
    if (mask[i] === 1) {
      packed[byteIdx] |= (1 << bitIdx);
    }
  }

  const base64 = Buffer.from(packed).toString('base64');
  console.log(`Successfully generated land mask!`);
  console.log(`Original size: ${totalPixels} bytes`);
  console.log(`Bit-packed size: ${packedSize} bytes`);
  console.log(`Base64 string length: ${base64.length} chars`);

  const outputCode = `// Generated land mask bitmap (360x180, 1 bit per pixel)
export const LAND_MASK_WIDTH = 360;
export const LAND_MASK_HEIGHT = 180;
export const LAND_MASK_BASE64 = "${base64}";
`;

  const outputPath = path.join(process.cwd(), 'components', 'LandMask.ts');
  fs.writeFileSync(outputPath, outputCode);
  console.log(`Written to ${outputPath}`);
}

run().catch(console.error);
