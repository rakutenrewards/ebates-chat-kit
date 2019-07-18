import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

const noop = () => {};

const StyledQuickReply = styled.button`
  font-size: 1em;
  font-weight: 400;
  word-break: break-word;
  background-color: rgb(255, 255, 255);
  color: ${props => props.active ? props.theme.QuickReply.color : props.theme.QuickReply.colorInactive};
  border-color: ${props => props.active ? props.theme.QuickReply.color : props.theme.QuickReply.colorInactive};
  border-width: 1px;
  border-style: solid;
  transition: box-shadow 0.1s, color 0.1s, border-color 0.2s;
  margin: 0.25em;
  border-radius: 1.4em;
  overflow: hidden;
  padding: 0.375em 1em 0.5em;
  &:focus {
    outline:0;
    ${props => props.theme.QuickReply.cssFocus}
  }
  &:hover {
    transform: scale(1.05);
    ${props => props.theme.QuickReply.cssHover}
  }
  ${props => props.theme.QuickReply.css}
`;

class QuickReply extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    active: PropTypes.bool
  };

  static defaultProps = {
    active: true,
    onSelect: noop
  };

  constructor(props) {
    super(props);

    this._handleOnClick = () => {
      const { value, onSelect } = this.props;
      onSelect(value);
    };
  }

  render() {
    const { active, value } = this.props;
    return (
      <StyledQuickReply type="button" active={active} value={value} onClick={this._handleOnClick}>{value}</StyledQuickReply>
    );
  }
}

const StyledQuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  ${props => props.theme.QuickReplies.css}
`;

export default class QuickReplies extends React.Component {
  static propTypes = {
    replies: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func,
    active: PropTypes.bool,
    animationLength: PropTypes.number
  }

  static defaultProps = {
    active: true,
    onSelect: noop,
    animationLength: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      active: props.active
    };

    this._handleOnSelect = (value) => {
      const { active } = this.state;
      if (active) {
        this.setState({
          active: false
        });
        this.props.onSelect(value);
      }
    };
  }

  render() {
    const { replies, animationLength } = this.props;
    const { active } = this.state;

    return (
      <StyledQuickReplies>
        {replies.map((r, idx) => (
          <CSSTransition
            key={`reply-${idx}-${r}`}
            classNames="quickreplies-animation"
            timeout={{
              enter: animationLength,
              exit: animationLength
            }}
          >
            <QuickReply active={active} value={r} onSelect={this._handleOnSelect}/>
          </CSSTransition>
        ))}
      </StyledQuickReplies>
    );
  }
}
