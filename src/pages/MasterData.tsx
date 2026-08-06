import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterBar } from "@/components/masterdata/FilterBar";
import { KpiCards } from "@/components/masterdata/KpiCards";
import { Tabs, type MDTab } from "@/components/masterdata/Tabs";
import { OverviewTab } from "@/components/masterdata/OverviewTab";
import { ProvinceTab } from "@/components/masterdata/ProvinceTab";
import { DestinationTab } from "@/components/masterdata/DestinationTab";
import { PaymentTab } from "@/components/masterdata/PaymentTab";
import { BcaNetworkTab } from "@/components/masterdata/BcaNetworkTab";
import { CompareTab } from "@/components/masterdata/CompareTab";
import { ReferencesTab } from "@/components/masterdata/ReferencesTab";
import { useAppData } from "@/context/DataContext";

export interface MDFilters {
  province: string;
  category: string;
  year: "2024" | "2025";
  search: string;
}

const DEFAULT_FILTERS: MDFilters = { province: "All", category: "All", year: "2025", search: "" };

export default function MasterData() {
  const { data } = useAppData();
  const [filters, setFilters] = useState<MDFilters>(DEFAULT_FILTERS);
  const [active, setActive] = useState<MDTab>("Overview");
  const [selectedName, setSelectedName] = useState<string | null>(null);

  if (!data) return null;

  const filteredProvinces = data.provinces.filter((p) => filters.province === "All" || p.province === filters.province);
  const filteredDestinations = data.destinations
    .filter((d) => filters.province === "All" || d.province === filters.province)
    .filter((d) => filters.category === "All" || d.categories.includes(filters.category));

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 top-[76px] overflow-y-auto"
    >
      <div className="min-h-full pb-16">
        <PageHeader
          eyebrow="Pusat Bukti"
          title="Master Data Center"
          desc="Jelajahi setiap dataset pendukung yang digunakan dalam rekomendasi — bersumber jelas, dapat difilter, dan dapat diekspor."
        />
        <FilterBar filters={filters} setFilters={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
        <KpiCards filteredProvinces={filteredProvinces} filteredDestinations={filteredDestinations} />
        <Tabs active={active} setActive={setActive} />
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-[1200px] mx-auto mt-4 px-4 md:px-0"
        >
          {active === "Overview" && <OverviewTab filteredProvinces={filteredProvinces} />}
          {active === "Province" && <ProvinceTab filters={filters} selectedName={selectedName} setSelectedName={setSelectedName} />}
          {active === "Destination" && <DestinationTab filters={filters} />}
          {active === "Payment" && <PaymentTab />}
          {active === "BCA Network" && <BcaNetworkTab />}
          {active === "Compare" && <CompareTab />}
          {active === "References" && <ReferencesTab />}
        </motion.div>
      </div>
    </motion.main>
  );
}
