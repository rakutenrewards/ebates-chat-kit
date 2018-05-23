const path = require('path');
const { createConfig, babel, postcss } = require('webpack-blocks');

module.exports = {
  webpackConfig: createConfig([babel(), postcss()]),
  title: "Ebates Chat Kit Documentation",
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/ThemeWrapper')
  },
  ribbon: {
    url: 'https://github.com/ebates-edc/ebates-chat-kit',
    text: 'Fork me on GitHub'
  },
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'UI Components',
      content: 'docs/ui.md',
      components: 'src/components/*.js'
    }
  ],
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
};
