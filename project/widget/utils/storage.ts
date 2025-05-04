export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const STORAGE_KEY = 'chat_widget_messages';

// Helper functions to manage message persistence
export const messageStorage = {
  getMessages: (): ChatMessage[] => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      return storedMessages ? JSON.parse(storedMessages) : [];
    } catch (error) {
      console.error('Error retrieving chat messages:', error);
      return [];
    }
  },
  
  addMessage: (message: ChatMessage): void => {
    try {
      const messages = messageStorage.getMessages();
      messages.push(message);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  },
  
  clearMessages: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing chat messages:', error);
    }
  }
};