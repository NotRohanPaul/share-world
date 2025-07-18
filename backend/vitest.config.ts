import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { loadEnv } from "vite";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: false,
        watch: false,
        include: ['tests/**/*.{test,spec}.ts'],
        environment: 'node',
        env: loadEnv("development", process.cwd(), ""),
        coverage: {
            reporter: ['text'],
            reportsDirectory: './.cache/coverage'
        }
    }
})

