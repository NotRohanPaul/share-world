import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import htmlMinifier from 'vite-plugin-html-minifier';
import svgr from "vite-plugin-svgr";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
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
    htmlMinifier()
  ],
  define: {
    ...(process.env.NODE_ENV === 'production'
      ? {
        '__REACT_DEVTOOLS_GLOBAL_HOOK__': { isDisabled: true },
      }
      : {}),
  },
});
