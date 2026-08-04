import { GlassCard } from "@/components/ui/GlassCard";
import type { NationalKPI } from "@/types";

const CATEGORY_ORDER = ["International Context", "National Macro", "Digital Behaviour", "Outbound Travel"];

export function NationalKpiGrid({ items }: { items: NationalKPI[] }) {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    rows: items.filter((i) => i.category === cat),
  })).filter((g) => g.rows.length > 0);

  return (
    <div className="space-y-8">
      {grouped.map((g) => (
        <div key={g.category}>
          <p className="text-xs font-semibold text-bca-secondary uppercase tracking-wide mb-3">{g.category}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.rows.map((r) => (
              <GlassCard key={r.indicator} className="p-5">
                <p className="text-lg font-bold text-bca-ink leading-tight">{r.value}</p>
                {r.unit && <p className="text-[10px] text-bca-sub mt-0.5">{r.unit}</p>}
                <p className="text-xs text-bca-ink mt-2 leading-snug">{r.indicator}</p>
                <p className="text-[10px] text-slate-400 mt-2">{r.year}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
