import { BedDouble, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RTooltip } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";
import type { AccommodationData } from "@/types";

export function AccommodationSection({ data }: { data: AccommodationData }) {
  const hotelChart = [...data.top10Hotels].sort((a, b) => (b.starHotels ?? 0) - (a.starHotels ?? 0));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.national.map((n) => (
          <GlassCard key={n.indicator} className="p-4">
            <BedDouble size={15} className="text-bca-primary" />
            <p className="text-sm font-bold text-bca-ink mt-2 leading-tight">{n.value}</p>
            <p className="text-[10px] text-bca-sub mt-1.5 leading-snug">{n.indicator}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <p className="text-xs font-semibold text-bca-ink mb-1">Top 10 Provinsi — Jumlah Hotel Berbintang</p>
          <p className="text-[10px] text-bca-sub mb-4">
            BPS 2024, dikompilasi via IndonesiaBaik.id/Komdigi &amp; Kompas TV — hanya top 10, 28 provinsi lain tidak
            ditampilkan (bukan kosong/nol).
          </p>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hotelChart} layout="vertical" margin={{ top: 0, right: 24, left: 8, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="province" tick={{ fontSize: 11, fill: "#334155" }} axisLine={false} tickLine={false} width={110} />
                <RTooltip contentStyle={{ borderRadius: 10, border: "1px solid #E8EEF4", fontSize: 11 }} />
                <Bar dataKey="starHotels" name="Hotel Berbintang" radius={[0, 8, 8, 0]} fill="#005BAC" maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <p className="text-xs font-semibold text-bca-ink mb-1">Top 10 Provinsi — Rata-rata Lama Menginap</p>
          <p className="text-[10px] text-bca-sub mb-4">Hotel berbintang, seluruh tamu, BPS 2024 (via Databoks/Katadata)</p>
          <div className="space-y-2.5">
            {data.top10LengthOfStay.map((s, i) => (
              <div key={s.province} className="flex items-center justify-between py-2 px-3 rounded-xl bg-bca-soft">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-bold text-bca-sub w-4">{i + 1}</span>
                  <span className="text-sm font-medium text-bca-ink">{s.province}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-bca-primary">{s.nights} malam</span>
                  {s.yoyChange && <p className="text-[10px] text-bca-accent">{s.yoyChange} YoY</p>}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {data.roomRateCommercial && (
        <GlassCard className="p-5 border-amber-300 bg-amber-50/60">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800">Sumber Non-Resmi / Komersial</p>
              <p className="text-sm font-bold text-bca-ink mt-1">{data.roomRateCommercial.value}</p>
              <p className="text-xs text-bca-ink mt-1">{data.roomRateCommercial.indicator}</p>
              <p className="text-[11px] text-amber-700 mt-2">
                Sumber: {data.roomRateCommercial.source} — <b>bukan data pemerintah</b>. BPS tidak mempublikasikan
                rata-rata tarif kamar hotel; angka ini dari laporan analitik booking engine swasta, ditampilkan hanya
                untuk konteks bisnis.
              </p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}

export function SimpleIndicatorList({ items }: { items: { indicator: string; value: string; period: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((it) => (
        <GlassCard key={it.indicator} className="p-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-bca-ink">{it.value}</p>
            <p className="text-[11px] text-bca-sub mt-1">{it.indicator}</p>
          </div>
          <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">{it.period}</span>
        </GlassCard>
      ))}
    </div>
  );
}
