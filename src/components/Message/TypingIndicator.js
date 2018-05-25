import React from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  50% {
    opacity: 1;
    transform: translate3d(0,30%,0);
  }
`;

const StyledTypingIndicator = styled.div`
  will-change: transform;
  padding: 6px 12px 6px 12px;
  display: table;
  margin: 0 auto;
  position: relative;
`;

const StyledSpan = styled.span`
  height: 8px;
  width: 8px;
  float: left;
  margin: 5px 1px;
  background-color: #5B5B5B;
  display: block;
  border-radius: 50%;
  opacity: 0.4;
  animation: 1s ${blink} infinite ${props => props.i * 0.333}s;
`;

export default class TypingIndicator extends React.Component {
  render() {
    return (
      <StyledTypingIndicator>
        <StyledSpan i={0} />
        <StyledSpan i={1} />
        <StyledSpan i={2} />
      </StyledTypingIndicator>
    );
  }
}
