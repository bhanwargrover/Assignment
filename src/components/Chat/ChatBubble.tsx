import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ChatBubble as StyledChatBubble } from './styles';
import { Theme } from './theme';

interface ChatBubbleProps {
  onClick: () => void;
  theme: Theme;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick, theme }) => {
  return (
    <StyledChatBubble 
      onClick={onClick} 
      theme={theme}
      aria-label="Open chat"
    >
      <MessageCircle />
    </StyledChatBubble>
  );
};

export default ChatBubble;