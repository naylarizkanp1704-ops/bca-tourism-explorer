import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { NationalKpiGrid } from "@/components/insights/NationalKpiGrid";
import { DestinationGrowthChart } from "@/components/insights/DestinationGrowthChart";
import { OutboundTravelPanel } from "@/components/insights/OutboundTravelPanel";
import { IndicatorRoadmapTable } from "@/components/insights/IndicatorRoadmapTable";
import { AccommodationSection, SimpleIndicatorList } from "@/components/insights/AccommodationSection";
import { useAppData } from "@/context/DataContext";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-bca-ink mb-4">{children}</h2>;
}

export default function Insights() {
  const { data } = useAppData();
  if (!data) return null;

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 top-[76px] overflow-y-auto"
    >
      <div className="min-h-full pb-20">
        <PageHeader
          eyebrow="Di luar peta"
          title="Global Insights"
          desc="Konteks level nasional, pola perjalanan outbound, dan roadmap bukti lengkap di balik produk ini — data yang tidak terpetakan ke satu provinsi tertentu."
        />

        <div className="max-w-[1200px] mx-auto px-4 md:px-0 space-y-12">
          <section>
            <SectionTitle>Konteks Nasional &amp; Internasional</SectionTitle>
            <NationalKpiGrid items={data.nationalKPI} />
          </section>

          <section>
            <SectionTitle>Proyeksi Pertumbuhan Destinasi 2026</SectionTitle>
            <DestinationGrowthChart rows={data.destinationGrowth2026} />
          </section>

          <section>
            <SectionTitle>Perjalanan Outbound</SectionTitle>
            <OutboundTravelPanel mix={data.outboundMix} crossBorder={data.qrisCrossBorder} />
          </section>

          <section>
            <SectionTitle>Akomodasi &amp; Perhotelan</SectionTitle>
            <AccommodationSection data={data.accommodation} />
          </section>

          <section>
            <SectionTitle>Transportasi Udara</SectionTitle>
            <SimpleIndicatorList items={data.airTransport} />
          </section>

          <section>
            <SectionTitle>Investasi &amp; Sektor Potensial</SectionTitle>
            <SimpleIndicatorList items={data.investment} />
          </section>

          <section>
            <SectionTitle>Roadmap Indikator</SectionTitle>
            <IndicatorRoadmapTable rows={data.indicatorRoadmap} />
          </section>
        </div>
      </div>
    </motion.main>
  );
}
