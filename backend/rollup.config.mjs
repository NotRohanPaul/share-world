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
        format: 'esm',
        entryFileNames: '[name].js',
    },
    plugins: [
        json(),
        resolve({
            preferBuiltins: false
        }),
        commonjs({
            transformMixedEsModules: true,
            esmExternals: true
        }),
        typescript({ tsconfig: './tsconfig.json' }),
        terser(),
    ],
    external: (id) =>
        /^node:/.test(id) ||
        builtinModules.includes(id),
};
