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
        <p className="text-xs font-semibold text-bca-ink mb-4">Top 5 provinsi berdasarkan volume trip domestik (Jan-Jun 2025)</p>
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
        <p className="text-xs font-semibold text-bca-ink mb-4">Apa isi halaman ini (dan apa yang bukan)</p>
        <div className="space-y-3 text-[12px] text-slate-700 leading-relaxed">
          <p>Master Data Center ini menampilkan setiap dataset terverifikasi di balik rekomendasi — tidak ada yang diestimasi di sini.</p>
          <p>Tab dengan data real: <b>Province</b>, <b>Destination</b>, <b>Payment (nasional)</b>, <b>References</b>.</p>
          <p>
            <b>BCA Network</b> menampilkan angka ekosistem yang real namun secara jujur mengungkapkan apa yang belum bisa
            dihitung (coverage tingkat cabang) — sumber resminya sudah teridentifikasi di Indicator Roadmap workbook,
            hanya belum ditarik datanya. Breakdown demografi traveler sudah dicari untuk pembangunan produk ini tapi
            tidak ada angka resmi 2024 yang bisa diverifikasi, sehingga tab tersebut dihapus alih-alih dibiarkan
            kosong — lihat halaman Insights untuk apa yang berhasil ditemukan (akomodasi, transportasi udara, investasi).
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
