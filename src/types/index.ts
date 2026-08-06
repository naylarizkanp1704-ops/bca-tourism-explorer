export interface Province {
  code: string;
  province: string;
  island: string;
  capital: string;
  population: number | null;
  lat: number;
  lon: number;
  airport: string;
  kspn: string;
  hub: string;
}

export interface TripRecord {
  trips2024: number;
  trips2025: number;
  growth: number;
}

export interface Destination {
  name: string;
  province: string;
  lat: number;
  lon: number;
  type: string;
  categories: string[];
  unesco: boolean;
  kspn: boolean;
}

export interface NationalKPI {
  category: string;
  indicator: string;
  value: string;
  unit: string;
  year: string;
}

export interface QrisPoint {
  period: string;
  users: string;
  merchants: string;
  volume: string;
  value: string;
}

export interface BcaIndicator {
  indicator: string;
  value: string;
  period: string;
}

export interface ReferenceRow {
  organization: string;
  publication: string;
  year: string;
  url: string;
}

export interface DestinationGrowthRow {
  destination: string;
  sharePct: number;
  source: string;
}

export interface OutboundMixRow {
  destination: string;
  sharePct: number;
  source: string;
}

export interface QrisCrossBorder {
  countries: string;
  source: string;
}

export interface IndicatorRoadmapRow {
  category: string;
  indicator: string;
  officialSource: string;
  officialPublication: string;
  geographicLevel: string;
  dataStatus: string;
  populatedInSheet: string;
}

export interface SimpleIndicatorRow {
  indicator: string;
  value: string;
  period: string;
  source: string;
  publication: string;
  url: string;
}

export interface AccommodationTop10Hotel {
  province: string;
  starHotels: number | null;
  totalAccommodations: number | null;
}

export interface AccommodationTop10Stay {
  province: string;
  nights: number | null;
  yoyChange: string;
}

export interface AccommodationData {
  national: SimpleIndicatorRow[];
  top10Hotels: AccommodationTop10Hotel[];
  top10LengthOfStay: AccommodationTop10Stay[];
  roomRateCommercial: SimpleIndicatorRow | null;
}

export interface IncomeStatementRow {
  lineItem: string;
  fy2024: string;
  fy2023: string;
  yoyGrowth: string;
}

export interface CreditPortfolioRow {
  lineItem: string;
  value: string;
  yoyGrowth: string;
  pctOfTotal: string;
}

export interface ProjectionInputRow {
  input: string;
  value: string;
  type: string;
  source: string;
  publication: string;
  url: string;
}

export interface ProjectionAssumptionRow {
  assumption: string;
  low: string;
  base: string;
  high: string;
  rationale: string;
}

export interface ProjectionScenarioRow {
  scenario: string;
  share: string;
  growth: string;
  revenueRange: string;
  basis: string;
}

export interface FinancialData {
  incomeStatement: IncomeStatementRow[];
  creditPortfolio: CreditPortfolioRow[];
}

export interface ProjectionModelData {
  officialInputs: ProjectionInputRow[];
  assumptions: ProjectionAssumptionRow[];
  scenarios: ProjectionScenarioRow[];
}

export interface WorkbookData {
  provinces: Province[];
  trips: Record<string, TripRecord>;
  destinations: Destination[];
  nationalKPI: NationalKPI[];
  qris: QrisPoint[];
  bca: BcaIndicator[];
  references: ReferenceRow[];
  destinationGrowth2026: DestinationGrowthRow[];
  outboundMix: OutboundMixRow[];
  qrisCrossBorder: QrisCrossBorder | null;
  indicatorRoadmap: IndicatorRoadmapRow[];
  accommodation: AccommodationData;
  airTransport: SimpleIndicatorRow[];
  investment: SimpleIndicatorRow[];
  financials: FinancialData;
  projectionModel: ProjectionModelData;
}

export type LoadStatus = "idle" | "loading" | "ready" | "error";

export interface MapLayers {
  destinations: boolean;
  airports: boolean;
  intensity: boolean;
}

