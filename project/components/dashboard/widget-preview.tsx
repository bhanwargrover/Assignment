"use client"

import { useState } from 'react';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

interface WidgetSettings {
  widgetTitle: string;
  widgetSubtitle: string;
  welcomeMessage: string;
  primaryColor: string;
  widgetPosition: string;
}

export function WidgetPreview({ settings }: { settings: WidgetSettings }) {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      content: settings.welcomeMessage,
      time: '10:00 AM'
    }
  ]);
  const [input, setInput] = useState('');
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      {
        sender: 'user',
        content: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    
    setMessages(newMessages);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          sender: 'bot',
          content: "This is a preview of how your chat widget will respond to messages.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1000);
  };
  
  return (
    <div className="relative h-full w-full max-w-[350px]">
      {/* Widget bubble */}
      <button
        onClick={toggleChat}
        className="absolute bottom-4 right-4 h-12 w-12 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{ backgroundColor: settings.primaryColor }}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="h-full w-full border rounded-lg shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4" style={{ backgroundColor: settings.primaryColor }}>
            <h3 className="text-white font-semibold">{settings.widgetTitle}</h3>
            <p className="text-white/80 text-xs">{settings.widgetSubtitle}</p>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-2'}`}>
                  <div className="flex items-center mb-1">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-2">
                        <Bot size={12} />
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center ml-2">
                        <User size={12} />
                      </div>
                    )}
                  </div>
                  <div 
                    className={`rounded-lg p-3 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-muted'
                    }`}
                    style={message.sender === 'user' ? { backgroundColor: settings.primaryColor } : {}}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1"
              style={{ borderColor: settings.primaryColor + '40', outline: 'none' }}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: settings.primaryColor }}
              disabled={!input.trim()}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}