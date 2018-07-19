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
          <StyledInput {...this._contextToInputContext(this.props, context)} autoFocus={true} />
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
  width:100%; height:100%;

`;

 const StyledSpinnerContainer = styled('div')`
  transform-style: preserve-3d;
  height: 20px;
  padding: 10px;
`;

const StyledSpinner = styled('div')`
  border: 2px solid #23ae4a;
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  animation: spin .6s linear infinite;
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
    /** Theme to use for chat. */
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: defaultTheme,
    messages: [],
    onSend: () => {},
    onFocus: () => {},
    onBlur: () => {},
    onButtonClick: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      typingIndicator: false,
      messages: props.messages,
      paginateCounter: props.paginate,
      paginateLoading: false,
      scrollPosition: null,
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

    this.addMessage = (msg, typing=false) => {
      const { messages, pendingMessages, paginateCounter } = this.state;

      if (!typing) {
        this.setState({
          typingIndicator: false,
          messages: [...messages, msg],
          paginateCounter: paginateCounter + 1,
          scrollPosition: null
        });
        return;
      }

      this.setState({
        typingIndicator: true,
        quickReplies: [],
        pendingMessages: [...pendingMessages, msg],
        scrollPosition: null
      });
      this._applyPendingMessages();
    };

    this._applyPendingMessages = _.debounce(() => {
      const { messages, pendingMessages, paginateCounter } = this.state;
      this.setState({
        typingIndicator: false,
        messages: [...messages, ...pendingMessages],
        paginateCounter: paginateCounter + 1 || null,
        scrollPosition: null,
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
        paginateCounter: this.state.paginateCounter + 1 || null,
        scrollPosition: null,
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
          {message.title && <MessageTitle title={message.title} subtitle={message.subtitle} />}
          {message.imageUrl && (
            <MessageMedia>
              {message.url ? <a href={message.url}><img src={message.imageUrl} /></a> : <img src={message.imageUrl} />}
            </MessageMedia>
          )}
          {message.text && <MessageText>{message.text}</MessageText>}
          {message.buttons && (
            <MessageButtons>
              {message.buttons.map((b, bidx) => (<MessageButton key={`${key}-button-${bidx}`} label={b.label} value={b.value} onClick={onButtonClick} />))}
            </MessageButtons>
          )}
        </Message>
      );
    };

    this._onScroll = _.throttle(() => {
      if (this.messagesTop) {
        const rect = this.messagesTop.getBoundingClientRect();
        const elemTop = rect.top;
        const elemBottom = rect.bottom;
        const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  
        const bottomOffset = this.messagesBottom.offsetTop;
        if (isVisible && this.state.paginateCounter < this.state.messages.length) {
          this.setState({
            paginateLoading: true
          });
          setTimeout(() => {
            this.setState({
              paginateCounter: this.state.paginateCounter + this.props.paginate,
              paginateLoading: false,
              scrollPosition: bottomOffset
            });
          }, 500);
        }
      }
    }, 16);
  }

  scrollToBottom = () => {
    if (!this.state.paginateLoading && !this.state.scrollPosition) {
      this.parentScroll.scrollTop = this.messagesBottom.offsetTop;
    }
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
    if (this.state.scrollPosition && !this.state.paginateLoading) {
      this.parentScroll.scrollTop = this.messagesBottom.offsetTop - this.state.scrollPosition;
    }
  }

  _setParentScroll(el) {
    this.parentScroll = el;
  }

  render() {
    const { otherAuthor, onFocus, onBlur, theme } = this.props;
    const { messages, typingIndicator, quickReplies, paginateLoading, paginateCounter } = this.state;

    const index = Math.max(messages.length - paginateCounter + 1, 0);
    const splicedMessages = messages.slice(index);
    
    const parsedMessages = splicedMessages.reduce((result, current) => {
      const prev = result[result.length-1];
      if (!prev.length || prev[prev.length - 1].isOwn === current.isOwn) {
        result[result.length - 1].push(current);
        return result;
      }
      result.push([current]);
      return result;
    }, [[]]);

    const scroller = () => {
      if (paginateLoading) {
        return (
          <StyledSpinnerContainer>
            <StyledSpinner />
          </StyledSpinnerContainer>
        );
      }
      return (<div style={{ height: '40px' }} ref={(el) => { this.messagesTop = el; }} />);
    };

    return (
      <ThemeProvider theme={theme}>
        <StyledChat>
          <MessageList scrollRef={this._setParentScroll} onScroll={this._onScroll}>
            {scroller()}
            {parsedMessages.filter(group => group.length > 0).map(this._renderGroup)}
            {typingIndicator ?  <Message authorName={otherAuthor.name} avatarUrl={otherAuthor.avatarUrl} isOwn={false} ><TypingIndicator /></Message>: null}
            {quickReplies.length > 0 ? <QuickReplies replies={quickReplies} onSelect={this._onSend} active={true} /> : null}
            <div style={{ float:"left", clear: "both", height: '0px', width: '0px', padding: '0px', margin: '0px', visibility: 'hidden' }} ref={(el) => { this.messagesBottom = el; }} />
          </MessageList>
          <TextComposer onSend={this._onSend} onFocus={onFocus} onBlur={onBlur}>
            <TextInput />
          </TextComposer>
        </StyledChat>
      </ThemeProvider>
    );
  }
}
