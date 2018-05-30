import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const noop = () => {};

const StyledQuickReply = styled.button`
  font-size: 1em;
  box-shadow: rgba(32, 34, 40, 0.05) 0px 0.1em 0.1em 0px;
  font-weight: 400;
  word-break: break-word;
  background-color: rgb(255, 255, 255);
  color: rgb(66, 127, 225);
  border-width: 1px;
  border-style: solid;
  transition: box-shadow 0.1s, color 0.1s, border-color 0.2s;
  margin: 0.25em;
  border-radius: 1.4em;
  overflow: hidden;
  padding: 0.375em 1em 0.5em;
  border-color: rgb(66, 127, 225);
  &:focus {
    outline:0;
  }
  &:hover { transform: scale(1.05); }
`;

class QuickReply extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    onSelect: noop
  };

  constructor(props) {
    super(props);

    this._handleOnClick = () => {
      const { value } = this.props;
      console.log("QuickReply value selected: ", value);
      this.props.onSelect(value);
    };
  }

  render() {
    const { value } = this.props;
    return (
      <StyledQuickReply type="button" value={value} onClick={this._handleReplyClick}>{value}</StyledQuickReply>
    );
  }
}

const StyledQuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
`;

export class QuickReplies extends React.Component {
  static propTypes = {
    replies: PropTypes.arrayOf(PropTypes.string),
    onSelect: PropTypes.func
  }

  static defaultProps = {
    onSelect: noop
  }

  constructor(props) {
    super(props);

    this._handleOnSelect = (value) => {
      console.log("QuickReply value selected: ", value);
      this.props.onSelect(value);
    };
  }

  render() {
    const { replies } = this.props;
    const replyControls =  replies.map((r) => (<QuickReply value={r} onSelect={this._handleOnSelect}/>));
    return (
      <StyledQuickReplies>
        {replyControls}
      </StyledQuickReplies>
    );
  }
}
