import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** @component */
const StyledText = styled.div`
  white-space:pre-line;
  word-wrap:break-word;
  overflow-wrap:
  break-word;
  max-width:100%;
  padding: 6px 12px 6px 12px;
`;

export class MessageText extends React.Component {
  static propTypes = {
	   children: PropTypes.node
  }

  render() {
    const { children } = this.props;
    return (
      <StyledText>{children}</StyledText>
    );
  }
}

export default MessageText;
