
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import globals from 'rollup-plugin-node-globals'

const isProduction = process.env.NODE_ENV === 'production';


export default {
  input: 'src/index.js',
  watch: {
    include: 'src/**/*.*'
  },
  sourcemap: true,
  output: [
    {
      file: 'dist/ebatesChatKit.js',
      format: 'cjs'
    },
    {
      file: 'dist/ebatesChatKit.umd.js',
      format: 'umd',
      name: 'EbatesChatKit'
    },
    {
      file: 'dist/ebatesChatKit.es.js',
      format: 'es'
    }
  ],
  external: ['react', 'react-dom'],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM'
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
        "external-helpers",
        "transform-class-properties",
        "babel-plugin-styled-components"
      ]
    }),
    cjs({
      include: 'node_modules/**',
      namedExports: {
          'node_modules/react-is/index.js': ['isValidElementType']
        }
    }),
    globals(),
    resolve()
  ]
};
