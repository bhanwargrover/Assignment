import styled, { css, keyframes } from 'styled-components';
import { Theme } from './theme';
import { TypingIndicatorProps } from '../../types/chat';

// Common animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// ChatContainer - Main wrapper for the entire chat widget
export const ChatContainer = styled.div<{ theme: Theme }>`
  font-family: ${({ theme }) => theme.fonts.primary};
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

// ChatBubble - Floating chat bubble
export const ChatBubble = styled.button<{ theme: Theme }>`
  width: ${({ theme }) => theme.sizes.bubbleSize};
  height: ${({ theme }) => theme.sizes.bubbleSize};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${slideUp} 0.3s ease-out;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px ${({ theme }) => theme.colors.shadow};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

// ChatWindow - Expanded chat interface
export const ChatWindow = styled.div<{ isOpen: boolean; theme: Theme }>`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: ${({ theme }) => theme.sizes.windowWidth};
  height: ${({ theme }) => theme.sizes.windowHeight};
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s, opacity 0.3s;
  transform: ${({ isOpen }) => (isOpen ? 'scale(1)' : 'scale(0.9)')};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
  transform-origin: bottom right;
  animation: ${fadeIn} 0.3s ease-out;
  
  @media (max-width: 480px) {
    width: calc(100vw - 40px);
    height: 60vh;
    max-height: 520px;
  }
`;

// ChatHeader - Header component
export const ChatHeader = styled.div<{ theme: Theme }>`
  height: ${({ theme }) => theme.sizes.headerHeight};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: ${({ theme }) => theme.sizes.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.sizes.borderRadius};
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:focus {
    outline: none;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// ChatMessages - Message history component
export const ChatMessages = styled.div<{ theme: Theme }>`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.light};
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 3px;
  }
`;

// Common message styles
const MessageBase = css<{ theme: Theme }>`
  padding: 12px 16px;
  border-radius: 16px;
  max-width: 80%;
  word-wrap: break-word;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
`;

// UserMessage - User message bubble
export const UserMessage = styled.div<{ theme: Theme }>`
  ${MessageBase}
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.userMessage};
  color: white;
  border-bottom-right-radius: 4px;
`;

// BotMessage - Bot message bubble
export const BotMessage = styled.div<{ theme: Theme }>`
  ${MessageBase}
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors.botMessage};
  color: ${({ theme }) => theme.colors.text.light};
  border-bottom-left-radius: 4px;
`;

// MessageTimestamp - Timestamp for messages
export const MessageTimestamp = styled.div<{ theme: Theme }>`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.text.light};
  opacity: 0.7;
  margin-top: 4px;
  text-align: right;
`;

// TypingIndicator - Typing animation
export const TypingIndicator = styled.div<TypingIndicatorProps & { theme: Theme }>`
  display: ${props => (props.isTyping ? 'flex' : 'none')};
  align-items: center;
  gap: 4px;
  align-self: flex-start;
  background-color: ${({ theme }) => theme.colors.botMessage};
  color: ${({ theme }) => theme.colors.text.light};
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  margin-top: 8px;
  opacity: 0.7;
  animation: ${fadeIn} 0.3s ease-out;
`;

// TypingDot - Individual dot in the typing indicator
export const TypingDot = styled.div<{ index: number; theme: Theme }>`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.colors.text.light};
  border-radius: 50%;
  animation: ${pulse} 1s infinite;
  animation-delay: ${({ index }) => index * 0.2}s;
`;

// ChatInputContainer - Input area container
export const ChatInputContainer = styled.div<{ theme: Theme }>`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.light};
`;

// ChatInputForm - Form for the input field
export const ChatInputForm = styled.form<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// ChatInputField - Input field
export const ChatInputField = styled.input<{ theme: Theme }>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: white;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
    opacity: 0.5;
  }
`;

// SendButton - Send button
export const SendButton = styled.button<{ theme: Theme }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}e6;
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;