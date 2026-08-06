import { Search } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppData } from "@/context/DataContext";
import type { MDFilters } from "@/pages/MasterData";

const CATEGORIES = ["All", "Nature", "Urban", "Culture", "Marine", "Mountain", "Religious"];

export function FilterBar({
  filters,
  setFilters,
  onReset,
}: {
  filters: MDFilters;
  setFilters: React.Dispatch<React.SetStateAction<MDFilters>>;
  onReset: () => void;
}) {
  const { data } = useAppData();

  return (
    <GlassCard className="max-w-[1200px] mx-auto mt-2 p-4 md:p-5 flex flex-wrap items-center gap-3">
      <select
        value={filters.province}
        onChange={(e) => setFilters((s) => ({ ...s, province: e.target.value }))}
        aria-label="Filter by province"
        className="text-xs font-medium bg-bca-soft border border-bca-border rounded-xl px-3 py-2.5 outline-none focus:border-bca-primary"
      >
        <option value="All">All Provinces</option>
        {data?.provinces.map((p) => (
          <option key={p.province} value={p.province}>{p.province}</option>
        ))}
      </select>
      <select
        value={filters.category}
        onChange={(e) => setFilters((s) => ({ ...s, category: e.target.value }))}
        aria-label="Filter by destination category"
        className="text-xs font-medium bg-bca-soft border border-bca-border rounded-xl px-3 py-2.5 outline-none focus:border-bca-primary"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c === "All" ? "All Destination Categories" : c}</option>
        ))}
      </select>
      <select
        value={filters.year}
        onChange={(e) => setFilters((s) => ({ ...s, year: e.target.value as MDFilters["year"] }))}
        aria-label="Filter by year"
        className="text-xs font-medium bg-bca-soft border border-bca-border rounded-xl px-3 py-2.5 outline-none focus:border-bca-primary"
      >
        <option value="2025">Jan-Jun 2025</option>
        <option value="2024">Jan-Jun 2024</option>
      </select>
      <div className="relative flex-1 min-w-[180px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bca-sub" />
        <input
          value={filters.search}
          onChange={(e) => setFilters((s) => ({ ...s, search: e.target.value }))}
          placeholder="Search province or destination..."
          aria-label="Search"
          className="w-full text-xs bg-bca-soft border border-bca-border rounded-xl pl-8 pr-3 py-2.5 outline-none focus:border-bca-primary"
        />
      </div>
      <button
        onClick={onReset}
        className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-bca-border text-bca-sub hover:text-bca-primary hover:border-bca-primary transition-colors duration-200"
      >
        Reset Filter
      </button>
      <p className="w-full text-[10px] text-bca-sub pt-1">
        Filter Metode Pembayaran tidak diterapkan di sini — breakdown itu hanya dipublikasikan secara nasional (bukan
        per provinsi) di workbook saat ini. Lihat tab Payment untuk data yang tersedia.
      </p>
    </GlassCard>
  );
}
