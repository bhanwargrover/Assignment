import ChatWidget from './chat-widget';

// Configuration options for the widget
interface ChatWidgetOptions {
  title?: string;
  subtitle?: string;
  position?: 'bottom-right' | 'bottom-left';
  primaryColor?: string;
  welcomeMessage?: string;
  apiUrl?: string;
}

// Function to initialize the chat widget
export const initChatWidget = (options: ChatWidgetOptions = {}) => {
  // Create a container for the widget
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'chat-widget-root';
  document.body.appendChild(widgetContainer);
  
  // Import React and ReactDOM dynamically
  const script1 = document.createElement('script');
  script1.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  
  const script2 = document.createElement('script');
  script2.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
  
  // Initialize the widget once dependencies are loaded
  script2.onload = () => {
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    
    if (React && ReactDOM) {
      ReactDOM.render(
        React.createElement(ChatWidget, options),
        widgetContainer
      );
    }
  };
  
  document.head.appendChild(script1);
  document.head.appendChild(script2);
};

// Make it available globally
window.initChatWidget = initChatWidget;

// Export the ChatWidget component for direct usage
export default ChatWidget;

// TypeScript declaration for global window object
declare global {
  interface Window {
    React: any;
    ReactDOM: any;
    initChatWidget: (options: ChatWidgetOptions) => void;
  }
}