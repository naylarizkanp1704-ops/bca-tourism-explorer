import { TrendingUp, Wallet, MapPin, Sparkles, BadgeCheck, CreditCard } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppData } from "@/context/DataContext";
import { fmtCompact } from "@/utils/format";
import type { Province, Destination } from "@/types";

export function KpiCards({ filteredProvinces, filteredDestinations }: { filteredProvinces: Province[]; filteredDestinations: Destination[] }) {
  const { data } = useAppData();
  if (!data) return null;

  const totalTrips = filteredProvinces.reduce((s, p) => s + (data.trips[p.province]?.trips2025 || 0), 0);
  const avgGrowth = filteredProvinces.length
    ? (filteredProvinces.reduce((s, p) => s + (data.trips[p.province]?.growth || 0), 0) / filteredProvinces.length).toFixed(1)
    : "-";

  const cards = [
    { label: "Total Domestic Trips (filtered)", value: fmtCompact(totalTrips), sub: "Jan-Jun 2025 cumulative", icon: TrendingUp },
    { label: "Avg. National Spending/Trip", value: "Rp2.32 Jt", sub: "Full-year 2024, BPS (national only)", icon: Wallet },
    { label: "Avg. Length of Stay", value: "3.74 nights", sub: "Full-year 2024, BPS (national only)", icon: MapPin },
    { label: "Destinations (filtered)", value: String(filteredDestinations.length), sub: "of 106 total", icon: Sparkles },
    { label: "Avg. Growth (filtered)", value: `+${avgGrowth}%`, sub: "vs national +17.70%", icon: BadgeCheck },
    { label: "QRIS Users (national)", value: "57 Jt", sub: "Sem I 2025, BI — no province split published", icon: CreditCard },
  ];

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 px-4 md:px-0">
      {cards.map((c) => (
        <GlassCard key={c.label} className="p-4">
          <c.icon size={16} className="text-bca-primary" />
          <p className="text-lg font-bold text-bca-ink mt-2 leading-tight">{c.value}</p>
          <p className="text-[10px] text-bca-sub mt-1 leading-snug">{c.label}</p>
          <p className="text-[9px] text-slate-400 mt-0.5">{c.sub}</p>
        </GlassCard>
      ))}
    </div>
  );
}
