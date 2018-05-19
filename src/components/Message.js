import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AvatarWrapper = styled.div`
  display:flex;flex-direction:column;flex-shrink:0;align-items:center;text-align:center;font-size:0.7em;line-height:1.6em;
  minWidth: 15px;
`;


class Avatar extends React.Component {
  static propTypes = {
    /** Message author's avatar URL. */
    avatar: PropTypes.string,
    /** Letter to represent the avatar in case image is missing */
    letter: PropTypes.string
  }

  render() {
    const { avatar, letter, className } = this.props;

    if (avatar) {
      return (<div className={className}><img src={avatar} /></div>);
    } else if (letter) {
      return (<div className={className}><span>{letter}</span></div>);
    }

    if (process.env.NODE_ENV === 'development') {
		  console.warn('Avatar component expects one of avatar or letter props.');
    }
    return null;
  }
}

const StyledAvatar = styled(Avatar)`
  border-width:1px; border-style:solid; border-radius:50%;
  text-align:left;
  img {
    display:block;
    border-radius:50%;
  }
`;

const StyledMessage = styled.div`
  display:flex;
  align-items:flex-start;
  font-size:0.9em;
  margin:0.3em;
  max-width:100%;
`;

const MessageMeta = styled.div`
  slign: ${props => props.isOwn ? 'right' : 'left'}
`;

const Content = styled.div`
  display:flex;
  flex-direction:column;
  overflow:hidden;
`;

const Time = styled.div`
  font-size:0.8em;
`;


export class Message extends React.Component {
  static propTypes = {
    /** Message author's avatar URL. */
    avatar: PropTypes.string,
    /** Message author - agent (left side) or visitor (right side) */
    isOwn: PropTypes.bool,
    /** Message date */
    date: PropTypes.string,
    /** Specifies how to render the message within a group of messages */
    style: PropTypes.oneOf(['single', 'first', 'last']),
    /** Message children components */
    children: PropTypes.node
  }

  render() {
    const { isOwn, avatar, children } = this.props;
    return (
      <StyledMessage>
        <AvatarWrapper isOwn={isOwn} >
          <StyledAvatar avatar={avatar} />
        </AvatarWrapper>
        <Content>
          {children}
        </Content>
      </StyledMessage>
    );
  }
}


// export class MessageGroup extends React.Component {
//   static propTypes = {
//     /** Message author's avatar URL. */
//     avatar: PropTypes.string,
//     /** Message author - agent (left side) or visitor (right side) */
//     isOwn: PropTypes.boolean,
//     /** Message children components */
//     children: PropTypes.node
//   }
//
//   render() {
//     return (
//       <div>
//       Helloe World! Foooo
//       </div>
//     );
//   }
// }
