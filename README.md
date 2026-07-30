# BCA Domestic Tourism Intelligence Explorer

Interactive Geospatial Intelligence Platform built for the **BCA Business Case Competition** by **Doweldowin Team**.

A map-first evidence explorer for Indonesia's domestic tourism opportunity — every figure shown is either reused verbatim from a verified source, or sourced live from `MASTER_TOURISM_DATABASE_FINAL.xlsx`, parsed in the browser at runtime. Nothing tourism-related is hardcoded in source code.

---

## ✨ Features

- **Map-first homepage** — a full-screen, D3-projected interactive map of Indonesia's 38 provinces is the primary navigation surface, not a chart wall.
- **Progressive disclosure** — click a province to glide-zoom in, reveal destination markers, and open a floating glass insight panel.
- **Rule-based Insight Engine** — plain-language analysis generated from verified fields only (trip growth vs. national median, KSPN status) — no AI, no invented numbers.
- **Master Data Center** — a dedicated evidence page with filters, KPI cards, 8 tabs (Overview / Province / Destination / Traveler / Payment / BCA Network / Compare / References), sortable & searchable tables, CSV export, and a synced mini-map.
- **Honest gaps** — where official data doesn't exist yet (traveler demographics, province-level payment mix, BCA branch coordinates), the app says so explicitly instead of estimating.
- **Runtime `.xlsx` parsing** — via SheetJS; edit the workbook and redeploy, no code changes needed.
- **Live D3 map projection** — built from the official 38-province GeoJSON at runtime (`d3-geo`), not a pre-baked image.

## 🛠 Technology

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · D3-geo · Recharts · SheetJS (`xlsx`) · React Router (`HashRouter`) · Lucide React

## 📁 Folder Structure

```
bca-tourism-explorer/
├─ public/
│  ├─ excel/MASTER_TOURISM_DATABASE_FINAL.xlsx   # single source of truth
│  ├─ geo/indonesia-38-provinces.geojson         # official province boundaries
│  ├─ logo/bca-logo.svg
│  └─ manifest.webmanifest
├─ src/
│  ├─ components/
│  │  ├─ layout/       Navbar, LoadingScreen
│  │  ├─ map/           IndonesiaMap, MapTooltip, LayerPanel, Legend, MiniMap
│  │  ├─ home/           HeroOverlay, Sidebar, SearchBar
│  │  ├─ masterdata/     FilterBar, KpiCards, Tabs, *Tab components
│  │  └─ ui/             GlassCard, PageHeader
│  ├─ pages/            Home, MasterData, About, NotFound
│  ├─ hooks/             useWorkbook (SheetJS loader), useIndonesiaGeo (D3 loader)
│  ├─ context/           DataContext (global workbook + geo state)
│  ├─ utils/             format, csv, insight (rule engine), workbookParser
│  └─ types/             shared TypeScript interfaces
├─ .github/workflows/deploy.yml   # auto-deploy to GitHub Pages on push to main
└─ vite.config.ts                 # relative base path — works on any GH Pages URL
```

## 🚀 Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
```

## 📦 Build

```bash
npm run build      # type-checks with tsc, then builds to /dist
npm run preview    # preview the production build locally
```

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub (public repo, branch `main`).
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys automatically.
4. Your site is live at `https://<username>.github.io/<repo>/`.

No manual configuration is required: `vite.config.ts` uses a relative (`./`) base path so assets resolve correctly regardless of the repository name, and the app uses `HashRouter` so client-side routes (`/#/master-data`, `/#/about`) never 404 on GitHub Pages' static hosting.

## 🔄 Updating the Data

Replace `public/excel/MASTER_TOURISM_DATABASE_FINAL.xlsx` with an updated workbook that keeps the same sheet names and header rows (see `src/hooks/useWorkbook.ts` for the exact columns each sheet must contain), commit, and push. The next deploy picks up the new data automatically — no code changes needed.

## 📊 Data Sources

BPS · Bank Indonesia · Kementerian Pariwisata RI · Kementerian Dalam Negeri (Ditjen Dukcapil) · PT Bank Central Asia Tbk · UNESCO · Kemenparekraf (RIPPARNAS/KSPN). Full attribution with live links is in the app's **References** tab (Master Data Center) and the workbook's `09_Reference_Master` sheet.

## 🙋 Credits

**Doweldowin Team** — BCA Business Case Competition.

## 📄 License

MIT for the application code (see `LICENSE`). Underlying tourism/payment/demographic data remains subject to each official source's own terms — see the in-app **About** page.

## 🗺 Roadmap

- Pull province-level values for the indicators already catalogued (but not yet collected) in the workbook's `01_Indicator_Roadmap` sheet — traveler demographics, hotel occupancy, transport passenger volume.
- Add BCA branch/ATM coordinates if/when an official geocoded source becomes available, to enable a real coverage-ratio layer.
- Add a `BrowserRouter` + `404.html` redirect option for deployments on a custom domain where clean URLs are preferred over hash routes.
