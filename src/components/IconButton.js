import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  appearance:none;
  background:transparent;
  border:0;
  display:inline-block;
  margin:0;
  padding:0.5em;
  color: ${props => props.color};
  &:hover {
    cursor:pointer;
  }
  &:active,&:focus {
    outline:none;
  }
`;

export class IconButton extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func
  };

  render() {
    const { active, children, color } = this.props;
    return (
      <StyledButton color={active ? color : 'inherit'}>
        {children}
      </StyledButton>
    );
  }
}
