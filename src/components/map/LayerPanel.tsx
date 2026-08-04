import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Plane, TrendingUp } from "lucide-react";
import type { MapLayers } from "@/types";

interface Props {
  open: boolean;
  layers: MapLayers;
  setLayers: React.Dispatch<React.SetStateAction<MapLayers>>;
}

const ITEMS = [
  { key: "destinations" as const, label: "Tourism Destination", icon: MapPin, color: "#00AEEF" },
  { key: "airports" as const, label: "Main Airport", icon: Plane, color: "#7C3AED" },
  { key: "intensity" as const, label: "Traveler Intensity", icon: TrendingUp, color: "#005BAC" },
];

export function LayerPanel({ open, layers, setLayers }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute top-20 right-5 z-30 bg-white/95 backdrop-blur-md rounded-2xl shadow-floating border border-white/60 p-3 w-64"
        >
          <p className="text-[11px] font-semibold text-bca-sub uppercase tracking-wide px-2 pb-2">Map Layers</p>
          {ITEMS.map((it) => (
            <label
              key={it.key}
              className="flex items-center gap-3 px-2 py-2.5 rounded-xl transition-colors duration-150 hover:bg-bca-soft cursor-pointer"
            >
              <input
                type="checkbox"
                checked={!!layers[it.key]}
                onChange={() => setLayers((s) => ({ ...s, [it.key]: !s[it.key] }))}
                className="accent-bca-primary w-4 h-4"
                aria-label={it.label}
              />
              <it.icon size={15} color={it.color} />
              <span className="text-sm text-bca-ink">{it.label}</span>
            </label>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
