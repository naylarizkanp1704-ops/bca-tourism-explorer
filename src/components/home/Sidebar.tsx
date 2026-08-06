import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, MapPin, Star } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip as RTooltip } from "recharts";
import { useAppData } from "@/context/DataContext";
import { fmtCompact, fmtNum } from "@/utils/format";
import { buildInsight } from "@/utils/insight";

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-bca-soft rounded-xl px-3 py-2.5">
      <p className="text-[10px] text-bca-sub uppercase tracking-wide font-medium">{label}</p>
      <p className={`text-sm font-bold mt-0.5 ${accent ? "text-bca-accent" : "text-bca-ink"}`}>{value}</p>
    </div>
  );
}

export function Sidebar({ provinceName, onClose }: { provinceName: string | null; onClose: () => void }) {
  const { data } = useAppData();

  const province = data?.provinces.find((p) => p.province === provinceName) || null;
  const trip = province ? data?.trips[province.province] : undefined;
  const nationalGrowth = data?.trips["INDONESIA (total)"]?.growth ?? 17.7;
  const insight = province ? buildInsight(province, trip, nationalGrowth) : [];
  const dests = province && data ? data.destinations.filter((d) => d.province === province.province) : [];

  const chartData = trip ? [
    { p: "Jan-Jun '24", v: trip.trips2024 },
    { p: "Jan-Jun '25", v: trip.trips2025 },
  ] : [];

  return (
    <AnimatePresence>
      {province && (
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-24 right-5 bottom-5 z-20 w-full max-w-[380px] bg-white/97 backdrop-blur-xl rounded-[24px] shadow-2xl border border-white/60 overflow-y-auto"
        >
          <div className="sticky top-0 bg-white/97 backdrop-blur-xl px-6 pt-6 pb-4 border-b border-bca-soft flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold text-bca-secondary uppercase tracking-wide">Province</p>
              <h2 className="text-xl font-bold text-bca-ink mt-0.5">{province.province}</h2>
              <p className="text-xs text-bca-sub mt-0.5">{province.island} &middot; Capital: {province.capital}</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close province panel"
              className="w-8 h-8 rounded-full bg-bca-soft flex items-center justify-center hover:bg-bca-border transition-colors duration-150 shrink-0"
            >
              <X size={14} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-6">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Population" value={fmtCompact(province.population)} />
              <Stat label="Trip '25" value={fmtCompact(trip?.trips2025)} />
              <Stat label="Growth" value={trip ? `+${trip.growth}%` : "-"} accent />
            </div>

            {chartData.length > 0 && (
              <div className="h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="p" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <RTooltip formatter={(v: number) => fmtNum(v)} contentStyle={{ borderRadius: 10, border: "1px solid #E8EEF4", fontSize: 11 }} />
                    <Bar dataKey="v" radius={[6, 6, 0, 0]} fill="#005BAC" maxBarSize={48} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles size={13} className="text-bca-accent" />
                <p className="text-[11px] font-semibold text-bca-ink uppercase tracking-wide">Insight</p>
              </div>
              <div className="space-y-3">
                {insight.map((n, i) => (
                  <p key={i} className="text-[13px] text-slate-700 leading-relaxed bg-bca-soft rounded-xl p-3.5">
                    {n}
                  </p>
                ))}
              </div>
            </div>

            {dests.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <MapPin size={13} className="text-bca-secondary" />
                  <p className="text-[11px] font-semibold text-bca-ink uppercase tracking-wide">Destinations ({dests.length})</p>
                </div>
                <div className="space-y-1.5">
                  {dests.slice(0, 8).map((d) => (
                    <div key={d.name} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-bca-soft transition-colors duration-150">
                      <div>
                        <p className="text-[13px] font-medium text-bca-ink">{d.name}</p>
                        <p className="text-[11px] text-bca-sub">{d.categories.slice(0, 2).join(" \u00b7 ")}</p>
                      </div>
                      {d.kspn && <Star size={12} className="text-bca-warning" fill="#F59E0B" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-xl p-4 bg-gradient-to-br from-bca-primary/10 to-bca-secondary/10">
              <p className="text-[11px] font-semibold text-bca-primary uppercase tracking-wide mb-1.5">So What for BCA?</p>
              <p className="text-[13px] text-bca-ink leading-relaxed">
                {String(province.kspn || "").startsWith("Y")
                  ? "Prioritaskan ekspansi QRIS merchant & travel-card bundling di destinasi KSPN provinsi ini sebelum kompetitor masuk."
                  : "Perkuat retensi lewat program loyalitas kartu debit/kredit BCA yang sudah eksis di provinsi ini."}
              </p>
            </div>

            <p className="text-[10px] text-bca-sub leading-relaxed pb-2">
              Sumber: BPS (Statistik Wisatawan Nusantara 2024), Kementerian Pariwisata RI (data diolah dari BPS, Jan-Jun 2024/2025), Kemendagri Dukcapil (populasi Des 2024).
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
