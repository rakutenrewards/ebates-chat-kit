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
  padding: 6px 12px;
  ${props => props.theme.MessageItem.css }
`;

const StyledMessageItemTitle = styled.div`
  font-size: 1.1em;
  font-weight: 500;
  text-align: left;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  ${props => props.theme.MessageItem.title }
`;

const StyledMessageItemSubtitle = styled.div`
  font-size: 1em;
  text-align: left;
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: #555555;
  padding-top: 3px;
  padding-bottom: 9px;
  ${props => props.theme.MessageItem.subtitle }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-self: flex-start;
  padding: 6px 0px;
  ${props => props.theme.MessageItem.text }
`;

const ImageContainer = styled.div`
  margin: 0px 10px;
  margin-left: auto;
  display: flex
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 75px;
  min-height: 75px;
  ${props => props.theme.MessageItem.imageContainer }
`;

const Image = styled.img`
  border-radius: 5px;
  ${props => props.theme.MessageItem.image }
`;

const Button = styled.a`
  color: #2196f3;
  border: 1px solid;
  border-color: #2196f3;
  border-radius: 3px;

  justify-content: center;
  height: 36px;
  line-height: 24px;
  margin-bottom: 8px;
  padding-bottom: 5px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 5px;
  position: relative;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  ${props => props.theme.MessageItem.button }
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
            { (this.props.buttonText || this.props.buttonUrl) ? <Button href={this.props.buttonUrl}>{this.props.buttonText}</Button> : null}
          </Text>
          { this.props.image ? <ImageContainer><Image src={this.props.image} width="75px" height="75px" /></ImageContainer> : null}
        </FlexContainer>
      </StyledMessageItem>
    );
  }
}

export default MessageItem;
