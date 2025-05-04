// Mock AI responses
const knowledgeBase = [
  {
    keywords: ['pricing', 'cost', 'subscription', 'plan', 'pay'],
    response: "Our pricing plans start at $9.99/month for the Basic plan, $19.99/month for Pro, and $49.99/month for Enterprise. Each plan offers different features and support levels. Would you like me to explain the differences in detail?"
  },
  {
    keywords: ['help', 'support', 'contact', 'email', 'phone', 'reach'],
    response: "You can reach our support team via email at support@example.com or by phone at +1-800-123-4567 during business hours (9 AM - 5 PM EST). For urgent issues, we also offer live chat support for our Pro and Enterprise customers."
  },
  {
    keywords: ['feature', 'functionality', 'can', 'able', 'do'],
    response: "Our platform offers a wide range of features including real-time chat, AI-powered responses, analytics dashboard, custom branding, multiple user roles, and integrations with popular platforms. What specific functionality are you interested in learning more about?"
  },
  {
    keywords: ['install', 'setup', 'implement', 'add', 'integrate', 'code'],
    response: "Installing our chat widget is simple! Just add the following script tag to your website's HTML: <script src=\"https://cdn.example.com/chat-widget.js\"></script>. After adding the script, you can customize the widget's appearance and behavior through our dashboard."
  },
  {
    keywords: ['account', 'login', 'sign', 'password', 'forgot'],
    response: "You can manage your account at dashboard.example.com. If you've forgotten your password, you can use the 'Forgot Password' link on the login page to reset it. For account-related issues, please contact our support team."
  }
];

// Function to generate AI responses
export async function getAIResponse(message: string): Promise<string> {
  // In a real implementation, this would call an AI API like Gemini
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerCaseMessage = message.toLowerCase();
      
      // Check for matches in knowledge base
      for (const item of knowledgeBase) {
        if (item.keywords.some(keyword => lowerCaseMessage.includes(keyword))) {
          resolve(item.response);
          return;
        }
      }
      
      // Default response if no matches
      resolve("Thank you for your message! I don't have specific information about that yet. Would you like me to connect you with a human agent for more assistance?");
    }, 500);
  });
}