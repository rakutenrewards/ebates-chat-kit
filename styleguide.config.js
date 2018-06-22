const path = require('path');
const { createConfig, babel, postcss } = require('webpack-blocks');

module.exports = {
  webpackConfig: createConfig([babel(), postcss()]),
  title: "Ebates Chat Kit",
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/ThemeWrapper'),
    LogoRenderer: path.join(__dirname, 'styleguide/LogoRenderer')
  },
  theme: {
    color: {
      link: '#fff',
      sidebarBackground: '#20A441'
    }
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
      components: 'src/components/[A-Z]*.js',
      sections: [
        {
          name: 'Message',
          components: 'src/components/Message/[A-Z]*.js'
        }
      ]
    }
  ],
  template: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://www.ebates.com/global_files/fonts/fonts.1.1.7.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        }
      ]
    }
  }
};
