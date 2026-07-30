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

        const projection = geoMercator().fitSize([WIDTH, HEIGHT], collection);
        const pathGen: GeoPath = geoPath(projection);

        const provinces: Record<string, ProvinceGeo> = {};
        for (const feature of collection.features) {
          const name = feature.properties?.PROVINSI as string;
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
