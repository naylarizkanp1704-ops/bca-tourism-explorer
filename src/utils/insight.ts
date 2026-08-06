import type { Province, TripRecord, WorkbookData } from "@/types";

export function medianGrowth(data: WorkbookData): number {
  const vals = data.provinces
    .map((p) => data.trips[p.province]?.growth)
    .filter((v): v is number => typeof v === "number")
    .sort((a, b) => a - b);
  if (!vals.length) return 0;
  return vals[Math.floor(vals.length / 2)];
}

export interface OpportunityFlag {
  label: "Peluang Tinggi" | "Peluang Sedang" | "Perlu Dipantau" | "Belum Diketahui";
  color: string;
}

/**
 * Rule-based, transparent opportunity classification. Deliberately uses only
 * two verified inputs (trip growth vs national median, and KSPN designation)
 * — NOT a "coverage ratio" against BCA branch counts, because no official,
 * geocoded branch dataset exists in the workbook. Fabricating that ratio
 * would misrepresent the evidence.
 */
export function opportunityFlag(prov: Province, data: WorkbookData): OpportunityFlag {
  const t = data.trips[prov.province];
  if (!t) return { label: "Belum Diketahui", color: "#94A3B8" };
  const med = medianGrowth(data);
  const highGrowth = t.growth > med;
  const kspn = String(prov.kspn || "").startsWith("Y");
  if (highGrowth && kspn) return { label: "Peluang Tinggi", color: "#22C55E" };
  if (highGrowth || kspn) return { label: "Peluang Sedang", color: "#F59E0B" };
  return { label: "Perlu Dipantau", color: "#94A3B8" };
}

export function buildInsight(prov: Province, trip: TripRecord | undefined, nationalGrowth: number): string[] {
  const lines: string[] = [];
  if (!trip) return ["Data trip domestik untuk provinsi ini belum tersedia di workbook."];

  if (trip.growth > nationalGrowth * 1.5) {
    lines.push(
      `${prov.province} tumbuh +${trip.growth}% (Jan\u2013Jun 2025 vs 2024) \u2014 jauh melampaui rata-rata nasional +${nationalGrowth}%. Ini pasar yang sedang memanas: permintaan naik cepat, namun infrastruktur pembayaran digital mungkin belum mengejar. Peluang BCA: masuk lebih awal lewat ekspansi merchant QRIS sebelum kompetitor.`
    );
  } else if (trip.growth < nationalGrowth * 0.5) {
    lines.push(
      `Pertumbuhan trip di ${prov.province} relatif landai (+${trip.growth}% vs nasional +${nationalGrowth}%). Pasar cenderung sudah matang \u2014 strategi yang lebih relevan adalah memperdalam relasi lewat loyalty program dan bundling kartu, bukan akuisisi merchant baru secara agresif.`
    );
  } else {
    lines.push(
      `${prov.province} tumbuh +${trip.growth}%, sejalan dengan tren nasional (+${nationalGrowth}%) \u2014 pasar yang stabil dan dapat diandalkan untuk ekspansi bertahap.`
    );
  }
  if (String(prov.kspn || "").startsWith("Y")) {
    lines.push(
      `Provinsi ini memiliki destinasi berstatus KSPN (prioritas nasional Kemenparekraf) \u2014 sinyal kuat pemerintah untuk investasi pariwisata, sehingga relevan sebagai prioritas ekspansi ekosistem pembayaran BCA.`
    );
  }
  return lines;
}
