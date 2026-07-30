import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MiniMap } from "@/components/map/MiniMap";
import { useAppData } from "@/context/DataContext";
import { fmtCompact, fmtNum } from "@/utils/format";
import { downloadCSV } from "@/utils/csv";
import { opportunityFlag } from "@/utils/insight";
import type { MDFilters } from "@/pages/MasterData";

interface Row {
  province: string;
  population: number | null;
  trips: number;
  growth: number;
  kspn: string;
  hub: string;
  topDest: string;
  opportunity: string;
}

function SortHeader({
  label, sortKey, active, dir, onClick,
}: { label: string; sortKey: keyof Row; active: boolean; dir: "asc" | "desc"; onClick: (k: keyof Row) => void }) {
  return (
    <th
      onClick={() => onClick(sortKey)}
      className="text-left text-[10px] font-semibold text-bca-sub uppercase tracking-wide px-3 py-3 cursor-pointer select-none hover:text-bca-primary whitespace-nowrap"
    >
      {label} {active ? (dir === "asc" ? "\u2191" : "\u2193") : ""}
    </th>
  );
}

export function ProvinceTab({
  filters, selectedName, setSelectedName,
}: { filters: MDFilters; selectedName: string | null; setSelectedName: (n: string | null) => void }) {
  const { data } = useAppData();
  const [sortKey, setSortKey] = useState<keyof Row>("trips");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [pageNum, setPageNum] = useState(1);
  const perPage = 10;

  const rows = useMemo<Row[]>(() => {
    if (!data) return [];
    let list: Row[] = data.provinces
      .filter((p) => filters.province === "All" || p.province === filters.province)
      .filter((p) => !filters.search || p.province.toLowerCase().includes(filters.search.toLowerCase()))
      .map((p) => {
        const t = data.trips[p.province] || { trips2024: 0, trips2025: 0, growth: 0 };
        const topDest = data.destinations.find((d) => d.province === p.province);
        return {
          province: p.province,
          population: p.population,
          trips: filters.year === "2024" ? t.trips2024 : t.trips2025,
          growth: t.growth,
          kspn: String(p.kspn || "").startsWith("Y") ? "Yes" : "No",
          hub: p.hub,
          topDest: topDest ? topDest.name : "\u2014",
          opportunity: opportunityFlag(p, data).label,
        };
      });
    list = list.sort((a, b) => {
      const v1 = a[sortKey], v2 = b[sortKey];
      const cmp = typeof v1 === "number" && typeof v2 === "number" ? v1 - v2 : String(v1).localeCompare(String(v2));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [data, filters, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const pageRows = rows.slice((pageNum - 1) * perPage, pageNum * perPage);

  const toggleSort = (key: keyof Row) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <GlassCard className="lg:col-span-2 p-5">
        <p className="text-xs font-semibold text-bca-ink mb-3">Click a province to sync with the table &rarr;</p>
        <MiniMap selectedName={selectedName} onSelect={setSelectedName} />
        {selectedName && (
          <div className="mt-4 p-3 bg-bca-soft rounded-xl">
            <p className="text-sm font-semibold text-bca-ink">{selectedName}</p>
            <p className="text-xs text-bca-sub mt-1">
              Trip Jan-Jun 2025: {fmtNum(data.trips[selectedName]?.trips2025)} &middot; Growth +{data.trips[selectedName]?.growth}%
            </p>
          </div>
        )}
      </GlassCard>

      <GlassCard className="lg:col-span-3 p-5 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-bca-ink">{rows.length} provinces</p>
          <button
            onClick={() =>
              downloadCSV(
                "province_master.csv",
                ["province", "population", "trips", "growth", "kspn", "hub", "topDest", "opportunity"],
                rows
              )
            }
            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-bca-border text-bca-sub hover:text-bca-primary hover:border-bca-primary transition-colors duration-200"
          >
            Export CSV
          </button>
        </div>
        <table className="w-full text-xs min-w-[720px]">
          <thead className="sticky top-0 bg-white/95">
            <tr className="border-b border-bca-border">
              <SortHeader label="Province" sortKey="province" active={sortKey === "province"} dir={sortDir} onClick={toggleSort} />
              <SortHeader label="Population" sortKey="population" active={sortKey === "population"} dir={sortDir} onClick={toggleSort} />
              <SortHeader label="Trips" sortKey="trips" active={sortKey === "trips"} dir={sortDir} onClick={toggleSort} />
              <SortHeader label="Growth" sortKey="growth" active={sortKey === "growth"} dir={sortDir} onClick={toggleSort} />
              <SortHeader label="KSPN" sortKey="kspn" active={sortKey === "kspn"} dir={sortDir} onClick={toggleSort} />
              <SortHeader label="Top Destination" sortKey="topDest" active={sortKey === "topDest"} dir={sortDir} onClick={toggleSort} />
              <SortHeader label="Opportunity" sortKey="opportunity" active={sortKey === "opportunity"} dir={sortDir} onClick={toggleSort} />
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => (
              <tr
                key={r.province}
                onClick={() => setSelectedName(r.province)}
                className={`border-b border-bca-soft cursor-pointer transition-colors duration-150 ${
                  selectedName === r.province ? "bg-bca-hover" : "hover:bg-bca-soft"
                }`}
              >
                <td className="px-3 py-2.5 font-medium text-bca-ink">{r.province}</td>
                <td className="px-3 py-2.5 text-slate-700">{fmtCompact(r.population)}</td>
                <td className="px-3 py-2.5 text-slate-700">{fmtCompact(r.trips)}</td>
                <td className="px-3 py-2.5" style={{ color: r.growth > 0 ? "#22C55E" : "#EF4444" }}>+{r.growth}%</td>
                <td className="px-3 py-2.5 text-slate-700">{r.kspn}</td>
                <td className="px-3 py-2.5 text-slate-700">{r.topDest}</td>
                <td className="px-3 py-2.5">
                  <span
                    className="text-[10px] font-semibold px-2 py-1 rounded-full text-white"
                    style={{ background: opportunityFlag(data.provinces.find((p) => p.province === r.province)!, data).color }}
                  >
                    {r.opportunity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-bca-soft">
          <p className="text-[11px] text-bca-sub">Page {pageNum} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={pageNum <= 1} onClick={() => setPageNum((n) => n - 1)} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-bca-border disabled:opacity-30 text-bca-sub">Prev</button>
            <button disabled={pageNum >= totalPages} onClick={() => setPageNum((n) => n + 1)} className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-bca-border disabled:opacity-30 text-bca-sub">Next</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
