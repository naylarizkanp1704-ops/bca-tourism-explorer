import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppData } from "@/context/DataContext";
import { fmtCompact } from "@/utils/format";
import { opportunityFlag } from "@/utils/insight";

export function CompareTab() {
  const { data } = useAppData();
  const [a, setA] = useState("DKI Jakarta");
  const [b, setB] = useState("Bali");

  if (!data) return null;

  const provA = data.provinces.find((p) => p.province === a);
  const provB = data.provinces.find((p) => p.province === b);
  const tA = data.trips[a];
  const tB = data.trips[b];
  const destA = data.destinations.filter((d) => d.province === a).length;
  const destB = data.destinations.filter((d) => d.province === b).length;

  const rows: [string, string, string][] = [
    ["Population", fmtCompact(provA?.population), fmtCompact(provB?.population)],
    ["Trips Jan-Jun 2025", fmtCompact(tA?.trips2025), fmtCompact(tB?.trips2025)],
    ["Growth vs 2024", `+${tA?.growth ?? "-"}%`, `+${tB?.growth ?? "-"}%`],
    ["KSPN Priority", String(provA?.kspn || "").startsWith("Y") ? "Yes" : "No", String(provB?.kspn || "").startsWith("Y") ? "Yes" : "No"],
    ["Destinations tracked", String(destA), String(destB)],
    ["Main tourism hub", provA?.hub || "-", provB?.hub || "-"],
    ["Opportunity tag", provA ? opportunityFlag(provA, data).label : "-", provB ? opportunityFlag(provB, data).label : "-"],
  ];

  return (
    <GlassCard className="p-6">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select value={a} onChange={(e) => setA(e.target.value)} className="text-xs font-medium bg-bca-soft border border-bca-border rounded-xl px-3 py-2.5">
          {data.provinces.map((p) => <option key={p.province} value={p.province}>{p.province}</option>)}
        </select>
        <span className="text-xs text-bca-sub font-semibold">VS</span>
        <select value={b} onChange={(e) => setB(e.target.value)} className="text-xs font-medium bg-bca-soft border border-bca-border rounded-xl px-3 py-2.5">
          {data.provinces.map((p) => <option key={p.province} value={p.province}>{p.province}</option>)}
        </select>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-bca-border">
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-2.5">Metric</th>
            <th className="text-left text-[10px] font-semibold uppercase px-3 py-2.5 text-bca-primary">{a}</th>
            <th className="text-left text-[10px] font-semibold uppercase px-3 py-2.5 text-bca-secondary">{b}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, va, vb]) => (
            <tr key={label} className="border-b border-bca-soft">
              <td className="px-3 py-3 text-bca-sub font-medium">{label}</td>
              <td className="px-3 py-3 text-bca-ink font-semibold">{va}</td>
              <td className="px-3 py-3 text-bca-ink font-semibold">{vb}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-bca-sub mt-4">
        Traveler profile and payment-behaviour comparison are omitted — those breakdowns are not published by province
        (see Payment / Traveler tabs).
      </p>
    </GlassCard>
  );
}
