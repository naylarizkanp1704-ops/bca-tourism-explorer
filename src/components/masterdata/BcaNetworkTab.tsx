import { Building2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { UnavailableState } from "@/components/masterdata/UnavailableState";
import { useAppData } from "@/context/DataContext";

export function BcaNetworkTab() {
  const { data } = useAppData();
  if (!data) return null;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.bca.slice(0, 4).map((b) => (
          <GlassCard key={b.indicator} className="p-4">
            <Building2 size={15} className="text-bca-primary" />
            <p className="text-sm font-bold text-bca-ink mt-2">{b.value}</p>
            <p className="text-[10px] text-bca-sub mt-1">{b.indicator}</p>
          </GlassCard>
        ))}
      </div>
      <UnavailableState
        title="Branch / ATM / CRM Location Data & Coverage Ratio Not Available"
        explanation="Annual Report BCA mengungkapkan total nasional untuk cabang dan ATM, tapi bukan breakdown per provinsi dengan koordinat. Tanpa itu, coverage ratio 'Populasi / Cabang' atau 'Trip / Cabang' per provinsi yang real tidak bisa dihitung — membuatnya berarti mengarang jumlah cabang, yang tidak diperbolehkan standar bukti proyek ini."
        whatIsAvailable="Yang ditampilkan di atas itu real: pengguna myBCA, volume transaksi, dan jumlah transaksi harian, semuanya dari Annual Report 2024 BCA / siaran pers resmi. Tag 'Opportunity' di tabel Province hanya memakai pertumbuhan trip + status KSPN (keduanya terverifikasi), bukan jejak cabang."
      />
    </div>
  );
}
