import Chat from './components/Chat.js';
import MessageList from './components/MessageList';
import MessageGroup from './components/MessageGroup';
import QuickReplies from './components/QuickReplies';
import * as MessageControls from './components/Message';
import { defaultTheme } from './theme';

const themes = {
  default: defaultTheme
};

const components = Object.assign({}, MessageControls, { Chat, MessageList, MessageGroup, QuickReplies, themes });

export default components;
