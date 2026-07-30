import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useAppData } from "@/context/DataContext";
import type { MapLayers } from "@/types";

interface Props {
  hovered: string | null;
  setHovered: (name: string | null) => void;
  selected: string | null;
  onSelect: (name: string) => void;
  layers: MapLayers;
  onMouseMove?: (x: number, y: number) => void;
}

const BCA_PRIMARY = "#005BAC";
const BCA_SECONDARY = "#00AEEF";
const BCA_WARNING = "#F59E0B";

function getZoomTransform(bbox: [[number, number], [number, number]] | undefined, vbW: number, vbH: number) {
  if (!bbox) return { scale: 1, tx: 0, ty: 0 };
  const [[minx, miny], [maxx, maxy]] = bbox;
  const bw = Math.max(1, maxx - minx);
  const bh = Math.max(1, maxy - miny);
  const cx = (minx + maxx) / 2;
  const cy = (miny + maxy) / 2;
  const scale = Math.min(6, Math.max(1.6, Math.min((vbW * 0.55) / bw, (vbH * 0.55) / bh)));
  return { scale, tx: vbW / 2 - cx * scale, ty: vbH / 2 - cy * scale };
}

export function IndonesiaMap({ hovered, setHovered, selected, onSelect, layers, onMouseMove }: Props) {
  const { data, geo } = useAppData();

  const maxTrips = useMemo(() => {
    if (!data) return 1;
    return Math.max(1, ...Object.values(data.trips).map((t) => t.trips2025 || 0));
  }, [data]);

  if (!geo || !data) return null;

  const zoom = selected ? getZoomTransform(geo.provinces[selected]?.bbox, geo.width, geo.height) : { scale: 1, tx: 0, ty: 0 };

  const colorFor = (name: string) => {
    if (selected === name) return BCA_PRIMARY;
    if (hovered === name) return "#3E8FD1";
    if (layers.intensity) {
      const t = data.trips[name];
      const intensity = t ? Math.max(0.1, t.trips2025 / maxTrips) : 0.1;
      return `rgba(0,91,172,${(0.15 + intensity * 0.6).toFixed(2)})`;
    }
    return "#DCE9F7";
  };

  const visibleDestinations = layers.destinations && selected
    ? data.destinations.filter((d) => d.province === selected)
    : [];

  return (
    <svg
      viewBox={`0 0 ${geo.width} ${geo.height}`}
      className="w-full h-full"
      role="img"
      aria-label="Interactive map of Indonesia's 38 provinces"
      onMouseMove={(e) => {
        if (!onMouseMove) return;
        const rect = e.currentTarget.getBoundingClientRect();
        onMouseMove(e.clientX - rect.left, e.clientY - rect.top);
      }}
    >
      <motion.g
        animate={{ x: zoom.tx, y: zoom.ty, scale: zoom.scale }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "0px 0px" }}
      >
        <g stroke="#ffffff" strokeWidth={0.7 / zoom.scale}>
          {Object.entries(geo.provinces).map(([name, p]) => (
            <path
              key={name}
              d={p.d}
              fill={colorFor(name)}
              opacity={selected && selected !== name ? 0.35 : 1}
              className="cursor-pointer transition-[fill,opacity] duration-300"
              tabIndex={0}
              role="button"
              aria-label={`${name} province`}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(name)}
              onBlur={() => setHovered(null)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect(name);
              }}
              onClick={() => onSelect(name)}
            />
          ))}
        </g>

        {visibleDestinations.map((d, i) => {
          const [x, y] = geo.project(d.lon, d.lat);
          return (
            <motion.g
              key={d.name}
              transform={`translate(${x}, ${y})`}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.015 }}
            >
              <circle r={2.6 / zoom.scale} fill="#ffffff" />
              <circle r={1.5 / zoom.scale} fill={d.kspn ? BCA_WARNING : BCA_SECONDARY} />
            </motion.g>
          );
        })}
      </motion.g>
    </svg>
  );
}
