import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import TextArea from "react-textarea-autosize";
import _ from 'lodash';

import MessageList from './MessageList';
import MessageGroup from './MessageGroup';
import QuickReplies from './QuickReplies';
import { Message, MessageText, MessageMedia, MessageTitle, MessageButtons, MessageButton, TypingIndicator } from './Message';
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
    value: PropTypes.string,
    autofocus: PropTypes.bool
  }

  static defaultProps = {
    maxRows: 3,
    onChange: noop,
    onKeyDown: noop,
    placeholder: 'Type a message...'
  };

  constructor(props) {
    super(props);
    this._focusTextComposer = this._focusTextComposer.bind(this);
    this._setTextareaRef = this._setTextareaRef.bind(this);
  }

  _contextToInputContext(props, context) {
    const { onChange, onKeyDown, value } = context;
    const textContext = { onChange, onKeyDown, value };
    return Object.assign({}, props, textContext);
  }

  _focusTextComposer() {
    if (this.props.autofocus !== false) {
      this.textarea.focus();
    }
  }

  componentDidUpdate() {
    this._focusTextComposer();
  }

  componentDidMount() {
    this._focusTextComposer();
  }

  _setTextareaRef(el) {
    this.textarea = el;
  }

  render() {
    return (
      <TextComposer.Context.Consumer>
        {context =>
          <StyledInput {...this._contextToInputContext(_.omit(this.props, ['autofocus']), context)} inputRef={this._setTextareaRef} />
        }
      </TextComposer.Context.Consumer>
    );
  }
}


const StyledTextComposer = styled.div`
  background:#fff;
  border-top:1px solid rgba(0,0,0,0.1);
  display: flex;
  padding: 0.5em;

  ${props => {
    const { theme: { TextComposer: textComposerTheme } } = props;
    return Object.assign({ color: textComposerTheme.inputColor }, textComposerTheme.css);
  }}
`;

class TextComposer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onButtonClick: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onSend: PropTypes.func,
    value: PropTypes.string,
    displaySendButton: PropTypes.bool,
    svgSendIcon: PropTypes.shape({
      viewBox: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string,
      pathD: PropTypes.string
    })
  };

  static defaultProps = {
    displaySendButton: false,
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
     
      this._handleSendButton = this._handleSendButton.bind(this);
  }

  _send() {
    if (!this._canSend()) {
      return false;
    }

    const { value } = this.state;
    const trimmedValue = _.trimEnd(value);

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
 
  _handleSendButton () {
    this._send();
  }
 
  render() {
    const { children, svgSendIcon, displaySendButton } = this.props;
    const iconContext = {
       viewBox : svgSendIcon ? svgSendIcon.viewBox : '0 0  0 0',
       width : svgSendIcon ? svgSendIcon.width : 0,
       height : svgSendIcon ? svgSendIcon.height : 0,
       pathD : svgSendIcon ? svgSendIcon.pathD :  ''
    };
    const sendText = svgSendIcon ? "" : 'Send';

    const context = {
      value: this.state.value,
      onButtonClick: this._handleButtonClick,
			onChange: this._handleOnChange,
			onKeyDown: this._handleKeyDown
    };
    const style = {
        opacity: context.value ? "1" : "0",
        visibility: context.value ?  "visible" : "hidden"
   };

    return (
      <TextComposer.Context.Provider value={context}>
        <StyledTextComposer {...this.props}>
          {children}
          {displaySendButton &&
          <StyledSendButton style={style} disabled={!context.value} onClick={this._handleSendButton} >{sendText}
              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" viewBox={iconContext.viewBox} width={iconContext.width} height={iconContext.height}>
              <path fill="currentColor" d={iconContext.pathD}/>
              </svg>
          </StyledSendButton>
          }
        </StyledTextComposer>
      </TextComposer.Context.Provider>
    );
  }
}

const StyledSendButton = styled.button`
    align-self: flex-end;
    font-size: 1em;
    width: auto;
    border: none;
    background-color: transparent;
    outline: 0;
    opacity: 0;
    transition: 0.3s;
    cursor: pointer; 

    ${props => props.theme.SendButton.css }
`;
 
const StyledChat = styled.div`
  font-family: "Proxima Nova", "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
  width:100%; height:100%;
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
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onSend: PropTypes.func,
    onButtonClick: PropTypes.func,
    /** Send Text */
    sendText: PropTypes.string,
    /**Display send button */
    displaySendButton: PropTypes.bool,
    /** Properties to display svg icon */
    svgSendIcon: PropTypes.shape({
      viewBox: PropTypes.string,
      width: PropTypes.string,
      height: PropTypes.string,
      pathD: PropTypes.string
    }),
    /** Theme to use for chat. */
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: defaultTheme,
    messages: [],
    onSend: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onButtonClick: () => {},
    displaySendButton: false
  }

  constructor(props) {
    super(props);
    this.state = {
      typingIndicator: false,
      messages: props.messages,
      pendingMessages: [],
      quickReplies: []
    };

    this.parentScroll = React.createRef();
    this._setParentScroll = this._setParentScroll.bind(this);

    this.turnTypingIndicatorOn = () => {
      this.setState({ typingIndicator: true });
    };

    this.setQuickReplies = (replies) => {
      this.setState({
        quickReplies: replies
      });
    };

    this.addMessages = (msgs) => {
      this.setState((prevState) => ({
        typingIndicator: false,
        messages: [...prevState.messages, ...msgs]
      }));
    };

    this.addMessage = (msg, typing=false) => {
      const { messages, pendingMessages } = this.state;

      if (!typing) {
        this.setState({
          typingIndicator: false,
          messages: [...messages, msg]
        });
        return;
      }

      this.setState({
        typingIndicator: true,
        quickReplies: [],
        pendingMessages: [...pendingMessages, msg]
      });
      this._applyPendingMessages();
    };

    this._applyPendingMessages = _.debounce(() => {
      const { messages, pendingMessages } = this.state;
      this.setState({
        typingIndicator: false,
        messages: [...messages, ...pendingMessages],
        pendingMessages: []
      });
    }, 350);

    this._onSend = (value) => {
      const { onSend } = this.props;
      const newMsg = {
        text: value,
        isOwn: true
      };

      this.setState({
        messages: [...this.state.messages, newMsg],
        quickReplies: []
      });

      onSend(value);
    };

    this._renderGroup = (group, groupIndex) => {
      if (group.length === 0) {
        return null;
      }

      const { ownAuthor, otherAuthor } = this.props;

      const firstMessage = group[0];
      const groupProps = {
        key: `messagegroup-${groupIndex}`,
        authorName: firstMessage.isOwn ? ownAuthor.name : otherAuthor.name,
        avatarUrl: firstMessage.isOwn ? ownAuthor.avatarUrl : otherAuthor.avatarUrl,
        isOwn: firstMessage.isOwn
      };

      return (
        <MessageGroup {...groupProps}>
          {group.map(_.partial(this._renderMessage, groupProps.key))}
        </MessageGroup>
      );
    };

    this._renderMessage = (groupKey, message, messageIndex) => {
      const key = `${groupKey}-message-${messageIndex}`;
      const { onButtonClick } = this.props;

      return (
        <Message key={key} onLoad={this.scrollToBottom}>
          {message.imageUrl && (
            <MessageMedia>
              {message.url ? <a href={message.url}><img src={message.imageUrl} /></a> : <img src={message.imageUrl} />}
            </MessageMedia>
          )}
          {message.title && <MessageTitle title={message.title} subtitle={message.subtitle} />}
          {message.text && <MessageText>{message.text}</MessageText>}
          {message.buttons && (
            <MessageButtons>
              {message.buttons.map((b, bidx) => (<MessageButton key={`${key}-button-${bidx}`} label={b.label} value={b.value} onClick={onButtonClick} />))}
            </MessageButtons>
          )}
        </Message>
      );
    };
  }

  scrollToBottom = () => {
    this.parentScroll.scrollTop = this.messagesEnd.offsetTop;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  _setParentScroll(el) {
    this.parentScroll = el;
  }

  render() {
    const { otherAuthor, onFocus, onBlur, theme, autofocus, svgSendIcon, displaySendButton } = this.props;
    const { messages, typingIndicator, quickReplies } = this.state;

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
          <MessageList scrollRef={this._setParentScroll}>
            {parsedMessages.filter(group => group.length > 0).map(this._renderGroup)}
            {typingIndicator ?  <Message authorName={otherAuthor.name} avatarUrl={otherAuthor.avatarUrl} isOwn={false} ><TypingIndicator /></Message>: null}
            {quickReplies.length > 0 ? <QuickReplies replies={quickReplies} onSelect={this._onSend} active={true} /> : null}
            <div style={{ float:"left", clear: "both", height: '0px', width: '0px', padding: '0px', margin: '0px', visibility: 'hidden' }} ref={(el) => { this.messagesEnd = el; }} />
          </MessageList>
          <TextComposer onSend={this._onSend} onFocus={onFocus} onBlur={onBlur} svgSendIcon={svgSendIcon} displaySendButton={displaySendButton}>
            <TextInput autofocus={autofocus} />
          </TextComposer>
        </StyledChat>
      </ThemeProvider>
    );
  }
}
