import { ChatMessage } from '../types/chat';

const STORAGE_KEY = 'chatbot_messages';

export const saveMessages = (messages: ChatMessage[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat messages to localStorage:', error);
  }
};

export const loadMessages = (): ChatMessage[] => {
  try {
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    return savedMessages ? JSON.parse(savedMessages) : [];
  } catch (error) {
    console.error('Error loading chat messages from localStorage:', error);
    return [];
  }
};