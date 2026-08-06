import { CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { ProjectionModelData } from "@/types";

export function ProjectionModel({ data }: { data: ProjectionModelData }) {
  return (
    <div className="space-y-6">
      <GlassCard className="p-5 border-blue-200 bg-blue-50/40">
        <p className="text-xs font-semibold text-bca-primary">
          Ini adalah model, bukan data resmi — setiap baris di bawah diberi label agar kamu tahu mana yang input real
          dan mana yang merupakan judgment call tim ini.
        </p>
      </GlassCard>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={16} className="text-bca-accent" />
          <p className="text-xs font-semibold text-bca-ink uppercase tracking-wide">Langkah 1 — Input Resmi</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.officialInputs.map((it) => (
            <GlassCard key={it.input} className="p-4 border-l-4 border-l-bca-accent">
              <p className="text-lg font-bold text-bca-ink">{it.value}</p>
              <p className="text-xs text-bca-ink mt-1">{it.input}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-bca-sub">{it.source}</p>
                {it.url && (
                  <a href={it.url} target="_blank" rel="noreferrer" className="text-bca-primary">
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle size={16} className="text-amber-600" />
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
            Langkah 2 — Asumsi Tim (BUKAN data resmi)
          </p>
        </div>
        <div className="space-y-3">
          {data.assumptions.map((a) => (
            <GlassCard key={a.assumption} className="p-4 bg-amber-50/60 border-amber-200">
              <p className="text-sm font-semibold text-bca-ink">{a.assumption}</p>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div className="text-center bg-white rounded-lg py-2">
                  <p className="text-[10px] text-bca-sub">Rendah</p>
                  <p className="text-sm font-bold text-bca-ink">{a.low}</p>
                </div>
                <div className="text-center bg-white rounded-lg py-2 ring-1 ring-bca-primary/30">
                  <p className="text-[10px] text-bca-sub">Dasar</p>
                  <p className="text-sm font-bold text-bca-primary">{a.base}</p>
                </div>
                <div className="text-center bg-white rounded-lg py-2">
                  <p className="text-[10px] text-bca-sub">Tinggi</p>
                  <p className="text-sm font-bold text-bca-ink">{a.high}</p>
                </div>
              </div>
              <p className="text-[11px] text-amber-800 mt-3 leading-relaxed">{a.rationale}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-bca-ink uppercase tracking-wide mb-3">
          Langkah 3 — Rentang Hasil (dihitung, bukan resmi)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.scenarios.map((s) => (
            <GlassCard
              key={s.scenario}
              className={`p-5 ${s.scenario === "Base" ? "ring-2 ring-bca-primary" : ""}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-bca-secondary">Skenario {s.scenario}</p>
              <p className="text-sm font-bold text-bca-ink mt-2 leading-snug">{s.revenueRange}</p>
              <div className="mt-3 space-y-1 text-[11px] text-bca-sub">
                <p>Porsi akuisisi: <b className="text-bca-ink">{s.share}</b></p>
                <p>Pertumbuhan QRIS inkremental: <b className="text-bca-ink">{s.growth}</b></p>
              </div>
              <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">{s.basis}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
