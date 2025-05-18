import strip from '@rollup/plugin-strip';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from "node:fs";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv, Plugin } from 'vite';
import viteCompression from 'vite-plugin-compression';
import htmlMinifier from 'vite-plugin-html-minifier';
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { version } from './package.json';

const outDirName = "dist";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const metaGeneratorPlugin: Plugin = {
  name: 'meta-generator',
  apply: 'build',
  closeBundle() {
    const buildNumber = Date.now();
    const outputDir = path.join(__dirname, outDirName);

    fs.writeFileSync(
      path.resolve(outputDir, 'meta-frontend.json'),
      JSON.stringify({ version, buildNumber, timestamp: new Date().toISOString() }, null, 2)
    );
    console.log('meta-frontend.json created:', version);
  }
};

// https://vite.dev/config/
export default defineConfig({
  define: {
    ...(process.env.NODE_ENV !== 'development'
      ? {
        '__REACT_DEVTOOLS_GLOBAL_HOOK__': { isDisabled: true },
      }
      : {}),
  },
  build: {
    outDir: outDirName,
    rollupOptions: {
      plugins: [
        strip({
          include: '**/*.(ts|tsx|js|jsx|ejs|mjs)'
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
    environment: 'jsdom',
    setupFiles: './tests/setupTests.ts',
    include: ['tests/**/*.{test,spec}.{js,ts,tsx}'],
    env: loadEnv('development', process.cwd()),
    watch: false,
    coverage: {
      provider: 'v8',
      reporter: ['text'],
      reportsDirectory: './.cache/coverage'
    }
  }
});
