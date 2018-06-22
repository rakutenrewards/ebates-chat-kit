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
`;

const ImageContainer = styled.div`
  margin: 0px 10px;
  margin-left: auto;
  display: flex
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 75px;
  min-height: 75px;
`;

const Image = styled.img`
  border-radius: 5px;
  height: 75px;
  width: 75px;
  ${props => {
    const imageHeight = props.theme.MessageItem.imageHeight || '75px';
    const imageWidth = props.theme.MessageItem.imageWidth || '75px';
    return {
      height: imageHeight,
      weight: imageWidth
    };
  } }
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
  padding: 5px 6px;
  position: relative;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
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
          { this.props.image ? <ImageContainer><Image src={this.props.image} /></ImageContainer> : null}
        </FlexContainer>
      </StyledMessageItem>
    );
  }
}

export default MessageItem;
