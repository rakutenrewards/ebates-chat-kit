import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMedia = styled.div`
  overflow:hidden;
  img{
    display:block;
    max-width:400px;
    max-height:150px;
    height:auto;
    margin:0 auto;
  }
  ${props => props.theme.MessageMedia.css}
`;

export class MessageMedia extends React.Component {
  static propTypes = {
	   children: PropTypes.node
  }

  render() {
    const { children } = this.props;
    return (
      <StyledMedia>{children}</StyledMedia>
    );
  }
}

export default MessageMedia;
