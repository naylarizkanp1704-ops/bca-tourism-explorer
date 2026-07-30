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
        title="Branch / ATM / CRM location data & Coverage Ratio not available"
        explanation="BCA's Annual Report discloses national totals for branches and ATMs, but not a province-by-province breakdown with coordinates. Without that, a real 'Population / Branches' or 'Trips / Branches' coverage ratio per province cannot be computed — building one would mean inventing branch counts, which this project's evidence standard does not allow."
        whatIsAvailable="What's shown above is real: myBCA users, transaction volume, and daily transaction counts, all from BCA's 2024 Annual Report / official press releases. The Province table's 'Opportunity' tag uses only trip growth + KSPN status (both verified), not branch footprint."
      />
    </div>
  );
}
