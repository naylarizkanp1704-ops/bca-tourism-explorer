import React, { createContext, useContext } from "react";
import { useWorkbook } from "@/hooks/useWorkbook";
import { useIndonesiaGeo, type IndonesiaGeo } from "@/hooks/useIndonesiaGeo";
import type { WorkbookData, LoadStatus } from "@/types";

interface DataContextValue {
  data: WorkbookData | null;
  geo: IndonesiaGeo | null;
  status: LoadStatus;
  progress: number;
  error: string | null;
  geoError: string | null;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { data, status, progress, error } = useWorkbook();
  const { geo, error: geoError } = useIndonesiaGeo();

  return (
    <DataContext.Provider value={{ data, geo, status, progress, error, geoError }}>
      {children}
    </DataContext.Provider>
  );
}

export function useAppData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useAppData must be used within a DataProvider");
  return ctx;
}
