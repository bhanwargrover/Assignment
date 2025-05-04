import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '../types/chat';

// This is a mock socket service that simulates real-time messaging
// In a real implementation, this would connect to an actual Socket.IO server

class ChatSocketService {
  private mockSocket: any;
  private callbacks: { [key: string]: Function } = {};
  
  constructor() {
    // Create a mock socket that behaves like Socket.IO but doesn't actually connect
    this.mockSocket = {
      on: (event: string, callback: Function) => {
        this.callbacks[event] = callback;
        return this;
      },
      emit: (event: string, data: any) => {
        console.log(`Mock socket emit: ${event}`, data);
        // Simulate server processing delay
        setTimeout(() => {
          if (event === 'send_message' && data.text) {
            this.simulateResponse(data);
          }
        }, 500);
        return this;
      },
      connect: () => {
        setTimeout(() => {
          if (this.callbacks['connect']) {
            this.callbacks['connect']();
          }
        }, 300);
        return this;
      },
      disconnect: () => {
        if (this.callbacks['disconnect']) {
          this.callbacks['disconnect']();
        }
        return this;
      }
    };
  }

  connect(): void {
    this.mockSocket.connect();
  }

  disconnect(): void {
    this.mockSocket.disconnect();
  }

  onConnect(callback: () => void): void {
    this.mockSocket.on('connect', callback);
  }

  onDisconnect(callback: () => void): void {
    this.mockSocket.on('disconnect', callback);
  }

  onMessage(callback: (message: ChatMessage) => void): void {
    this.mockSocket.on('receive_message', callback);
  }

  onTyping(callback: (isTyping: boolean) => void): void {
    this.mockSocket.on('typing', callback);
  }

  sendMessage(text: string): void {
    const message: ChatMessage = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: Date.now()
    };
    
    this.mockSocket.emit('send_message', message);
  }

  private simulateResponse(userMessage: ChatMessage): void {
    // Simulate "typing" indicator
    if (this.callbacks['typing']) {
      this.callbacks['typing'](true);
    }

    // Simulate AI response delay (1-3 seconds)
    const responseTime = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      const botResponse = this.generateBotResponse(userMessage.text);
      
      if (this.callbacks['typing']) {
        this.callbacks['typing'](false);
      }
      
      if (this.callbacks['receive_message']) {
        this.callbacks['receive_message'](botResponse);
      }
    }, responseTime);
  }

  private generateBotResponse(userInput: string): ChatMessage {
    return {
      id: uuidv4(),
      text: this.mockAiResponse(userInput),
      sender: 'bot',
      timestamp: Date.now()
    };
  }

  private mockAiResponse(userInput: string): string {
    // Simple responses based on user input keywords
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hi there! How can I help you today? Feel free to ask me any questions about our business.";
    }
    
    if (lowercaseInput.includes('price') || lowercaseInput.includes('cost')) {
      return "Our pricing is competitive and based on your specific needs. We offer packages starting at $29/month. Would you like me to explain the different options?";
    }
    
    if (lowercaseInput.includes('contact') || lowercaseInput.includes('support')) {
      return "You can reach our support team at support@example.com or call us at (555) 123-4567. Our team is available Monday to Friday from 9am to 6pm EST.";
    }
    
    if (lowercaseInput.includes('hours') || lowercaseInput.includes('open')) {
      return "We're open Monday through Friday from 9am to 6pm, and Saturday from 10am to 4pm. We're closed on Sundays and major holidays.";
    }
    
    // Default response for other inputs
    return "Thanks for your message! I'd be happy to help with that. Could you provide a bit more information so I can assist you better?";
  }
}

// Export a singleton instance
export const chatSocketService = new ChatSocketService();