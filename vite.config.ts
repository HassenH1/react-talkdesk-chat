import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
    }),
  ],
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      fileName: (format) =>
        `talkdesk-chatwidget.${format === "es" ? "js" : "cjs"}`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      // match subpaths too (e.g. react/jsx-runtime), not just exact names
      external: (id) =>
        Object.keys(peerDependencies).some(
          (dep) => id === dep || id.startsWith(`${dep}/`),
        ),
      output: {
        // the component uses hooks, so Next.js App Router must treat the bundle as a client module
        banner: '"use client";',
      },
    },
  },
});
