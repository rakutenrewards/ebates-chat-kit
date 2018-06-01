import React, { Components } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import TextArea from "react-textarea-autosize";
import _ from 'lodash';

import MessageList from './MessageList';
import MessageGroup from './MessageGroup';
import QuickReplies from './QuickReplies';
import { Message, MessageText, MessageMedia, MessageTitle } from './Message';
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

  _contextToInputContext(props, context) {
    const { onChange, onKeyDown, value } = context;
    const textContext = { onChange, onKeyDown, value };
    return Object.assign({}, props, textContext);
  }

  render() {
    return (
      <TextComposer.Context.Consumer>
        {context =>
          <StyledInput {...this._contextToInputContext(this.props, context)} />
        }
      </TextComposer.Context.Consumer>
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
    onButtonClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onSend: PropTypes.func,
    value: PropTypes.string
  };

  static defaultProps = {
    sendOnEnter: true,
    onButtonClick: noop,
    onChange: noop,
    onKeyDown: noop,
    onSend: noop,
    value: ''
  };

  static Context = React.createContext(TextComposer.defaultProps);

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this._handleOnChange = (event) => {
      const value = event.target.value;
      this.setState({
        value
      });

      this.props.onChange(event);
    };

    this._handleButtonClick = (event) => {
      this.props.onButtonClick(event);
    };

    this._handleKeyDown = (event) => {
      const { onKeyDown } = this.props;

      if (this._onlyEnterPressed(event)) {
        event.preventDefault();
      }

      if (!this._enterPressed(event) || this._enterPressedAsNewline(event)) {
        onKeyDown(event);
        return;
      }

      this._send();
      this.props.onKeyDown(event);
    };
  }

  _send() {
    if (!this._canSend) {
      return false;
    }

    const { value } = this.state;
    const trimmedValue = _.trimEnd(value);

    console.log("Sending value: ", trimmedValue);
    this.props.onSend(trimmedValue);
    this.setState({ value: ''});
    return true;
  }

  _canSend() {
    const { value } = this.state;
    return value.trim() !== '';
  }

  _enterPressed(event) {
    const { keyCode } = event;
    return keyCode === 13;
  }

  _onlyEnterPressed(event) {
    const { altKey, shiftKey } = event;
    return (this._enterPressed(event) && !altKey && !shiftKey);
  }

  _enterPressedAsNewline(event) {
    const { altKey, shiftKey } = event;
    return (this._enterPressed(event) && (altKey || shiftKey));
  }


  render() {
    const { children } = this.props;
    const context = {
      value: this.state.value,
      onButtonClick: this._handleButtonClick,
			onChange: this._handleOnChange,
			onKeyDown: this._handleKeyDown
    };

    return (
      <TextComposer.Context.Provider value={context}>
        <StyledTextComposer {...this.props}>
          {children}
        </StyledTextComposer>
      </TextComposer.Context.Provider>
    );
  }
}

const StyledChat = styled.div`
  font-family: "Proxima Nova", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
`;

export default class Chat extends React.Component {
  static propTypes = {
    /** Messages to display */
    messages: PropTypes.arrayOf(PropTypes.object),
    ownAuthor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired
      }).isRequired,
    otherAuthor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired
      }).isRequired,
    /** Theme to use for chat. */
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: defaultTheme
  }

  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    };

    this._onSend = (value) => {
      console.log("Chat got value ", value, Components);
      const newMsg = {
        text: value,
        isOwn: true
      };
      const { messages } = this.state;
      messages.push(newMsg);
      this.setState({ messages });
    };

    this._renderGroup = (group, groupIndex) => {
      if (group.length === 0) {
        return null;
      }

      const { ownAuthor, otherAuthor } = this.props;

      const firstMessage = group[0];
      console.log("firstMessage: ", firstMessage);
      const groupProps = {
        key: groupIndex,
        authorName: firstMessage.isOwn ? ownAuthor.name : otherAuthor.name,
        avatarUrl: firstMessage.isOwn ? ownAuthor.avatarUrl : otherAuthor.avatarUrl,
        isOwn: firstMessage.isOwn
      };

      return (
        <MessageGroup {...groupProps}>
          {group.map((message, messageIndex) => (
            <Message key={`message-${messageIndex}`}>
              {message.title && <MessageTitle title={message.title} subtitle={message.subtitle} />}
              {message.imageUrl && (
                <MessageMedia>
                  <img src={message.imageUrl} />
                </MessageMedia>
							)}
              {message.text && <MessageText>{message.text}</MessageText>}
              />}
            </Message>
          ))}
        </MessageGroup>
      );
    };

  }

  render() {
    const { theme } = this.props;
    const { messages } = this.state;

    const parsedMessages = messages.reduce((result, current) => {
      const prev = result[result.length-1];
      if (!prev.length || prev[prev.length - 1].isOwn === current.isOwn) {
        result[result.length - 1].push(current);
        return result;
      }
      result.push([current]);
      return result;
    }, [[]]);

    return (
      <ThemeProvider theme={theme}>
        <StyledChat>
          <MessageList>
            {parsedMessages.filter(group => group.length > 0).map(this._renderGroup)}
          </MessageList>
          <TextComposer onSend={this._onSend}>
            <TextInput />
          </TextComposer>
        </StyledChat>
      </ThemeProvider>
    );
  }
}
