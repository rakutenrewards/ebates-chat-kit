import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

const noop = () => {};

class MessageListItem extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <div>{children}</div>
    );
  }
}

const StyledMessageList = styled.div`
  padding:0.5em;
  overflow-y:auto;
  height:100%;
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
    this.ref = React.createRef();

    this._handleScroll = _.throttle((event) => {
      this.props.onScroll(event);
    }, 300);
  }

  render() {
    const { children } = this.props;

    return (
      <StyledMessageList onScroll={this._handleScroll} {...this.props}>
        {React.Children.map(children, (child) => {
          if (!child) {
            return null;
          }
          return (
            <MessageListItem>{child}</MessageListItem>
          );
        })}
      </StyledMessageList>
    );
  }
}
