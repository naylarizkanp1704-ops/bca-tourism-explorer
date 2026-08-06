import { TrendingUp } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import type { IncomeStatementRow, CreditPortfolioRow } from "@/types";

export function IncomeStatementTable({ rows }: { rows: IncomeStatementRow[] }) {
  return (
    <GlassCard className="p-5 overflow-x-auto">
      <p className="text-xs font-semibold text-bca-ink mb-4">Laporan Laba Rugi — FY2024 (Konsolidasi)</p>
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="border-b border-bca-border">
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Pos</th>
            <th className="text-right text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">FY2024</th>
            <th className="text-right text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">FY2023</th>
            <th className="text-right text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">YoY</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.lineItem} className="border-b border-bca-soft hover:bg-bca-soft transition-colors duration-150">
              <td className="px-3 py-3 font-medium text-bca-ink">{r.lineItem}</td>
              <td className="px-3 py-3 text-right font-semibold text-bca-primary">{r.fy2024}</td>
              <td className="px-3 py-3 text-right text-slate-500">{r.fy2023}</td>
              <td className="px-3 py-3 text-right font-medium text-bca-accent">{r.yoyGrowth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}

export function CreditPortfolioTable({ rows }: { rows: CreditPortfolioRow[] }) {
  return (
    <GlassCard className="p-5 overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={15} className="text-bca-primary" />
        <p className="text-xs font-semibold text-bca-ink">Portofolio Kredit &amp; Neraca — Des 2024</p>
      </div>
      <table className="w-full text-sm min-w-[560px]">
        <thead>
          <tr className="border-b border-bca-border">
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Pos</th>
            <th className="text-right text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Nilai</th>
            <th className="text-right text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">YoY</th>
            <th className="text-right text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">% dari Total Kredit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.lineItem} className="border-b border-bca-soft hover:bg-bca-soft transition-colors duration-150">
              <td className="px-3 py-3 text-bca-ink" style={{ paddingLeft: r.lineItem.startsWith("    ") ? "2.5rem" : r.lineItem.startsWith("—") ? "1.5rem" : undefined, fontWeight: r.lineItem.startsWith(" ") || r.lineItem.startsWith("—") ? 400 : 600 }}>
                {r.lineItem.replace(/^[\s—]+/, "")}
              </td>
              <td className="px-3 py-3 text-right font-semibold text-bca-primary whitespace-nowrap">{r.value}</td>
              <td className="px-3 py-3 text-right text-bca-accent whitespace-nowrap">{r.yoyGrowth}</td>
              <td className="px-3 py-3 text-right text-slate-500 whitespace-nowrap">{r.pctOfTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}
