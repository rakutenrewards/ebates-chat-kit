import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';

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

  render() {
    const { authorName, avatarUrl, children } = this.props;
    return (
      <StyledMessageGroup>
        {React.Children.map(children, (child, childIndex) => {
          console.log("child is =", child.props);
          const newProps = {
            childIndex,
            avatarUrl,
            authorName
          };

          return React.cloneElement(child, newProps);
        })}
      </StyledMessageGroup>
    );
  }
}
