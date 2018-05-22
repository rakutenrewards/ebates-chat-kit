import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import _ from 'lodash';

const StyledMessageGroup = styled.div`
  margin-bottom:1em;
  ${props => props.theme.MessageGroup.css}
`;

export class MessageGroup extends React.Component {
  static propTypes = {
    /** Message author's name */
    authorName: PropTypes.string,
    /** Message author's avatar URL. */
    avatarUrl: PropTypes.string,
    /** Message children components */
    children: PropTypes.node,
    /** Message author - agent (left side) or visitor (right side) */
    isOwn: PropTypes.bool
  }

  static defaultProps = {
    isOwn: false
  }

  getIndexName(index, length) {
    if (index === 0 && length === 1) {
      return 'single';
    }

    if (index === 0) {
      return 'first';
    }
    if (index === length-1) {
      return 'last';
    }

    return 'middle';
  }

  render() {
    const { authorName, avatarUrl, isOwn, children } = this.props;
    return (
      <StyledMessageGroup>
        {React.Children.map(children, (child, childIndex) => {
          const childIndexName = this.getIndexName(childIndex, children.length);
          const newProps = Object.assign({}, child.props, {
            childIndex,
            childIndexName,
            avatarUrl,
            authorName,
            isOwn
          });

          return React.cloneElement(child, newProps);
        })}
      </StyledMessageGroup>
    );
  }
}
