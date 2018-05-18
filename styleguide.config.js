const { createConfig, babel, postcss } = require('webpack-blocks')

module.exports = {
  webpackConfig: createConfig([babel(), postcss()])
}
