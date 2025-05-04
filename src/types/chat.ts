export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export interface ChatConfig {
  title?: string;
  primaryColor?: string;
  secondaryColor?: string;
  greeting?: string;
  logoUrl?: string;
}

export interface TypingIndicatorProps {
  isTyping: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  input: string;
}