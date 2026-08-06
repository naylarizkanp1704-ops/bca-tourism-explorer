import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Layers as LayersIcon } from "lucide-react";
import { IndonesiaMap } from "@/components/map/IndonesiaMap";
import { MapTooltip } from "@/components/map/MapTooltip";
import { LayerPanel } from "@/components/map/LayerPanel";
import { Legend } from "@/components/map/Legend";
import { HeroOverlay } from "@/components/home/HeroOverlay";
import { Sidebar } from "@/components/home/Sidebar";
import { SearchBar, type SearchResult } from "@/components/home/SearchBar";
import type { MapLayers } from "@/types";

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [layersOpen, setLayersOpen] = useState(false);
  const [layers, setLayers] = useState<MapLayers>({ destinations: true, airports: false, intensity: true });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [heroVisible, setHeroVisible] = useState(true);

  const handleSelect = useCallback((name: string) => {
    setSelected((cur) => (cur === name ? null : name));
    setHeroVisible(false);
  }, []);

  const handleSearchSelect = useCallback((r: SearchResult) => {
    setHeroVisible(false);
    setSelected(r.province);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
      aria-label="Interactive Indonesia domestic tourism map"
    >
      <div className="absolute inset-0 pt-2 pb-2 px-2">
        <IndonesiaMap
          hovered={hovered}
          setHovered={setHovered}
          selected={selected}
          onSelect={handleSelect}
          layers={layers}
          onMouseMove={(x, y) => setTooltipPos({ x, y })}
        />
      </div>

      {!selected && <MapTooltip name={hovered} x={tooltipPos.x} y={tooltipPos.y} />}

      <HeroOverlay visible={heroVisible} onExplore={() => setHeroVisible(false)} />

      {/* Top-center search + top-right controls (Navbar occupies top-left) */}
      <div className="absolute top-5 left-5 right-5 z-30 flex items-start justify-between gap-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 lg:ml-[280px]">
          {selected && (
            <button
              onClick={() => setSelected(null)}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-floating border border-white/60 h-12 px-4 flex items-center gap-2 text-xs font-semibold text-bca-primary hover:bg-white transition-colors duration-200"
            >
              <ChevronLeft size={14} /> Indonesia
            </button>
          )}
        </div>

        <SearchBar onSelect={handleSearchSelect} />

        <button
          onClick={() => setLayersOpen((s) => !s)}
          aria-expanded={layersOpen}
          className={`pointer-events-auto h-12 px-4 rounded-2xl shadow-floating border flex items-center gap-2 text-xs font-semibold transition-colors duration-200 backdrop-blur-md ${
            layersOpen ? "bg-bca-primary border-bca-primary text-white" : "bg-white/95 border-white/60 text-bca-ink hover:bg-white"
          }`}
        >
          <LayersIcon size={15} /> <span className="hidden sm:inline">Layers</span>
        </button>
      </div>

      <LayerPanel open={layersOpen} layers={layers} setLayers={setLayers} />
      <Legend layers={layers} />
      <Sidebar provinceName={selected} onClose={() => setSelected(null)} />

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-[10px] text-bca-sub/70 hidden md:block">
        Duwellduwin Team &middot; Universitas Gadjah Mada &middot; Victoria, Nayla &amp; Fadhila &middot; BCA Business Case Competition
      </div>
    </motion.main>
  );
}
