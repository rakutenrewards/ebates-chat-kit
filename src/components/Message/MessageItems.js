import styled from 'styled-components';

const MessageItems = styled.div`
  background: #fff;
  max-width: ${props => props.theme.Message.cardMaxWidth};
  div:nth-child(1) {
    border-top: 0px;
  }
  ${props => props.theme.MessageItems.css}
`;

export default MessageItems;
