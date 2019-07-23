
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import visualizer from 'rollup-plugin-visualizer';

import pkg from './package.json';

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
    {
      file: pkg.module,
      format: 'es',
      ...commonOutput
    }
  ],
  external: ['react', 'react-dom', 'styled-components'],
  plugins: [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    cjs(),
    globals(),
    resolve(),
    process.env.ANALYZE_PACKAGE && visualizer()
  ]
};
