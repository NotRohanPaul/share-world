import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

if (process.env.NODE_ENV !== 'production') {
    process.loadEnvFile("./.env.development");
}
export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: false,
        watch: false,
        include: ['tests/**/*.{test,spec}.ts'],
        environment: 'node',
        coverage: {
            reporter: ['text'],
            reportsDirectory: './.cache/coverage'
        }
    }
})

