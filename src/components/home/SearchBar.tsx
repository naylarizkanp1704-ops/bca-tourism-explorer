import { useMemo, useState } from "react";
import { Search, X, Layers as LayersIcon, MapPin } from "lucide-react";
import { useAppData } from "@/context/DataContext";

export interface SearchResult {
  kind: "province" | "destination";
  label: string;
  sub: string;
  province: string;
}

export function SearchBar({ onSelect }: { onSelect: (r: SearchResult) => void }) {
  const { data } = useAppData();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (!q || !data) return [];
    const query = q.toLowerCase();
    const provs: SearchResult[] = data.provinces
      .filter((p) => p.province.toLowerCase().includes(query))
      .slice(0, 4)
      .map((p) => ({ kind: "province", label: p.province, sub: p.island, province: p.province }));
    const dests: SearchResult[] = data.destinations
      .filter((d) => d.name.toLowerCase().includes(query) || d.province.toLowerCase().includes(query))
      .slice(0, 5)
      .map((d) => ({ kind: "destination", label: d.name, sub: d.province, province: d.province }));
    return [...provs, ...dests];
  }, [q, data]);

  return (
    <div className="pointer-events-auto relative w-full max-w-sm">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-floating border border-white/60 h-12 flex items-center px-4 gap-2.5">
        <Search size={15} className="text-bca-sub shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Cari provinsi atau destinasi..."
          aria-label="Search province or destination"
          className="w-full bg-transparent outline-none text-sm text-bca-ink placeholder:text-bca-sub"
        />
        {q && (
          <button onClick={() => setQ("")} className="text-bca-sub shrink-0" aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>
      {focused && results.length > 0 && (
        <div className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-xl border border-bca-border overflow-hidden max-h-80 overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              onMouseDown={() => {
                onSelect(r);
                setQ("");
              }}
              className="w-full text-left px-4 py-3 hover:bg-bca-hover transition-colors duration-150 flex items-center gap-3 border-b border-bca-soft last:border-0"
            >
              {r.kind === "province" ? (
                <LayersIcon size={14} className="text-bca-primary shrink-0" />
              ) : (
                <MapPin size={14} className="text-bca-secondary shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-bca-ink">{r.label}</p>
                <p className="text-[11px] text-bca-sub">{r.sub}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
