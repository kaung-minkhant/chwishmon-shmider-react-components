import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import alias from '@rollup/plugin-alias'
import * as path from 'path'

const packageJson = require("./package.json");

const moduleOptions = {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions: [".mjs", ".js", ".json", ".node", ".ts", ".tsx", ".css"],
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    terser(),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
  external: ["react", "react-dom"],
};

const typeOptions = {
  input: "src/index.ts",
  output: [{ file: packageJson.types, format: "es" }],
  plugins: [
    alias({
      entries:[
        {find: "@", replacement: path.resolve(__dirname, "src")}
      ] 
    }),
    dts(),
  ],
  external: [/\.css$/u],
};

export default [moduleOptions, typeOptions];
