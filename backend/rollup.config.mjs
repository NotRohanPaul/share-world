import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import fs from "node:fs";
import { builtinModules } from "node:module";
import path from "node:path";
import gzipPlugin from "rollup-plugin-gzip";
import pkg from "./package.json" with { type: "json" };

const { version } = pkg;
const outDirName = "dist";

const metaGeneratorPlugin = {
    name: "meta-generator",
    closeBundle() {
        const buildNumber = Date.now();
        const outputDir = path.join(process.cwd(), outDirName);

        fs.writeFileSync(
            path.resolve(outputDir, "meta-backend.json"),
            JSON.stringify({
                version,
                buildNumber,
                timestamp: new Date().toISOString()
            }, null, 2)
        );
        console.log("meta-backend.json created:", version);
    }
};

export default {
    input: "src/index.ts",
    output: {
        dir: outDirName
    },
    plugins: [
        json(),
        resolve({
            preferBuiltins: false
        }),
        commonjs(),
        typescript({ tsconfig: "tsconfig.build.json" }),
        terser({
            format: {
                comments: false,
            }
        }),
        gzipPlugin(),
        metaGeneratorPlugin
    ],
    external: (id) =>
        /^node:/.test(id) ||
        builtinModules.includes(id),
};
