
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import globals from 'rollup-plugin-node-globals'

import pkg from './package.json'

const isProduction = process.env.NODE_ENV === 'production';

const commonOutput = {
  sourcemap: true,
  globals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'styled-components': 'styled'
  }
};


export default {
  input: 'src/index.js',
  watch: {
    include: 'src/**/*.*'
  },
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      ...commonOutput
    },
    // {
    //   file: 'dist/index.umd.js',
    //   format: 'umd',
    //   name: 'EbatesChatKit',
    //   ...commonOutput
    // },
    {
      file: pkg.module,
      format: 'es',
      ...commonOutput
    }
  ],
  external: ['react', 'react-dom', 'styled-components'],
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**', // only transpile our source code
      presets: [
        [ "env", { modules: false } ],
        "react"
      ],
      plugins: [
        "external-helpers",
        "transform-class-properties",
        "babel-plugin-styled-components"
      ]
    }),
    cjs(),
    globals(),
    resolve()
  ]
};
