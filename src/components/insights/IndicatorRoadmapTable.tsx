import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { IndicatorRoadmapRow } from "@/types";

export function IndicatorRoadmapTable({ rows }: { rows: IndicatorRoadmapRow[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Populated" | "Pending">("All");

  const filtered = useMemo(() => {
    return rows
      .filter((r) => {
        if (statusFilter === "Populated") return r.dataStatus.startsWith("Populated");
        if (statusFilter === "Pending") return !r.dataStatus.startsWith("Populated");
        return true;
      })
      .filter((r) => !search || (r.indicator + r.category).toLowerCase().includes(search.toLowerCase()));
  }, [rows, search, statusFilter]);

  const populatedCount = rows.filter((r) => r.dataStatus.startsWith("Populated")).length;

  return (
    <GlassCard className="p-5 overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-xs font-semibold text-bca-ink">
          {populatedCount} of {rows.length} indicators populated with verified data
        </p>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-bca-sub" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search indicator..."
              className="text-xs bg-bca-soft border border-bca-border rounded-lg pl-8 pr-3 py-2 outline-none focus:border-bca-primary"
            />
          </div>
          {(["All", "Populated", "Pending"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-[11px] font-semibold px-3 py-2 rounded-lg border transition-colors duration-200 ${
                statusFilter === s ? "bg-bca-primary border-bca-primary text-white" : "border-bca-border text-bca-sub"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <table className="w-full text-xs min-w-[720px]">
        <thead>
          <tr className="border-b border-bca-border">
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Category</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Indicator</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Official Source</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Level</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.slice(0, 101).map((r, i) => {
            const populated = r.dataStatus.startsWith("Populated");
            return (
              <tr key={r.indicator + i} className="border-b border-bca-soft hover:bg-bca-soft transition-colors duration-150">
                <td className="px-3 py-2.5 text-slate-500">{r.category}</td>
                <td className="px-3 py-2.5 font-medium text-bca-ink">{r.indicator}</td>
                <td className="px-3 py-2.5 text-slate-700">{r.officialSource}</td>
                <td className="px-3 py-2.5 text-slate-700">{r.geographicLevel}</td>
                <td className="px-3 py-2.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded-full text-white ${populated ? "bg-bca-accent" : "bg-slate-400"}`}
                  >
                    {populated ? "Populated" : "Pending"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-[10px] text-bca-sub mt-3">
        This is a planning catalog, not a data table — it tells you which official source to pull next for indicators
        not yet populated, so nothing here is guessed or estimated.
      </p>
    </GlassCard>
  );
}
