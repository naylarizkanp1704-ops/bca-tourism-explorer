import { ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppData } from "@/context/DataContext";

export function ReferencesTab() {
  const { data } = useAppData();
  if (!data) return null;

  return (
    <GlassCard className="p-5 overflow-x-auto">
      <table className="w-full text-xs min-w-[640px]">
        <thead>
          <tr className="border-b border-bca-border">
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Dataset</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Institution</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Year</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Status</th>
            <th className="text-left text-[10px] font-semibold text-bca-sub uppercase px-3 py-3">Link</th>
          </tr>
        </thead>
        <tbody>
          {data.references.map((r) => (
            <tr key={r.publication} className="border-b border-bca-soft hover:bg-bca-soft transition-colors duration-150">
              <td className="px-3 py-2.5 font-medium text-bca-ink">{r.publication}</td>
              <td className="px-3 py-2.5 text-slate-700">{r.organization}</td>
              <td className="px-3 py-2.5 text-slate-700">{r.year}</td>
              <td className="px-3 py-2.5">
                <span className="text-[10px] font-semibold text-white px-2 py-1 rounded-full bg-bca-accent">Official</span>
              </td>
              <td className="px-3 py-2.5">
                {r.url ? (
                  <a href={r.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-bca-primary font-medium hover:underline">
                    Source <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-slate-400">&mdash;</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-bca-sub mt-3">
        Tabel ini dibaca langsung dari sheet <code>09_Reference_Master</code> di workbook — tambahkan baris di sana dan
        akan otomatis muncul di sini pada deploy berikutnya.
      </p>
    </GlassCard>
  );
}
