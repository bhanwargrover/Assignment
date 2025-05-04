import React from 'react';
import { ChatWidget } from './components/Chat';

function App() {
  return (
   
      
      <ChatWidget
        config={{
          title: "Chat with us",
          primaryColor: "#3B82F6",
          greeting: "Hi there! How can I help you today? Feel free to ask me anything about our products or services.",
        }}
      />
    
  );
}

export default App;