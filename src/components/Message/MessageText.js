import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Autolinker from "autolinker";
import xss from 'xss';

/** @component */
const StyledText = styled.div`
  white-space:pre-line;
  word-wrap:break-word;
  overflow-wrap:
  break-word;
  max-width:100%;
  padding: 6px 12px 6px 12px;
  a {
    cursor: pointer;
    text-decoration: underline;
    ${props => props.isOwn ? props.theme.OwnBubble.links.css : props.theme.Bubble.links.css};
  }
  ${props => props.theme.MessageText.css}
`;

export class MessageText extends React.Component {
  static propTypes = {
	   children: PropTypes.node,
     autolink: PropTypes.bool,
     isOwn: PropTypes.bool
  }

  static defaultProps = {
    autolink: true
  }

  render() {
    const { children, autolink, isOwn } = this.props;
    let safeHtml;

    if (!autolink) {
      return (
        <StyledText isOwn={isOwn}>{children}</StyledText>
      );
    }

    let autolinker = new Autolinker( {
        urls : {
          schemeMatches : true,
          wwwMatches    : true,
          tldMatches    : true
        },
        email       : true,
        phone       : true,
        mention     : false,
        hashtag     : false,

        stripPrefix : false,
        stripTrailingSlash : true,
        newWindow   : true,

        truncate : {
            length   : 0,
            location : 'end'
        },
        className : ''
    });


    return (
      <StyledText isOwn={isOwn}>{React.Children.map(children, (child) => {
        if (typeof child === "string") {
          safeHtml = xss(child);
          return (<span dangerouslySetInnerHTML={{__html:autolinker.link(safeHtml)}} />);
        }

        return child;
      })}</StyledText>
    );
  }
}

export default MessageText;
