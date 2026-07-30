import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppData } from "@/context/DataContext";
import { fmtCompact, fmtNum } from "@/utils/format";
import type { Province } from "@/types";

export function OverviewTab({ filteredProvinces }: { filteredProvinces: Province[] }) {
  const { data } = useAppData();
  if (!data) return null;

  const top5 = [...filteredProvinces]
    .sort((a, b) => (data.trips[b.province]?.trips2025 || 0) - (data.trips[a.province]?.trips2025 || 0))
    .slice(0, 5);
  const chartData = top5.map((p) => ({
    name: p.province.length > 12 ? p.province.slice(0, 11) + "\u2026" : p.province,
    trips: data.trips[p.province]?.trips2025 || 0,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <GlassCard className="lg:col-span-3 p-6">
        <p className="text-xs font-semibold text-bca-ink mb-4">Top 5 provinces by domestic trip volume (Jan-Jun 2025)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }}>
              <XAxis type="number" tickFormatter={(v) => fmtCompact(v)} tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} width={90} />
              <RTooltip formatter={(v: number) => fmtNum(v)} contentStyle={{ borderRadius: 10, border: "1px solid #E8EEF4", fontSize: 11 }} />
              <Bar dataKey="trips" radius={[0, 8, 8, 0]} fill="#005BAC" maxBarSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
      <GlassCard className="lg:col-span-2 p-6">
        <p className="text-xs font-semibold text-bca-ink mb-4">What this page is (and isn&apos;t)</p>
        <div className="space-y-3 text-[12px] text-slate-700 leading-relaxed">
          <p>This Master Data Center exposes every verified dataset behind the recommendation — nothing here is estimated.</p>
          <p>Tabs with real data: <b>Province</b>, <b>Destination</b>, <b>Payment (national)</b>, <b>References</b>.</p>
          <p>
            Tabs that honestly say &quot;not yet available&quot;: <b>Traveler</b> demographics and <b>BCA Network</b>{" "}
            branch-level coverage — the underlying official sources are identified in the workbook&apos;s Indicator
            Roadmap, just not pulled yet.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
