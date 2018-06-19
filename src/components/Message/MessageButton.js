import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';

const StyledMessageButton = styled.button`
  border-width:1px 0 0 0;
  border-style:solid;
  font-size:1em;
  padding:0.6em;
  transition:box-shadow 0.1s,color 0.1s,border-color 0.2s;
  width:100%;

  &:hover{
    cursor:pointer;
  }
  &:active{
    box-shadow:none;
    outline:none;
  }
  &:focus{
    box-shadow:none;
    outline:none;
  }

  ${props => {
    const color = props.primary ? props.theme.MessageButton.primaryColor : props.theme.MessageButton.secondaryColor;
    const darkerColor = darken(0.2, color);

    return {
      borderColor: color,
      color,
      ':hover': {
        color: darkerColor,
        borderColor: darkerColor
      }
    };
  }}
`;

class MessageButton extends React.Component {
  static propTypes = {
    /** Button's label */
    label: PropTypes.string,
    primary: PropTypes.bool
  };

  render() {
    const { label } = this.props;
    return (
      <StyledMessageButton>{label}</StyledMessageButton>
    );
  }
}

export default MessageButton;
