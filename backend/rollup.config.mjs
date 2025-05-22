import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { builtinModules } from 'node:module';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'dist',
    },
    plugins: [
        json(),
        resolve({
            preferBuiltins: false
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        terser({
            format: {
                comments: false,
            }
        }),
    ],
    external: (id) =>
        /^node:/.test(id) ||
        builtinModules.includes(id),
};
