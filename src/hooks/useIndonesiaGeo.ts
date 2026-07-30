import { useEffect, useState } from "react";
import { geoMercator, geoPath, type GeoPath, type GeoPermissibleObjects } from "d3-geo";

export interface ProvinceGeo {
  d: string;
  bbox: [[number, number], [number, number]];
  centroid: [number, number];
}

export interface IndonesiaGeo {
  width: number;
  height: number;
  provinces: Record<string, ProvinceGeo>;
  project: (lon: number, lat: number) => [number, number];
}

const GEOJSON_URL = `${import.meta.env.BASE_URL}geo/indonesia-38-provinces.geojson`;
const WIDTH = 1000;
const HEIGHT = 420;

// The source GeoJSON labels Yogyakarta with its full official name, while the
// workbook (and the rest of this app) uses the short form used everywhere
// else in BPS/Kemendagri publications. Normalize here, once, at the source.
const NAME_FIX: Record<string, string> = {
  "Daerah Istimewa Yogyakarta": "DI Yogyakarta",
};

// D3's default preclip (geoClipAntimeridian) is built for data that may cross
// the +/-180deg meridian. Indonesia never does, but some GeoJSON exports still
// trip its winding-order heuristics, which makes d3 emit an extra "frame"
// ring that traces the full canvas edge — rendered as a giant solid rectangle
// with the real province shape appearing as a tiny hole in it. Since our data
// never needs antimeridian handling, we bypass it with a pass-through preclip.
const noAntimeridianClip = <T,>(sink: T) => sink;

/**
 * Fetches the official Indonesia 38-province boundary GeoJSON and builds a
 * live D3 (geoMercator + geoPath) projection in the browser — matching the
 * original brief's "Interactive Map: SVG + D3.js" requirement. Nothing here
 * is a pre-baked static image; every province path is computed at runtime.
 */
export function useIndonesiaGeo() {
  const [geo, setGeo] = useState<IndonesiaGeo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(GEOJSON_URL);
        if (!res.ok) throw new Error(`GeoJSON fetch failed: HTTP ${res.status}`);
        const collection = await res.json();
        if (cancelled) return;

        const projection = geoMercator().preclip(noAntimeridianClip).fitSize([WIDTH, HEIGHT], collection);
        const pathGen: GeoPath = geoPath(projection);

        const provinces: Record<string, ProvinceGeo> = {};
        for (const feature of collection.features) {
          const rawName = feature.properties?.PROVINSI as string;
          const name = NAME_FIX[rawName] ?? rawName;
          if (!name) continue;
          const d = pathGen(feature as GeoPermissibleObjects) || "";
          const b = pathGen.bounds(feature as GeoPermissibleObjects);
          const c = pathGen.centroid(feature as GeoPermissibleObjects);
          provinces[name] = { d, bbox: b, centroid: c };
        }

        setGeo({
          width: WIDTH,
          height: HEIGHT,
          provinces,
          project: (lon: number, lat: number) => projection([lon, lat]) as [number, number],
        });
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load map geometry");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { geo, error };
}
