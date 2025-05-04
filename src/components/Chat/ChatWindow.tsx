import React from 'react';
import { ChatWindow as StyledChatWindow } from './styles';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { ChatMessage } from '../../types/chat';
import { Theme } from './theme';

interface ChatWindowProps {
  isOpen: boolean;
  title: string;
  messages: ChatMessage[];
  isTyping: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
  theme: Theme;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  title,
  messages,
  isTyping,
  onClose,
  onSendMessage,
  theme
}) => {
  return (
    <StyledChatWindow isOpen={isOpen} theme={theme}>
      <ChatHeader title={title} onClose={onClose} theme={theme} />
      <ChatMessages messages={messages} isTyping={isTyping} theme={theme} />
      <ChatInput onSendMessage={onSendMessage} theme={theme} disabled={isTyping} />
    </StyledChatWindow>
  );
};

export default ChatWindow;