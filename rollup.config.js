
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';


export default {
  input: 'src/index.js',
  watch: {
    include: 'src/**/*.*'
  },
  output: {
    file: 'dist/ebatesChatKit.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**', // only transpile our source code
      presets: [
        [ "env", { modules: false } ],
        "react"
      ],
      plugins: [
        "external-helpers"
      ]
    }),
    cjs(),
    resolve()
  ]
};
