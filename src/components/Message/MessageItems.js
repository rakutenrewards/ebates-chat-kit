import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMessageItems = styled.div`
  background: #fff;
  max-width: 400px;
  ${(props) => {
    return props.theme.MessageItems.css;
  }}
`;

export class MessageItems extends React.Component {
  static propTypes = {
	   children: PropTypes.node
  }

  render() {
    const { children } = this.props;
    return (
      <StyledMessageItems>{children}</StyledMessageItems>
    );
  }
}

export default MessageItems;
