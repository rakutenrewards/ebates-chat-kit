import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

const noop = () => {};

const StyledMessageList = styled.div`
  padding: 0 0 0.5em 0.5em;

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
        <div component="div" style={{overflowY:'scroll', WebkitOverflowScrolling:'touch', height:'100%', width:'100%'}} ref={this.props.scrollRef}>
          {React.Children.map(children, (child) => {
            if (!child) {
              return null;
            }
            return (
              <div>{child}</div>
            );
          })}
        </div>
      </StyledMessageList>
    );
  }
}
