import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '../types/chat';

// This is a simplified mock AI service
// In a real implementation, this would connect to an actual AI service API

class AiService {
  private systemPrompt: string = `You are a helpful, friendly, and professional AI chatbot embedded on a business website. Greet visitors, answer questions clearly, and guide them politely. Use short, simple English. Don't act robotic. Respond in a human-like way. Keep your replies to 2–3 sentences.`;
  
  async generateResponse(userMessage: string): Promise<ChatMessage> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      return {
        id: uuidv4(),
        text: this.mockResponse(userMessage),
        sender: 'bot',
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      return {
        id: uuidv4(),
        text: "I'm sorry, I encountered an issue processing your request. Please try again in a moment.",
        sender: 'bot',
        timestamp: Date.now()
      };
    }
  }
  
  private mockResponse(userInput: string): string {
    // Simple keyword-based response system
    // In a real implementation, this would call an actual AI API
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hi there! Welcome to our website. How can I help you today?";
    }
    
    if (input.includes('help') || input.includes('support')) {
      return "I'd be happy to help. Could you tell me what you're looking for? I can answer questions about our products, services, or business hours.";
    }
    
    if (input.includes('product') || input.includes('service')) {
      return "We offer a range of high-quality products and services designed to meet your needs. Would you like me to tell you about our most popular options?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('how much')) {
      return "Our prices vary depending on what you're looking for. We have options for every budget. Can you tell me which product or service you're interested in?";
    }
    
    if (input.includes('location') || input.includes('address') || input.includes('where')) {
      return "We're located at 123 Business Avenue, Suite 200. Our office is open Monday to Friday from 9am to 5pm. Is there something specific you'd like to know about visiting us?";
    }
    
    if (input.includes('contact') || input.includes('email') || input.includes('phone')) {
      return "You can reach us at contact@example.com or call (555) 123-4567. Our support team is available Monday through Friday from 9am to 6pm.";
    }
    
    if (input.includes('thank')) {
      return "You're welcome! I'm glad I could help. Let me know if you have any other questions.";
    }
    
    // Default response
    return "Thanks for your message! I'd be happy to help with that. Could you provide a bit more information so I can assist you better?";
  }
}

export const aiService = new AiService();