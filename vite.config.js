import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import envCompatible from "vite-plugin-env-compatible";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    envCompatible({ prefix: "REACT_APP" }), // process.env 경로 사용을 위한 플러그인, npm install vite-plugin-env-compatible
    {
      name: "singleHMR", // HMR 버그 해결을 위한 플러그인
      handleHotUpdate({ modules }) {
        modules.map((m) => {
          m.importedModules = new Set();
          m.importers = new Set();
        });
        return modules;
      },
    },
  ],
  publicDir: false,
  build: {
    rollupOptions: {
      cache: true,
      output: {
        compact: true,
      },
    },
  },
  esbuild: {
    pure: mode === "production" ? ["console.log"] : [],
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "/",
    filename: "index.html",
  },
  server: {
    port: 3000,
    historyApiFallback: true,
  },
}));
