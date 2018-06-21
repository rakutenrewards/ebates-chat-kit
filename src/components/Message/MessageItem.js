import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMessageItem = styled.div`
  display: block;
  text-align: left;
  border-width: 1px 0 0 0;
  border-style: solid;
  font-size: 1em;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  padding: 6px 12px;
  ${(props) => {
    return props.theme.MessageItem.css;
  }}
`;

const StyledMessageItemTitle = styled.div`
  font-size: 1.25em;
  text-align: left;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  ${(props) => {
    return props.theme.MessageItem.css;
  }}
`;

const StyledMessageItemSubtitle = styled.div`
  font-size: 1em;
  text-align: left;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  ${(props) => {
    return props.theme.MessageItem.css;
  }}
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Image = styled.div`
  min-width: 75px;
  max-width: 75px;
  min-height: 75px;
  max-height: 75px;
  margin: 0px 10px;
  margin-left: auto;
`;

export class MessageItem extends React.Component {
  static propTypes = {
     title: PropTypes.string,
     subtitle: PropTypes.string,
     image: PropTypes.string
  }

  render() {
    return (
      <StyledMessageItem>
        <FlexContainer>
          <Text>
            <StyledMessageItemTitle>{this.props.title}</StyledMessageItemTitle>
            <StyledMessageItemSubtitle>{this.props.subtitle}</StyledMessageItemSubtitle>
          </Text>
          <Image>
            <img src={this.props.image} style={{ borderRadius: '5px' }} />
          </Image>
        </FlexContainer>
      </StyledMessageItem>
    );
  }
}

export default MessageItem;
