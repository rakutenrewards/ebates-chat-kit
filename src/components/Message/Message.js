import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

const AvatarWrapper = styled.div`
  display:flex;
  flex-direction:column;
  flex-shrink:0;
  align-items:center;
  text-align:center;
  font-size:0.7em;
  line-height:1.6em;
  margin: ${props => props.isOwn ? '0 0 0 10px' : '0 10px 0 0'};
  min-width: ${props => props.theme.Avatar.size};
  ${props => props.isOwn ? props.theme.AvatarWrapper.Own.css : props.theme.AvatarWrapper.Other.css};
`;

const StyledAvatar = styled.div`
  text-align:left;
  border-radius:50%;
  overflow:hidden;
  img {
    display:block;
    width: ${props => props.theme.Avatar.size};
  }
  ${props => props.theme.Avatar.css};
`;

class Avatar extends React.Component {
  static propTypes = {
    /** Message author's name. */
    authorName: PropTypes.string,
    /** Message author's avatar URL. */
    avatarUrl: PropTypes.string,
    /** Letter to represent the avatar in case image is missing */
    letter: PropTypes.string,
    /** Avatar size (width and height) */
	  size: PropTypes.string,
	  /** Override component's styles */
	  style: PropTypes.shape()
  }

  render() {
    const { authorName, avatarUrl, letter } = this.props;

    if (avatarUrl) {
      return (<StyledAvatar {...this.props}><img title={authorName} src={avatarUrl} /></StyledAvatar>);
    }
    else if (letter) {
      return (<StyledAvatar {...this.props}><span>{letter}</span></StyledAvatar>);
    }

    if (process.env.NODE_ENV === 'development') {
		  console.warn('Avatar component expects one of avatar or letter props.');
    }
    return null;
  }
}

const StyledMessage = styled.div`
  display:flex;
  align-items:flex-start;
  font-size:0.9em;
  margin:0.3em;
  max-width:100%;
  ${props => {
    const { isOwn, theme } = props;
    if (!theme) {
      return {};
    }
    const { Message, OwnMessage } = theme;
    const style = isOwn ? _.merge({}, Message, OwnMessage) : Message;
    const result = _.merge({
      flexDirection: style.horizontalAlign === 'left' ? 'row' : 'row-reverse'
    }, style.css);
    return result;
  }}
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  overflow:hidden;
`;

const computeBorderRadius = function (sharpBorderRadius, ovalBorderRadius, isOwn, childIndexName = 'single', isCard) {
  const reorder = function reorder(order, arr) {
    return order.map((position) => {
      return arr[position];
    });
  };

  if (isCard) {
    return [ovalBorderRadius, ovalBorderRadius, ovalBorderRadius, ovalBorderRadius].join(' ');
  }

  const flipStyleHorizontally = reorder.bind(null, [1, 0, 3, 2]);

	const borderRadiusMap = {
		single: [sharpBorderRadius, ovalBorderRadius, ovalBorderRadius, ovalBorderRadius],
		first: [ovalBorderRadius, ovalBorderRadius, ovalBorderRadius, sharpBorderRadius],
		middle: [sharpBorderRadius, ovalBorderRadius, ovalBorderRadius, sharpBorderRadius],
		last: [sharpBorderRadius, ovalBorderRadius, ovalBorderRadius, ovalBorderRadius]
	};
	const style = borderRadiusMap[childIndexName];
	const result = (isOwn ? flipStyleHorizontally(style) : style).join(' ');
  return result;
};


const StyledBubble = styled.div`
  display:inline-block;
  max-width:100%;
  margin-bottom:0.1em;
  overflow: hidden;
  ${props => {
      const { isOwn, isCard, theme: { Bubble, OwnBubble, Message } } = props;
      const themeCustomCSS = isOwn ? _.merge({}, Bubble.css, OwnBubble.css) : Bubble.css;
      const border = isCard ? { border: Bubble.cardBorder } : { border: Bubble.messageBorder };
      const borderRadius = { borderRadius: computeBorderRadius(Message.sharpBorderRadius, Message.ovalBorderRadius, props.isOwn, props.childIndexName, isCard) };
      const styleExtras = Object.assign(
        {},
        border,
        themeCustomCSS,
        borderRadius
      );
      return styleExtras;
    }
  };

  img {
    max-width:100%;
    display:block;
  }
`;

class Bubble extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    isOwn: PropTypes.bool,
    childIndexName: PropTypes.string,
    isCard: PropTypes.bool, 
    theme: PropTypes.shape()
  }

  render() {
    const { children } = this.props;
    return (
      <StyledBubble {...this.props}>
        {children}
      </StyledBubble>
    );
  }
}

export default class Message extends React.Component {
  static propTypes = {
    /** Message author's name */
    authorName: PropTypes.string,
    authorOpened: PropTypes.bool,
    /** Message author's avatar URL. */
    avatarUrl: PropTypes.string,
    /** Should show the user's avatar? */
    showAvatar: PropTypes.bool,
    /** Message children components */
    children: PropTypes.node,
    /** Message date */
    date: PropTypes.string,
    /** Message author - agent (left side) or visitor (right side) */
    isOwn: PropTypes.bool,
    /** Is the message a card? - Removes background for better aesthetics */
    isCard: PropTypes.bool,
    onClick: PropTypes.func,
    showMetaOnClick: PropTypes.bool,
    /** Specifies how to render the message within a group of messages */
    style: PropTypes.oneOf(['single', 'first', 'middle', 'last'])
  }

  static defaultProps = {
    showAvatar: true,
	  onClick: function onClick() {}
  }

  render() {
    const { authorName, isOwn, avatarUrl, showAvatar, children } = this.props;
    const childrenWithProps = React.Children.map(children, child => child && React.cloneElement(child, { isOwn }));

    return (
      <StyledMessage {...this.props}>
        <AvatarWrapper isOwn={isOwn}>
          {showAvatar ? <Avatar authorName={authorName} avatarUrl={avatarUrl} /> : null}
        </AvatarWrapper>
        <Content>
          <Bubble {...this.props}>
            {childrenWithProps}
          </Bubble>
        </Content>
      </StyledMessage>
    );
  }
}
