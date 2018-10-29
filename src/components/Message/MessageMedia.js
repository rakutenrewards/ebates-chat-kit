import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMedia = styled.div`
  overflow:hidden;
  img{
    display:block;
    max-width: ${props => props.theme.Message.cardMaxWidth};
    height:auto;
    margin:0 auto;
  }
  ${props => props.theme.MessageMedia.css}
`;

const ImageContainer = styled.div`
  position: relative;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 6px;
  color: #ffffff;
  font-size: 16px;
  padding: 5px 6px;
  ${props => props.theme.MessageMedia.caption}
`;

const Title = styled.div`
  font-weight: 300;
  ${props => props.theme.MessageMedia.title}
`;

const Subtitle = styled.div`
  font-weight: 200;
  letter-spacing: 1px;
  font-size: 0.8em;
  ${props => props.theme.MessageMedia.subtitle}
`;

export class MessageMedia extends React.Component {
  static propTypes = {
	   children: PropTypes.node
  }

  render() {
    const { children } = this.props;
    return (
      <ImageContainer>
        <StyledMedia>{children}</StyledMedia>
        <TitleContainer>
          <Title>{this.props.title}</Title>
          <Subtitle>{this.props.subtitle}</Subtitle>
        </TitleContainer>
      </ImageContainer>
    );
  }
}

export default MessageMedia;
