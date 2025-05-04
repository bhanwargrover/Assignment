import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Send } from 'lucide-react';
import { 
  ChatInputContainer, 
  ChatInputForm, 
  ChatInputField, 
  SendButton 
} from './styles';
import { Theme } from './theme';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  theme: Theme;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  theme,
  disabled = false 
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <ChatInputContainer theme={theme}>
      <ChatInputForm onSubmit={handleSubmit} theme={theme}>
        <ChatInputField
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          aria-label="Message input"
          disabled={disabled}
          theme={theme}
        />
        <SendButton 
          type="submit" 
          disabled={!input.trim() || disabled}
          aria-label="Send message"
          theme={theme}
        >
          <Send size={18} />
        </SendButton>
      </ChatInputForm>
    </ChatInputContainer>
  );
};

export default ChatInput;