import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = styled.div`
  font-size:1.1em;
  font-weight: bolder;
`;

const Subtitle = styled.div`
  font-size:0.8em;
  font-weight: lighter;
  opacity:0.7;
`;

const TitltContainer = styled.div`
  padding: 0.6em;
`;

const StyledMessageTitle = styled.div`
  max-width: ${props => props.theme.Message.cardMaxWidth};
  ${props => props.theme.MessageTitle.css}
`;

export class MessageTitle extends React.Component {
  static propTypes = {
    subtitle: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    const { title, subtitle } = this.props;
    return (
      <StyledMessageTitle>
        <TitltContainer>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </TitltContainer>
      </StyledMessageTitle>
    );
  }
}

export default MessageTitle;
