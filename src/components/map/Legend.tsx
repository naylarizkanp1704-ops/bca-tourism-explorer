import type { MapLayers } from "@/types";

export function Legend({ layers }: { layers: MapLayers }) {
  return (
    <div className="absolute bottom-5 left-5 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-floating border border-white/60 px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-[11px] text-bca-ink/80">
        <span className="w-3 h-3 rounded-full inline-block bg-bca-primary" /> Selected province
      </div>
      {layers.destinations && (
        <div className="flex items-center gap-2 text-[11px] text-bca-ink/80">
          <span className="w-2.5 h-2.5 rounded-full inline-block bg-bca-secondary" /> Destination
        </div>
      )}
      {layers.intensity && (
        <div className="flex items-center gap-2 text-[11px] text-bca-ink/80">
          <span className="w-3 h-3 rounded inline-block" style={{ background: "rgba(0,91,172,0.5)" }} /> Traveler intensity
        </div>
      )}
    </div>
  );
}
