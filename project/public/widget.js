// This is a simplified version of the compiled widget code for demo purposes
// In a real implementation, this would be the compiled and bundled version of your widget code

(function() {
  // Mock React and ReactDOM
  window.React = {
    createElement: function(type, props, ...children) {
      return { type, props, children };
    }
  };
  
  window.ReactDOM = {
    render: function(element, container) {
      // In a real implementation, this would render the React component
      console.log('Rendering chat widget');
      
      // For demo, we'll create a simple version of the widget
      const widgetHtml = `
        <style>
          .chat-widget-button {
            position: fixed;
            bottom: 1.5rem;
            right: 1.5rem;
            height: 3.5rem;
            width: 3.5rem;
            border-radius: 9999px;
            background-color: #3B82F6;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: none;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
            z-index: 1000;
          }
          
          .chat-widget-window {
            position: fixed;
            bottom: 5.5rem;
            right: 1.5rem;
            width: 22rem;
            max-width: calc(100vw - 2rem);
            height: 32rem;
            max-height: calc(100vh - 7rem);
            background-color: white;
            border-radius: 0.5rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
            z-index: 1000;
            border: 1px solid #e2e8f0;
          }
          
          .chat-widget-header {
            padding: 1rem;
            background-color: #3B82F6;
            color: white;
          }
          
          .chat-widget-title {
            font-weight: 600;
            margin: 0;
          }
          
          .chat-widget-subtitle {
            font-size: 0.75rem;
            opacity: 0.8;
            margin: 0.25rem 0 0 0;
          }
          
          .chat-widget-messages {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
          }
          
          .chat-widget-message {
            max-width: 80%;
            margin-bottom: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            background-color: #f1f5f9;
          }
          
          .chat-widget-input-container {
            padding: 0.75rem;
            border-top: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
          }
          
          .chat-widget-input {
            flex: 1;
            border: 1px solid #e2e8f0;
            border-radius: 0.25rem;
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }
          
          .chat-widget-send-btn {
            margin-left: 0.5rem;
            background-color: #3B82F6;
            color: white;
            border: none;
            border-radius: 0.25rem;
            padding: 0.5rem;
            cursor: pointer;
          }
          
          @media (prefers-color-scheme: dark) {
            .chat-widget-window {
              background-color: #1e293b;
              border-color: #334155;
              color: white;
            }
            
            .chat-widget-message {
              background-color: #334155;
              color: white;
            }
            
            .chat-widget-input-container {
              border-color: #334155;
            }
            
            .chat-widget-input {
              background-color: #0f172a;
              border-color: #334155;
              color: white;
            }
          }
        </style>
        
        <button class="chat-widget-button" id="chat-widget-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        
        <div class="chat-widget-window" id="chat-widget-window" style="display: none;">
          <div class="chat-widget-header">
            <h3 class="chat-widget-title">Chat Support</h3>
            <p class="chat-widget-subtitle">We typically reply within a few minutes</p>
          </div>
          
          <div class="chat-widget-messages">
            <div class="chat-widget-message">
              Hello! This is a demo of our embeddable chat widget. Feel free to try it out!
            </div>
          </div>
          
          <div class="chat-widget-input-container">
            <input type="text" class="chat-widget-input" placeholder="Type your message...">
            <button class="chat-widget-send-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      `;
      
      container.innerHTML = widgetHtml;
      
      // Add event listeners
      const toggle = document.getElementById('chat-widget-toggle');
      const window = document.getElementById('chat-widget-window');
      const input = document.querySelector('.chat-widget-input');
      const sendBtn = document.querySelector('.chat-widget-send-btn');
      const messages = document.querySelector('.chat-widget-messages');
      
      toggle.addEventListener('click', function() {
        const isVisible = window.style.display !== 'none';
        window.style.display = isVisible ? 'none' : 'flex';
        
        // Change icon
        if (isVisible) {
          toggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          `;
        } else {
          toggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `;
        }
      });
      
      const sendMessage = function() {
        const text = input.value.trim();
        if (!text) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-widget-message';
        userMsg.style.marginLeft = 'auto';
        userMsg.style.backgroundColor = '#3B82F6';
        userMsg.style.color = 'white';
        userMsg.textContent = text;
        messages.appendChild(userMsg);
        
        // Clear input
        input.value = '';
        
        // Scroll to bottom
        messages.scrollTop = messages.scrollHeight;
        
        // Simulate response after delay
        setTimeout(function() {
          const botMsg = document.createElement('div');
          botMsg.className = 'chat-widget-message';
          botMsg.textContent = 'This is a demo response. In a real implementation, this would be from an AI or live agent.';
          messages.appendChild(botMsg);
          
          // Scroll to bottom
          messages.scrollTop = messages.scrollHeight;
        }, 1000);
      };
      
      sendBtn.addEventListener('click', sendMessage);
      
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  };
  
  // Initialize function that will be available globally
  window.initChatWidget = function(options) {
    // Create container for chat widget
    const container = document.createElement('div');
    container.id = 'chat-widget-root';
    document.body.appendChild(container);
    
    // Render the widget
    window.ReactDOM.render(
      window.React.createElement('ChatWidget', options),
      container
    );
    
    console.log('Chat widget initialized with options:', options);
  };
})();