import { useState } from "react";
import { BadgeCheck, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppData } from "@/context/DataContext";
import { downloadCSV } from "@/utils/csv";
import type { MDFilters } from "@/pages/MasterData";

export function DestinationTab({ filters }: { filters: MDFilters }) {
  const { data } = useAppData();
  const [search, setSearch] = useState("");
  if (!data) return null;

  const rows = data.destinations
    .filter((d) => filters.province === "All" || d.province === filters.province)
    .filter((d) => filters.category === "All" || d.categories.includes(filters.category))
    .filter((d) => !search || (d.name + d.province).toLowerCase().includes(search.toLowerCase()))
    .slice(0, 60);

  return (
    <GlassCard className="p-5 overflow-x-auto">
      <div className="flex items-center justify-between mb-3 gap-3">
        <p className="text-xs font-semibold text-bca-ink">{rows.length} destinations shown</p>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search within results..."
          className="text-xs bg-bca-soft border border-bca-border rounded-lg px-3 py-1.5 outline-none focus:border-bca-primary"
        />
        <button
          onClick={() =>
            downloadCSV(
              "destination_master.csv",
              ["name", "province", "categories", "unesco", "kspn"],
              rows.map((r) => ({ ...r, categories: r.categories.join(" | "), unesco: r.unesco ? "Yes" : "No", kspn: r.kspn ? "Yes" : "No" }))
            )
          }
          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-bca-border text-bca-sub hover:text-bca-primary hover:border-bca-primary transition-colors duration-200 shrink-0"
        >
          Export CSV
        </button>
      </div>
      <table className="w-full text-xs min-w-[600px]">
        <thead>
          <tr className="border-b border-bca-border">
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Destination</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Province</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Category</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">UNESCO</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">KSPN</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((d) => (
            <tr key={d.name} className="border-b border-bca-soft hover:bg-bca-soft transition-colors duration-150">
              <td className="px-3 py-2.5 font-medium text-bca-ink">{d.name}</td>
              <td className="px-3 py-2.5 text-slate-700">{d.province}</td>
              <td className="px-3 py-2.5 text-slate-700">{d.categories.join(", ")}</td>
              <td className="px-3 py-2.5">{d.unesco ? <BadgeCheck size={14} className="text-bca-primary" /> : "\u2014"}</td>
              <td className="px-3 py-2.5">{d.kspn ? <Star size={13} className="text-bca-warning" fill="#F59E0B" /> : "\u2014"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-bca-sub mt-3">
        Estimated Visitors, Average Spending, Nearby Airport and Nearby BCA Branch columns are intentionally omitted — no
        official publication reports these at individual-destination level for the full 106-destination set (see
        01_Indicator_Roadmap in the workbook). Showing them would mean guessing.
      </p>
    </GlassCard>
  );
}
