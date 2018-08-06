import _  from 'lodash';

const identityop = (v) => { return v; };


export const mergeStyles = (props, componentName, propsParser = identityop) => {
  const { theme, style } = props;
  const themeProps = theme[componentName] || {};

  const parser = propsParser ? propsParser : (v) => { return v; };

  // TODO: should it be possible to specify common props in theme object?
  const merged = _.merge(
    parser(themeProps),
    themeProps.css || {},
    parser(props),
    style
  );

  return Object.assign({}, theme.vars, themeProps.vars || {}, merged);
};

export const defaultTheme = {
  Avatar: {
    size: '28px'
  },
  Bubble: {
    css: {
      backgroundColor: '#F4F4F4',
      color: '#333333',
      fontFamily: `"Proxima Nova", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif`
    },
    links: {
      css: {
        color: '#333333'
      }
    }
  },
  OwnBubble: {
    css: {
      backgroundColor: '#666666',
      color: '#fff'
    },
    links: {
      css: {
        color: '#fff'
      }
    }
  },
  Message: {
    cardMaxWidth: '300px',
    horizontalAlign: 'left',
    sharpBorderRadius: '0.3em',
    ovalBorderRadius: '1.4em',
    css: {
      marginLeft: '5px'
    }
  },
  OwnMessage: {
    horizontalAlign: 'right'
  },
  MessageTitle: {
    css: {}
  },
  SendButton: {
    css: {}
  },
  MessageMedia: {
    css: {}
  },
  MessageGroup: {
    css: {}
  },
  MessageButtons: {
    css: {}
  },
  MessageButton: {
    primaryColor: '#666666',
    secondaryColor: '#666666'
  },
  MessageItems: {
    css: {}
  },
  MessageItem: {
    css: {},
    imageHeight: '75px',
    imageWidth: '75px'
  },
  QuickReply: {
    color: '#23AE4A',
    colorInactive: '#666666',
    css: {
      fontFamily: `"Proxima Nova", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif`
    }
  },
  MessageList: {
    css: {}
  },
  TextComposer: {
    inputColor: '#000',
    css: {
      fontFamily: `"Proxima Nova", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif`
    },
    Icon: {
      color: '#aaa'
    },
    IconButton: {
      activeColor: '#23AE4A'
    }
  }
};
