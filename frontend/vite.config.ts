import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from 'vite-plugin-compression';
import htmlMinifier from 'vite-plugin-html-minifier';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    viteCompression({ filter: /\.(js|mjs|json|css|html)$/i }),
    htmlMinifier()
  ],
});
