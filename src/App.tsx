import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { DataProvider, useAppData } from "@/context/DataContext";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { Navbar } from "@/components/layout/Navbar";

// Lazy-loaded pages/heavy components — keeps the initial bundle small and
// satisfies the "lazy load pages / lazy load heavy components" requirement.
const Home = lazy(() => import("@/pages/Home"));
const MasterData = lazy(() => import("@/pages/MasterData"));
const About = lazy(() => import("@/pages/About"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function AppShell() {
  const { status, progress, error, geoError } = useAppData();

  if (status === "loading" || status === "idle") {
    return <LoadingScreen progress={progress} />;
  }

  if (status === "error") {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-bca-soft px-6 text-center">
        <img src={`${import.meta.env.BASE_URL}logo/bca-logo.svg`} alt="BCA" className="h-8 mb-6 opacity-80" />
        <h1 className="text-xl font-bold text-bca-ink">Couldn't load the tourism workbook</h1>
        <p className="text-sm text-bca-sub mt-2 max-w-md">
          {error || "MASTER_TOURISM_DATABASE_FINAL.xlsx could not be fetched or parsed."} Make sure the file exists at{" "}
          <code className="bg-white px-1.5 py-0.5 rounded border border-bca-border">/public/excel/</code>.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-bca-primary text-white text-sm font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bca-soft">
      <Navbar />
      {geoError && (
        <div className="absolute top-[68px] left-1/2 -translate-x-1/2 z-40 bg-red-50 border border-red-200 text-red-700 text-[11px] px-3 py-1.5 rounded-full">
          Map geometry failed to load — province shapes may be unavailable. ({geoError})
        </div>
      )}
      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-bca-sub text-sm">Loading page&hellip;</div>}>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/master-data" element={<MasterData />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      {/* HashRouter is used deliberately: GitHub Pages serves static files with
          no server-side rewrite, so a BrowserRouter would 404 on refresh/deep
          links to /master-data or /about. HashRouter guarantees every route
          works immediately after deployment with zero extra server config. */}
      <HashRouter>
        <DataProvider>
          <AppShell />
        </DataProvider>
      </HashRouter>
    </ErrorBoundary>
  );
}
