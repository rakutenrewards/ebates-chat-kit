import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StayScrolled, { scrolled } from 'react-stay-scrolled';
import _ from 'lodash';

const noop = () => {};

class MessageListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    // Injected by StayScrolled
    stayScrolled: PropTypes.func,
    scrollBottom: PropTypes.func
  };

  componentDidMount() {
    const { stayScrolled } = this.props;
    // Make the parent StayScrolled component scroll down if it was already scrolled
    stayScrolled();
  }

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

const ScrolledMessageListItem = scrolled(MessageListItem);

const StyledMessageList = styled.div`
  padding: 0.5em;

  ${props => {
    const { theme: { MessageList: messageListTheme } } = props;

    return Object.assign({},
      messageListTheme.css
    );
  }}
`;

export default class MessageList extends React.Component {
  static propTypes = {
    /** Children of the list */
    children: PropTypes.node,
    /** Prop used as function ref to the underlaying DOM element */
    innerRef: PropTypes.func,
    /** Callback hooked into list's scroll event */
    onScroll: PropTypes.func
  }

  static defaultProps = {
    onScroll: noop
  }

  constructor(props) {
    super(props);

    this._handleScroll = _.throttle((event) => {
      this.props.onScroll(event);
    }, 300);
  }

  render() {
    const { children } = this.props;

    return (
      <StyledMessageList onScroll={this._handleScroll} {...this.props}>
        <StayScrolled component="div" style={{overflowY:'scroll', height:'100%', width:'100%'}}>
          {React.Children.map(children, (child) => {
            if (!child) {
              return null;
            }
            return (
              <ScrolledMessageListItem>{child}</ScrolledMessageListItem>
            );
          })}
        </StayScrolled>
      </StyledMessageList>
    );
  }
}
