import _  from 'lodash';

const identityop = (v) => { return v; };


export const parseCompleteStyles = (props, componentName, propsParser = identityop) => {
	const { theme, style } = props
	const themeProps = theme[componentName] || {};

  const parser = propsParser ? propsParser : (v) => { return v; }

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

  },
  Bubble: {
    css: {
      backgroundColor: '#f1f0f0'
    }
  },
  OwnBubble: {
    css: {
      backgroundColor: '#427fe1',
			color: '#fff'
    }
  },
  Message: {
		secondaryTextColor: '#000',
		horizontalAlign: 'left',
		sharpBorderRadius: '0.3em',
		ovalBorderRadius: '1.4em',
		css: {
      marginLeft: '5px'
    }
	},
  OwnMessage: {
    secondaryTextColor: '#000',
    horizontalAlign: 'right'
  },
  MessageGroup: {
		css: {}
	},
  TextComposer: {
		inputColor: '#000',
		css: {},
		Icon: {
			color: '#aaa'
		},
		IconButton: {
			activeColor: '#427fe1'
		}
	}
};
