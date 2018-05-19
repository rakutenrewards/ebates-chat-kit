const { createConfig, babel, postcss } = require('webpack-blocks')

module.exports = {
  webpackConfig: createConfig([babel(), postcss()]),
  title: "Ebates Chat Kit Documentation",
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  }
}
