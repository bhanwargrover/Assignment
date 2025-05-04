import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatContainer } from './styles';
import ChatBubble from './ChatBubble';
import ChatWindow from './ChatWindow';
import { ChatMessage, ChatConfig } from '../../types/chat';
import { Theme, createTheme, defaultTheme } from './theme';
import { chatSocketService } from '../../services/socket';
import { loadMessages, saveMessages } from '../../utils/storage';

interface ChatWidgetProps {
  config?: ChatConfig;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ config = {} }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  // Initialize theme with custom configuration
  useEffect(() => {
    const customTheme = createTheme({
      colors: {
        primary: config.primaryColor || defaultTheme.colors.primary,
        secondary: config.secondaryColor || defaultTheme.colors.secondary,
      },
    });
    
    setTheme(customTheme);
  }, [config.primaryColor, config.secondaryColor]);
  
  // Load saved messages from localStorage
  useEffect(() => {
    const savedMessages = loadMessages();
    
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    } else if (config.greeting) {
      // Add greeting message if no saved messages and greeting is configured
      const greeting: ChatMessage = {
        id: uuidv4(),
        text: config.greeting,
        sender: 'bot',
        timestamp: Date.now(),
      };
      
      setMessages([greeting]);
      saveMessages([greeting]);
    }
  }, [config.greeting]);
  
  // Connect to socket service
  useEffect(() => {
    chatSocketService.connect();
    
    chatSocketService.onConnect(() => {
      setIsConnected(true);
      
      // Add default greeting if no messages and no custom greeting
      if (messages.length === 0 && !config.greeting) {
        const greeting: ChatMessage = {
          id: uuidv4(),
          text: "Hello! How can I help you today?",
          sender: 'bot',
          timestamp: Date.now(),
        };
        
        setMessages([greeting]);
        saveMessages([greeting]);
      }
    });
    
    chatSocketService.onDisconnect(() => {
      setIsConnected(false);
    });
    
    chatSocketService.onMessage((message: ChatMessage) => {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, message];
        saveMessages(newMessages);
        return newMessages;
      });
    });
    
    chatSocketService.onTyping((typing: boolean) => {
      setIsTyping(typing);
    });
    
    return () => {
      chatSocketService.disconnect();
    };
  }, [config.greeting, messages.length]);
  
  const handleToggleChat = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };
  
  const handleCloseChat = () => {
    setIsOpen(false);
  };
  
  const handleSendMessage = (text: string) => {
    // Create user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    // Add user message to chat
    setMessages(prevMessages => {
      const newMessages = [...prevMessages, userMessage];
      saveMessages(newMessages);
      return newMessages;
    });
    
    // Send message to socket service (which will trigger the bot response)
    if (isConnected) {
      chatSocketService.sendMessage(text);
    } else {
      // Handle offline case with error message
      setMessages(prevMessages => {
        const errorMessage: ChatMessage = {
          id: uuidv4(),
          text: "Sorry, I'm having trouble connecting. Please try again later.",
          sender: 'bot',
          timestamp: Date.now(),
        };
        
        const newMessages = [...prevMessages, errorMessage];
        saveMessages(newMessages);
        return newMessages;
      });
    }
  };
  
  return (
    <ChatContainer theme={theme}>
      <ChatWindow
        isOpen={isOpen}
        title={config.title || "Chat with us"}
        messages={messages}
        isTyping={isTyping}
        onClose={handleCloseChat}
        onSendMessage={handleSendMessage}
        theme={theme}
      />
      <ChatBubble onClick={handleToggleChat} theme={theme} />
    </ChatContainer>
  );
};

export default ChatWidget;