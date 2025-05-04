"use client"

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, AlertCircle } from 'lucide-react';
import { ChatMessage, messageStorage } from './utils/storage';
import { getAIResponse } from './utils/ai';
import './chat-widget.css';

interface ChatWidgetProps {
  title?: string;
  subtitle?: string;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  welcomeMessage?: string;
  apiUrl?: string;
}

export default function ChatWidget({
  title = 'Chat Support',
  subtitle = 'We typically reply within a few minutes',
  position = 'bottom-right',
  primaryColor = '#3B82F6',
  welcomeMessage = 'Hello! How can I help you today?',
  apiUrl = 'https://api.example.com/socket', // Replace with actual API URL
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  
  // Initialize messages from local storage and add welcome message if empty
  useEffect(() => {
    const storedMessages = messageStorage.getMessages();
    
    if (storedMessages.length === 0) {
      const initialMessage: ChatMessage = {
        id: Date.now().toString(),
        content: welcomeMessage,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      
      messageStorage.addMessage(initialMessage);
      setMessages([initialMessage]);
    } else {
      setMessages(storedMessages);
    }
  }, [welcomeMessage]);
  
  // Connect to socket when widget is first opened
  useEffect(() => {
    if (isOpen && !socketRef.current) {
      try {
        // For demo purposes, we're mocking the socket connection
        // socketRef.current = io(apiUrl);
        
        setTimeout(() => {
          setIsConnected(true);
        }, 1000);
        
        // In a real implementation, you would handle socket events:
        // socketRef.current.on('connect', () => setIsConnected(true));
        // socketRef.current.on('disconnect', () => setIsConnected(false));
        // socketRef.current.on('message', (message) => {
        //   addMessage({
        //     id: message.id,
        //     content: message.content,
        //     sender: 'bot',
        //     timestamp: message.timestamp,
        //   });
        // });
      } catch (err) {
        setError('Failed to connect to support. Please try again later.');
      }
    }
    
    return () => {
      // In a real implementation, you would disconnect the socket:
      // if (socketRef.current) {
      //   socketRef.current.disconnect();
      //   socketRef.current = null;
      // }
    };
  }, [isOpen, apiUrl]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const addMessage = (message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
    messageStorage.addMessage(message);
  };
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);
    
    try {
      // In a real implementation, you would send messages via socket:
      // socketRef.current?.emit('message', {
      //   content: input,
      //   timestamp: new Date().toISOString(),
      // });
      
      // For demo, we'll use a simulated AI response
      const response = await getAIResponse(input);
      
      setTimeout(() => {
        const botMessage: ChatMessage = {
          id: Date.now().toString(),
          content: response,
          sender: 'bot',
          timestamp: new Date().toISOString(),
        };
        
        addMessage(botMessage);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const clearConversation = () => {
    messageStorage.clearMessages();
    
    const initialMessage: ChatMessage = {
      id: Date.now().toString(),
      content: welcomeMessage,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
    
    messageStorage.addMessage(initialMessage);
    setMessages([initialMessage]);
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setError(null);
    }
  };
  
  const positionClass = position === 'bottom-left' ? 'left-4' : 'right-4';
  
  return createPortal(
    <div className="chat-widget-container">
      <style>{`
        :root {
          --chat-primary-color: ${primaryColor};
          --chat-primary-hover: ${primaryColor}dd;
        }
      `}</style>
    
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-widget-window ${positionClass}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="chat-widget-header">
              <div>
                <h3 className="chat-widget-title">{title}</h3>
                <p className="chat-widget-subtitle">{subtitle}</p>
              </div>
              <button
                onClick={toggleChat}
                className="chat-widget-close-btn"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="chat-widget-messages">
              {error && (
                <div className="chat-widget-error">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`chat-widget-message ${
                    message.sender === 'user' ? 'chat-widget-message-user' : 'chat-widget-message-bot'
                  }`}
                >
                  <div className="chat-widget-message-content">
                    {message.content}
                  </div>
                  <div className="chat-widget-message-time">
                    {new Date(message.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="chat-widget-message chat-widget-message-bot">
                  <div className="chat-widget-message-content chat-widget-loading">
                    <Loader2 size={16} className="chat-widget-loading-icon" />
                    <span>Typing</span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-widget-footer">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chat-widget-input"
                rows={1}
                disabled={!isConnected}
              />
              <button
                onClick={handleSendMessage}
                className="chat-widget-send-btn"
                disabled={!input.trim() || isLoading || !isConnected}
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            
            <div className="chat-widget-tools">
              <button
                onClick={clearConversation}
                className="chat-widget-tool-btn"
                aria-label="Clear conversation"
              >
                Clear conversation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleChat}
        className={`chat-widget-button ${positionClass}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>,
    document.body
  );
}