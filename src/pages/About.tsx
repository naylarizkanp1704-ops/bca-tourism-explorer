import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const SECTIONS = [
  {
    title: "Problem Statement",
    body: "Indonesia's domestic tourism sector generates enormous trip volume and spending, and digital payment adoption is accelerating nationwide — yet the connection between where travel demand is growing and where BCA's payment ecosystem should expand next has not been made explicit or evidence-based.",
  },
  {
    title: "Objective",
    body: "Build a credible, explorable evidence base — not a slide deck of assumptions — that lets BCA prioritize province- and destination-level opportunities for QRIS merchant expansion, card products, and travel-adjacent financial services, using only verifiable official data.",
  },
  {
    title: "Methodology",
    body: "Every figure in this product is either reused verbatim from a verified source PDF supplied by the project team, or collected fresh from a named official publication with a real URL. Nothing is estimated, simulated, or backfilled — an indicator without a verified value is simply left out rather than guessed. The workbook (MASTER_TOURISM_DATABASE_FINAL.xlsx) is the single source of truth; this application reads it live via SheetJS at runtime rather than hardcoding any tourism statistic in source code.",
  },
  {
    title: "Data Sources",
    body: "BPS / Badan Pusat Statistik (Statistik Wisatawan Nusantara 2024), Kementerian Pariwisata RI (province-of-origin trip data, Jan-Jun 2024/2025, diolah dari BPS), Bank Indonesia (QRIS & digital payment statistics), Kementerian Dalam Negeri — Ditjen Dukcapil (population, Dec 2024), PT Bank Central Asia Tbk (Annual Report 2024 & official press releases), UNESCO (World Heritage List), Kemenparekraf (RIPPARNAS / KSPN priority destination framework).",
  },
  {
    title: "Technology Stack",
    body: "React 18 + TypeScript, Vite, Tailwind CSS, Framer Motion, D3-geo (live province projection from the official 38-province GeoJSON), Recharts, SheetJS (runtime .xlsx parsing), React Router (HashRouter for GitHub Pages compatibility), Lucide React icons — deployed automatically to GitHub Pages via GitHub Actions.",
  },
  {
    title: "Team",
    body: "Doweldowin Team — BCA Business Case Competition submission.",
  },
  {
    title: "Development Process",
    body: "Built iteratively: (1) evidence collection and workbook construction with a strict no-placeholder policy, (2) a map-first interactive explorer for the homepage narrative, (3) a Master Data Center exposing every underlying dataset for verification, (4) production packaging with automated deployment. Each phase preserved everything built in the phase before it.",
  },
  {
    title: "Disclaimer",
    body: "This is an independent competition submission by Doweldowin Team and is not an official PT Bank Central Asia Tbk product. Figures reflect the most recent officially published data available at build time and may not represent BCA's current internal figures. Some indicators (traveler demographics, province-level payment mix, BCA branch/ATM locations) are not yet published at the granularity this product would ideally show, and are intentionally left out rather than estimated — see the Master Data Center for exactly what is and isn't included.",
  },
];

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 top-[76px] overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <PageHeader eyebrow="Transparency" title="About This Project" desc="How this evidence base was built, and where its edges are." />
        <div className="space-y-4 mt-4">
          {SECTIONS.map((s) => (
            <GlassCard key={s.title} className="p-6">
              <p className="text-sm font-bold text-bca-ink">{s.title}</p>
              <p className="text-[13px] text-bca-sub mt-2 leading-relaxed">{s.body}</p>
            </GlassCard>
          ))}
        </div>
        <GlassCard className="p-6 mt-4 bg-gradient-to-br from-bca-primary/5 to-bca-secondary/5">
          <p className="text-sm font-bold text-bca-ink">Source workbook</p>
          <p className="text-[13px] text-bca-sub mt-2 leading-relaxed">
            MASTER_TOURISM_DATABASE_FINAL.xlsx — 10 sheets, each row carrying its own Official Source / Publication /
            URL. See the workbook&apos;s 09_Reference_Master and 10_QA_Audit_Log sheets for the complete audit trail.
          </p>
        </GlassCard>
      </div>
    </motion.main>
  );
}
