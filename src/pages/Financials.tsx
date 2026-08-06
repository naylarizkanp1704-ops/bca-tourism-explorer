import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { IncomeStatementTable, CreditPortfolioTable } from "@/components/financials/StatementTables";
import { ProjectionModel } from "@/components/financials/ProjectionModel";
import { useAppData } from "@/context/DataContext";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg font-bold text-bca-ink mb-4">{children}</h2>;
}

export default function Financials() {
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
          eyebrow="Show me the money"
          title="Financials"
          desc="Hasil kinerja resmi BCA FY2024, ditambah model transparan peluang koridor pariwisata QRIS — input resmi dan asumsi tim dipisahkan secara jelas."
        />

        <div className="max-w-[1200px] mx-auto px-4 md:px-0 space-y-12">
          <section>
            <SectionTitle>BCA Official Financial Statements (FY2024)</SectionTitle>
            <p className="text-xs text-bca-sub -mt-2 mb-4">
              Sumber: konferensi pers hasil kinerja akhir tahun BCA, 23 Jan 2025 — disilang-cek ke berbagai media
              finansial independen tanpa ditemukan perbedaan angka.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <IncomeStatementTable rows={data.financials.incomeStatement} />
              <div className="lg:row-span-2">
                <CreditPortfolioTable rows={data.financials.creditPortfolio} />
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>Financial Projection Model — QRIS Tourism-Corridor Opportunity</SectionTitle>
            <ProjectionModel data={data.projectionModel} />
          </section>
        </div>
      </div>
    </motion.main>
  );
}
