import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
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
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(),
    postcss({
      autoModules: true,
      plugins: [],
    }),
  ],
  external: ["react", "react-dom", /\.css$/g],
};

const typeOptions = {
  input: "src/index.ts",
  output: [{ file: packageJson.types, format: "es" }],
  plugins: [dts.default()],
  external: [/\.css$/g],
};

export default [moduleOptions, typeOptions];
