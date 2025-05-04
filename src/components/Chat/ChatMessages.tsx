import React, { useEffect, useRef } from 'react';
import { 
  ChatMessages as StyledChatMessages, 
  UserMessage, 
  BotMessage, 
  MessageTimestamp,
  TypingIndicator,
  TypingDot
} from './styles';
import { ChatMessage } from '../../types/chat';
import { Theme } from './theme';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
  theme: Theme;
}

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isTyping, theme }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <StyledChatMessages theme={theme}>
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          {message.sender === 'user' ? (
            <UserMessage theme={theme}>
              {message.text}
              <MessageTimestamp theme={theme}>
                {formatTimestamp(message.timestamp)}
              </MessageTimestamp>
            </UserMessage>
          ) : (
            <BotMessage theme={theme}>
              {message.text}
              <MessageTimestamp theme={theme}>
                {formatTimestamp(message.timestamp)}
              </MessageTimestamp>
            </BotMessage>
          )}
        </React.Fragment>
      ))}
      
      <TypingIndicator isTyping={isTyping} theme={theme}>
        <TypingDot index={0} theme={theme} />
        <TypingDot index={1} theme={theme} />
        <TypingDot index={2} theme={theme} />
      </TypingIndicator>
      
      <div ref={messagesEndRef} />
    </StyledChatMessages>
  );
};

export default ChatMessages;