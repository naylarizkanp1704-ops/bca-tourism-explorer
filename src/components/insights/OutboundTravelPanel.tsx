import { Globe2, CreditCard } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { OutboundMixRow, QrisCrossBorder } from "@/types";

export function OutboundTravelPanel({ mix, crossBorder }: { mix: OutboundMixRow[]; crossBorder: QrisCrossBorder | null }) {
  const maxShare = Math.max(...mix.map((m) => m.sharePct), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <GlassCard className="lg:col-span-3 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe2 size={16} className="text-bca-primary" />
          <p className="text-xs font-semibold text-bca-ink">Sebaran destinasi outbound WNI</p>
        </div>
        <div className="space-y-4">
          {mix.map((m) => (
            <div key={m.destination}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-bca-ink">{m.destination}</span>
                <span className="font-semibold text-bca-primary">{m.sharePct}%</span>
              </div>
              <div className="h-2.5 bg-bca-soft rounded-full overflow-hidden">
                <div
                  className="h-full bg-bca-primary rounded-full transition-all duration-500"
                  style={{ width: `${(m.sharePct / maxShare) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-bca-sub mt-4">{mix[0]?.source}</p>
      </GlassCard>

      <GlassCard className="lg:col-span-2 p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard size={16} className="text-bca-accent" />
          <p className="text-xs font-semibold text-bca-ink">QRIS Cross-Border</p>
        </div>
        {crossBorder ? (
          <>
            <p className="text-sm text-bca-ink leading-relaxed">{crossBorder.countries}</p>
            <p className="text-[10px] text-bca-sub mt-4">{crossBorder.source}</p>
          </>
        ) : (
          <p className="text-xs text-bca-sub">Data QRIS cross-border belum tersedia di workbook.</p>
        )}
      </GlassCard>
    </div>
  );
}
