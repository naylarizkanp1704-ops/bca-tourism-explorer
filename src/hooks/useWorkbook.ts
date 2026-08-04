import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { extractRows, toNumber, toStr } from "@/utils/workbookParser";
import type {
  WorkbookData, Province, TripRecord, Destination, NationalKPI, QrisPoint, BcaIndicator, ReferenceRow,
  DestinationGrowthRow, OutboundMixRow, QrisCrossBorder, IndicatorRoadmapRow, LoadStatus,
  SimpleIndicatorRow, AccommodationTop10Hotel, AccommodationTop10Stay, AccommodationData,
} from "@/types";

const WORKBOOK_URL = `${import.meta.env.BASE_URL}excel/MASTER_TOURISM_DATABASE_FINAL.xlsx`;

/**
 * Loads MASTER_TOURISM_DATABASE_FINAL.xlsx at runtime in the browser and
 * parses every sheet into typed, structured data. This is the application's
 * single source of truth — nothing tourism-related is hardcoded in source
 * code. Editing the workbook and re-deploying is enough to update the app.
 */
export function useWorkbook() {
  const [data, setData] = useState<WorkbookData | null>(null);
  const [status, setStatus] = useState<LoadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setProgress(5);
      try {
        const res = await fetch(WORKBOOK_URL);
        if (!res.ok) throw new Error(`Workbook fetch failed: HTTP ${res.status}`);

        const total = Number(res.headers.get("content-length")) || 0;
        const reader = res.body?.getReader();
        let arrayBuffer: ArrayBuffer;

        if (reader) {
          const chunks: Uint8Array[] = [];
          let received = 0;
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              chunks.push(value);
              received += value.length;
              if (total) setProgress(5 + Math.min(70, (received / total) * 70));
            }
          }
          arrayBuffer = mergeChunks(chunks, received);
        } else {
          arrayBuffer = await res.arrayBuffer();
        }
        setProgress(78);

        const wb = XLSX.read(arrayBuffer, { type: "array" });
        setProgress(88);

        if (cancelled) return;
        const parsed = parseWorkbook(wb);
        setProgress(100);
        setData(parsed);
        setStatus("ready");
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || "Failed to load workbook");
          setStatus("error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, status, progress, error };
}

function mergeChunks(chunks: Uint8Array[], total: number): ArrayBuffer {
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    merged.set(c, offset);
    offset += c.length;
  }
  return merged.buffer;
}

function parseWorkbook(wb: XLSX.WorkBook): WorkbookData {
  const sheet = (name: string) => wb.Sheets[name];

  // 02_Province_Master
  const provinceSheet = sheet("02_Province_Master");
  const provinceRows = provinceSheet
    ? extractRows(provinceSheet, ["Province Code", "Province", "Island", "Capital"], {
        stopValues: ["indonesia (total)"],
      })
    : [];
  const provinces: Province[] = provinceRows.map((r) => ({
    code: toStr(r["Province Code"]),
    province: toStr(r["Province"]),
    island: toStr(r["Island"]),
    capital: toStr(r["Capital"]),
    population: toNumber(r["Population (Dec 2024)"]),
    lat: toNumber(r["Latitude"]) ?? 0,
    lon: toNumber(r["Longitude"]) ?? 0,
    airport: toStr(r["Main Airport"]),
    kspn: toStr(r["Priority Tourism Status (KSPN)"]),
    hub: toStr(r["Main Tourism Hub"]),
  }));

  // 04_Province_Domestic_Trips
  const tripsSheet = sheet("04_Province_Domestic_Trips");
  const tripRows = tripsSheet
    ? extractRows(tripsSheet, ["Province", "Trips Jan-Jun 2024 (cumulative)"], {
        stopValues: ["indonesia (total)"],
      })
    : [];
  const trips: Record<string, TripRecord> = {};
  tripRows.forEach((r) => {
    const name = toStr(r["Province"]);
    trips[name] = {
      trips2024: toNumber(r["Trips Jan-Jun 2024 (cumulative)"]) ?? 0,
      trips2025: toNumber(r["Trips Jan-Jun 2025 (cumulative)"]) ?? 0,
      growth: toNumber(r["Growth Jan-Jun25 vs Jan-Jun24 (%)"]) ?? 0,
    };
  });

  // 05_Destination_Master
  const destSheet = sheet("05_Destination_Master");
  const destRows = destSheet
    ? extractRows(destSheet, ["Destination", "Province", "Latitude", "Longitude"])
    : [];
  const destinations: Destination[] = destRows.map((r) => {
    const cats: string[] = [];
    if (toStr(r["Nature"]) === "Y") cats.push("Nature");
    if (toStr(r["Urban"]) === "Y") cats.push("Urban");
    if (toStr(r["Culture"]) === "Y") cats.push("Culture");
    if (toStr(r["Marine"]) === "Y") cats.push("Marine");
    if (toStr(r["Mountain"]) === "Y") cats.push("Mountain");
    if (toStr(r["Religious"]) === "Y") cats.push("Religious");
    return {
      name: toStr(r["Destination"]),
      province: toStr(r["Province"]),
      lat: toNumber(r["Latitude"]) ?? 0,
      lon: toNumber(r["Longitude"]) ?? 0,
      type: toStr(r["Destination Type"]),
      categories: cats,
      unesco: toStr(r["UNESCO World Heritage Status"]) === "Yes",
      kspn: toStr(r["KSPN Priority Status"]).startsWith("Y"),
    };
  });

  // 03_National_KPI
  const kpiSheet = sheet("03_National_KPI");
  const kpiRows = kpiSheet ? extractRows(kpiSheet, ["Category", "Indicator", "Value"]) : [];
  const nationalKPI: NationalKPI[] = kpiRows
    .filter((r) => toStr(r["Category"]))
    .map((r) => ({
      category: toStr(r["Category"]),
      indicator: toStr(r["Indicator"]),
      value: toStr(r["Value"]),
      unit: toStr(r["Unit"]),
      year: toStr(r["Year"]),
    }));

  // 06_QRIS_Digital_Payment
  const qrisSheet = sheet("06_QRIS_Digital_Payment");
  const qrisRows = qrisSheet ? extractRows(qrisSheet, ["Period", "Users (million)"]) : [];
  const qris: QrisPoint[] = qrisRows.map((r) => ({
    period: toStr(r["Period"]),
    users: toStr(r["Users (million)"]),
    merchants: toStr(r["Merchants (million)"]),
    volume: toStr(r["Transaction Volume"]),
    value: toStr(r["Transaction Value"]),
  }));

  // 07_BCA_Ecosystem
  const bcaSheet = sheet("07_BCA_Ecosystem");
  const bcaRows = bcaSheet ? extractRows(bcaSheet, ["Indicator", "Value", "Period"]) : [];
  const bca: BcaIndicator[] = bcaRows
    .filter((r) => toStr(r["Indicator"]))
    .map((r) => ({
      indicator: toStr(r["Indicator"]),
      value: toStr(r["Value"]),
      period: toStr(r["Period"]),
    }));

  // 09_Reference_Master
  const refSheet = sheet("09_Reference_Master");
  const refRows = refSheet ? extractRows(refSheet, ["#", "Official Organization", "Publication"]) : [];
  const references: ReferenceRow[] = refRows.map((r) => ({
    organization: toStr(r["Official Organization"]),
    publication: toStr(r["Publication"]),
    year: toStr(r["Year"]),
    url: toStr(r["URL"]),
  }));

  // 03_National_KPI — secondary block: "Destination growth projection 2026"
  const growthRows = kpiSheet
    ? extractRows(kpiSheet, ["Destination", "Share of respondents projecting significant 2026 growth (%)"])
    : [];
  const destinationGrowth2026: DestinationGrowthRow[] = growthRows.map((r) => ({
    destination: toStr(r["Destination"]),
    sharePct: toNumber(r["Share of respondents projecting significant 2026 growth (%)"]) ?? 0,
    source: toStr(r["Source"]),
  }));

  // 03_National_KPI — secondary block: "Outbound travel destination mix"
  const outboundRows = kpiSheet
    ? extractRows(kpiSheet, ["Destination", "Share of outbound WNI trips (%)"])
    : [];
  const outboundMix: OutboundMixRow[] = outboundRows.map((r) => ({
    destination: toStr(r["Destination"]),
    sharePct: toNumber(r["Share of outbound WNI trips (%)"]) ?? 0,
    source: toStr(r["Source"]),
  }));

  // 03_National_KPI — single row: QRIS Cross-Border live countries
  let qrisCrossBorder: QrisCrossBorder | null = null;
  if (kpiSheet) {
    const grid = XLSX.utils.sheet_to_json<any[]>(kpiSheet, { header: 1, defval: null });
    const row = grid.find((r) => r && String(r[0] ?? "").trim() === "QRIS Cross-Border live countries");
    if (row) {
      qrisCrossBorder = { countries: toStr(row[1]), source: toStr(row[2]) };
    }
  }

  // 01_Indicator_Roadmap
  const roadmapSheet = sheet("01_Indicator_Roadmap");
  const roadmapRows = roadmapSheet
    ? extractRows(roadmapSheet, ["Category", "Indicator Name", "Official Source"])
    : [];
  const indicatorRoadmap: IndicatorRoadmapRow[] = roadmapRows
    .filter((r) => toStr(r["Indicator Name"]))
    .map((r) => ({
      category: toStr(r["Category"]),
      indicator: toStr(r["Indicator Name"]),
      officialSource: toStr(r["Official Source"]),
      officialPublication: toStr(r["Official Publication"]),
      geographicLevel: toStr(r["Geographic Level"]),
      dataStatus: toStr(r["Data Status"]),
      populatedInSheet: toStr(r["Populated In Sheet"]),
    }));

  // 11_Accommodation
  const accSheet = sheet("11_Accommodation");
  const accNationalRows = accSheet ? extractRows(accSheet, ["Indicator", "Value", "Year", "Official Source"]) : [];
  const accNational: SimpleIndicatorRow[] = accNationalRows
    .filter((r) => toStr(r["Indicator"]))
    .map((r) => ({
      indicator: toStr(r["Indicator"]), value: toStr(r["Value"]), period: toStr(r["Year"]),
      source: toStr(r["Official Source"]), publication: toStr(r["Publication"]), url: toStr(r["URL"]),
    }));

  const accHotelRows = accSheet ? extractRows(accSheet, ["Province", "Star Hotels", "Total Accommodations"]) : [];
  const top10Hotels: AccommodationTop10Hotel[] = accHotelRows
    .filter((r) => toStr(r["Province"]))
    .map((r) => ({
      province: toStr(r["Province"]),
      starHotels: toNumber(r["Star Hotels"]),
      totalAccommodations: toNumber(r["Total Accommodations"]),
    }));

  const accStayRows = accSheet ? extractRows(accSheet, ["Province", "Avg. Length of Stay (nights)"]) : [];
  const top10LengthOfStay: AccommodationTop10Stay[] = accStayRows
    .filter((r) => toStr(r["Province"]))
    .map((r) => ({
      province: toStr(r["Province"]),
      nights: toNumber(r["Avg. Length of Stay (nights)"]),
      yoyChange: toStr(r["YoY Change"]),
    }));

  const accRoomRateRows = accSheet
    ? extractRows(accSheet, ["Indicator", "Value", "Year", "Source (commercial, NOT official)"])
    : [];
  const roomRateCommercial: SimpleIndicatorRow | null = accRoomRateRows.length
    ? {
        indicator: toStr(accRoomRateRows[0]["Indicator"]), value: toStr(accRoomRateRows[0]["Value"]),
        period: toStr(accRoomRateRows[0]["Year"]), source: toStr(accRoomRateRows[0]["Source (commercial, NOT official)"]),
        publication: toStr(accRoomRateRows[0]["Publication"]), url: toStr(accRoomRateRows[0]["URL"]),
      }
    : null;

  const accommodation: AccommodationData = { national: accNational, top10Hotels, top10LengthOfStay, roomRateCommercial };

  // 12_Air_Transportation
  const airSheet = sheet("12_Air_Transportation");
  const airRows = airSheet ? extractRows(airSheet, ["Indicator", "Value", "Period", "Official Source"]) : [];
  const airTransport: SimpleIndicatorRow[] = airRows
    .filter((r) => toStr(r["Indicator"]))
    .map((r) => ({
      indicator: toStr(r["Indicator"]), value: toStr(r["Value"]), period: toStr(r["Period"]),
      source: toStr(r["Official Source"]), publication: toStr(r["Publication"]), url: toStr(r["URL"]),
    }));

  // 13_Investment_Potential_Sector
  const invSheet = sheet("13_Investment_Potential_Sector");
  const invRows = invSheet ? extractRows(invSheet, ["Indicator", "Value", "Period", "Official Source"]) : [];
  const investment: SimpleIndicatorRow[] = invRows
    .filter((r) => toStr(r["Indicator"]))
    .map((r) => ({
      indicator: toStr(r["Indicator"]), value: toStr(r["Value"]), period: toStr(r["Period"]),
      source: toStr(r["Official Source"]), publication: toStr(r["Publication"]), url: toStr(r["URL"]),
    }));

  return {
    provinces, trips, destinations, nationalKPI, qris, bca, references,
    destinationGrowth2026, outboundMix, qrisCrossBorder, indicatorRoadmap,
    accommodation, airTransport, investment,
  };
}
