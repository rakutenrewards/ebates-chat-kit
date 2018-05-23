import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import TextArea from "react-textarea-autosize";

import MessageList from './MessageList';
import { defaultTheme } from '../theme';

const noop = () => {};

const StyledInput = styled(TextArea)`
  apperance:none;
  border:0;
  resize:none;
  background-color:#fff;
  height:1.5em;
  line-height:1.5em;
  min-width 0;
  width:100%;
  font-size:1em;
  &:focus,&:active{
    outline:none;
  }
`;

class TextInput extends React.Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    maxRows: PropTypes.number,
    minRows: PropTypes.number,
    onChange: PropTypes.func,
    onHeightChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    maxRows: 3,
    onChange: noop,
    onKeyDown: noop,
    placeholder: 'Type a message...'
  };

  render() {
    return (
      <StyledInput {...this.props} />
    );
  }
}

const StyledTextComposer = styled.div`
  padding:0.5em;
  background:#fff;
  border-top:1px solid rgba(0,0,0,0.1);
  ${props => {
    const { theme: { TextComposer: textComposerTheme } } = props;
    return Object.assign({},
      { color: textComposerTheme.inputColor },
      textComposerTheme.css
    );
  }}
`;

class TextComposer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    defaultValue: PropTypes.string,
    onButtonClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onSend: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    defaultValue: '',
    onButtonClick: noop,
    onChange: noop,
    onKeyDown: noop,
    onSend: noop
  };

  render() {
    const { children } = this.props;
    return (
      <StyledTextComposer {...this.props}>
        {children}
      </StyledTextComposer>
    );
  }
}

export default class Chat extends React.Component {
  static propTypes = {
    /** Theme to use for chat. */
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: defaultTheme
  }

  render() {
    const { children, theme } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          <MessageList>
            {children}
          </MessageList>
          <TextComposer>
            <TextInput />
          </TextComposer>
        </div>
      </ThemeProvider>
    );
  }
}
