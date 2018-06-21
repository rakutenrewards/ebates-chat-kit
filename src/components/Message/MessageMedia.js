import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledMedia = styled.div`
  overflow:hidden;
  img{
    display:block;
    max-width:400px;
    height:auto;
    margin:0 auto;
  }
  ${props => props.theme.MessageMedia.css}
`;

const ImageContainer = styled.div`
  position: relative;
`;

const Caption = styled.div`
  position: absolute;
  bottom: 8px;
  left: 16px;
  color: #ffffff;
  font-size: 30px;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 3px;
  text-align: center;
  padding: 0px 10px 5px 10px;
  ${props => props.theme.MessageMedia.caption}
`;

const Title = styled.div`
  font-weight: 300;
  ${props => props.theme.MessageMedia.title}
`;

const Subtitle = styled.div`
  font-weight: 100;
  font-size: 0.6em;
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
        <Caption>
          <Title>{this.props.title}</Title>
          <Subtitle>{this.props.subtitle}</Subtitle>
        </Caption>
      </ImageContainer>
    );
  }
}

export default MessageMedia;
