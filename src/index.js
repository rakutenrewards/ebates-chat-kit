import Chat from './components/Chat.js';
import MessageList from './components/MessageList';
import MessageGroup from './components/MessageGroup';
import QuickReplies from './components/QuickReplies';
import * as MessageControls from './components/Message';

const components = Object.assign({}, MessageControls, { Chat, MessageList, MessageGroup, QuickReplies });

export default components;
