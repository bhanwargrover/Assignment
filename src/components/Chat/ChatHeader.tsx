import React from 'react';
import { X } from 'lucide-react';
import { ChatHeader as StyledChatHeader, HeaderTitle, CloseButton } from './styles';
import { Theme } from './theme';

interface ChatHeaderProps {
  title: string;
  onClose: () => void;
  theme: Theme;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, onClose, theme }) => {
  return (
    <StyledChatHeader theme={theme}>
      <HeaderTitle>{title}</HeaderTitle>
      <CloseButton 
        onClick={onClose} 
        aria-label="Close chat"
      >
        <X />
      </CloseButton>
    </StyledChatHeader>
  );
};

export default ChatHeader;