import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import type { DestinationGrowthRow } from "@/types";

export function DestinationGrowthChart({ rows }: { rows: DestinationGrowthRow[] }) {
  const data = [...rows].sort((a, b) => b.sharePct - a.sharePct);
  const source = rows[0]?.source || "Expert Survey (2025)";

  return (
    <GlassCard className="p-6">
      <p className="text-xs font-semibold text-bca-ink mb-1">Destinations Projected to Grow Significantly in 2026</p>
      <p className="text-[10px] text-bca-sub mb-4">{source}</p>
      <div style={{ height: Math.max(260, data.length * 32) }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 32, left: 8, bottom: 0 }}>
            <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="destination" tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} width={140} />
            <RTooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 10, border: "1px solid #E8EEF4", fontSize: 11 }} />
            <Bar dataKey="sharePct" radius={[0, 8, 8, 0]} fill="#005BAC" maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
