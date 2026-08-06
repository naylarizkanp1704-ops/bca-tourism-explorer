import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const SECTIONS = [
  {
    title: "Problem Statement",
    body: "Sektor pariwisata domestik Indonesia menghasilkan volume perjalanan dan pengeluaran yang sangat besar, dan adopsi pembayaran digital terus tumbuh di seluruh negeri — namun keterkaitan antara di mana permintaan perjalanan sedang tumbuh dan di mana ekosistem pembayaran BCA seharusnya berekspansi selanjutnya belum dijelaskan secara eksplisit dan berbasis bukti.",
  },
  {
    title: "Objective",
    body: "Membangun basis bukti yang kredibel dan dapat dieksplorasi — bukan sekadar slide deck berisi asumsi — sehingga BCA dapat memprioritaskan peluang di level provinsi dan destinasi untuk ekspansi merchant QRIS, produk kartu, dan layanan finansial terkait perjalanan, hanya menggunakan data resmi yang dapat diverifikasi.",
  },
  {
    title: "Methodology",
    body: "Setiap angka dalam produk ini merupakan reuse langsung dari PDF sumber terverifikasi yang diberikan tim proyek, atau dikumpulkan baru dari publikasi resmi bernama dengan URL asli. Tidak ada yang diestimasi, disimulasikan, atau diisi ulang secara sembarangan — indikator tanpa nilai terverifikasi cukup dihilangkan, bukan ditebak. Workbook (MASTER_TOURISM_DATABASE_FINAL.xlsx) adalah satu-satunya sumber kebenaran; aplikasi ini membacanya secara langsung via SheetJS saat runtime, bukan menuliskan statistik pariwisata secara hardcode di kode sumber.",
  },
  {
    title: "Data Sources",
    body: "BPS / Badan Pusat Statistik (Statistik Wisatawan Nusantara 2024), Kementerian Pariwisata RI (data perjalanan asal-provinsi, Jan-Jun 2024/2025, diolah dari BPS), Bank Indonesia (statistik QRIS & pembayaran digital), Kementerian Dalam Negeri — Ditjen Dukcapil (populasi, Des 2024), PT Bank Central Asia Tbk (Laporan Tahunan 2024 & siaran pers resmi), UNESCO (World Heritage List), Kemenparekraf (kerangka RIPPARNAS / destinasi prioritas KSPN).",
  },
  {
    title: "Technology Stack",
    body: "React 18 + TypeScript, Vite, Tailwind CSS, Framer Motion, D3-geo (proyeksi provinsi langsung dari GeoJSON 38-provinsi resmi), Recharts, SheetJS (parsing .xlsx saat runtime), React Router (HashRouter agar kompatibel dengan GitHub Pages), ikon Lucide React — di-deploy otomatis ke GitHub Pages via GitHub Actions.",
  },
  {
    title: "Team",
    body: "Duwellduwin Team, Universitas Gadjah Mada — Victoria, Nayla, dan Fadhila. Disusun untuk BCA Business Case Competition.",
  },
  {
    title: "Development Process",
    body: "Dibangun secara bertahap: (1) pengumpulan bukti dan penyusunan workbook dengan kebijakan tanpa placeholder yang ketat, (2) explorer interaktif map-first untuk narasi homepage, (3) Master Data Center yang menampilkan setiap dataset dasar untuk verifikasi, (4) pengemasan produksi dengan deployment otomatis. Setiap fase mempertahankan semua yang sudah dibangun di fase sebelumnya.",
  },
  {
    title: "Disclaimer",
    body: "Ini adalah submission kompetisi independen oleh Duwellduwin Team dan bukan produk resmi PT Bank Central Asia Tbk. Angka-angka mencerminkan data resmi terbaru yang tersedia saat pembangunan produk dan mungkin tidak merepresentasikan angka internal BCA saat ini. Beberapa indikator (demografi traveler, bauran metode pembayaran per provinsi, lokasi cabang/ATM BCA) belum dipublikasikan pada tingkat detail yang idealnya ditampilkan produk ini, dan sengaja tidak dicantumkan alih-alih diestimasi — lihat Master Data Center untuk detail lengkap apa yang termasuk dan tidak.",
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
        <PageHeader eyebrow="Transparency" title="About This Project" desc="Bagaimana basis bukti ini dibangun, dan di mana batasannya." />
        <div className="space-y-4 mt-4">
          {SECTIONS.map((s) => (
            <GlassCard key={s.title} className="p-6">
              <p className="text-sm font-bold text-bca-ink">{s.title}</p>
              <p className="text-[13px] text-bca-sub mt-2 leading-relaxed">{s.body}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
