import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';

const StyledMessageButton = styled.a`
  display:block;
  text-align: center;
  border-width:1px 0 0 0;
  border-style:solid;
  font-size:1em;
  padding:0.6em;
  transition:box-shadow 0.1s,color 0.1s,border-color 0.2s;
  background: #fff;

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
  constructor(props) {
    super(props);

    this._handleOnClick = () => {
      const { label, value, onClick } = this.props;
      onClick(label, value);
    };
  }

  static propTypes = {
    /** Button's label */
    label: PropTypes.string,
    value: PropTypes.string,
    primary: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    const { label } = this.props;
    return (
      <StyledMessageButton onClick={this._handleOnClick}>{label}</StyledMessageButton>
    );
  }
}

export default MessageButton;
