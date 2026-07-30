import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
// Relative base ("./") so the build works unmodified whether it's served from
// the repo root (custom domain / user page) or from a GitHub Pages project
// path like https://<user>.github.io/<repo>/ — no repo-name hardcoding needed.
// If you deploy under a fixed known path and prefer an absolute base, you can
// set base: "/<repo-name>/" instead.
export default defineConfig({
    base: "./",
    plugins: [react()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        outDir: "dist",
        sourcemap: false,
        chunkSizeWarningLimit: 1200,
    },
    server: {
        port: 5173,
    },
});
