import strip from "@rollup/plugin-strip";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { loadEnv, Plugin } from "vite";
import viteCompression from "vite-plugin-compression";
import htmlMinifier from "vite-plugin-html-minifier";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { version } from "./package.json";

const hasHostFlag = process.argv.includes("--host");
const outDirName = "dist";
const metaGeneratorPlugin: Plugin = {
  name: "meta-generator",
  apply: "build",
  closeBundle() {
    const buildNumber = Date.now();
    const outputDir = path.join(import.meta.dirname, outDirName);

    fs.writeFileSync(
      path.resolve(outputDir, "meta-frontend.json"),
      JSON.stringify({ version, buildNumber, timestamp: new Date().toISOString() }, null, 2)
    );
    console.log("meta-frontend.json created:", version);
  }
};

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: "/user",
    https: hasHostFlag === true
      ? {
        key: fs.readFileSync("../temp/cert/local-network-key.pem"),
        cert: fs.readFileSync("../temp/cert/local-network.pem")
      }
      : undefined,
    hmr: {
      protocol: hasHostFlag === true
        ? "wss" : "ws",
    },
    proxy: {
      "/api": "http://localhost:5000",
      "/socket": {
        target: "http://localhost:5000",
        ws: true,
      }
    }
  },
  define: {
    ...(process.env.NODE_ENV !== "development"
      ? {
        "__REACT_DEVTOOLS_GLOBAL_HOOK__": { isDisabled: true },
      }
      : {}),
  },
  build: {
    outDir: outDirName,
    rollupOptions: {
      plugins: [
        strip({
          include: "**/*.(ts|tsx|js|jsx|ejs|mjs)"
        })
      ]
    }
  },
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true
      },
      include: "**/*.svg",
    }),
    tailwindcss(),
    tsconfigPaths(),
    viteCompression(),
    htmlMinifier(),
    metaGeneratorPlugin
  ],
  test: {
    globals: false,
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:5325',
      },
    },
    setupFiles: "./tests/setupTests.ts",
    include: ["tests/**/*.{test,spec}.{js,ts,tsx}"],
    watch: false,
    env: loadEnv("development", process.cwd(), ""),
    coverage: {
      provider: "v8",
      reporter: ["text"],
      reportsDirectory: "./.cache/coverage"
    }
  }
});
