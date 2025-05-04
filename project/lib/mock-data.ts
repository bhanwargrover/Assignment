// Mock data for the dashboard
export const mockAnalyticsData = {
  totalConversations: 1248,
  activeUsers: 356,
  avgResponseTime: 1.2,
  messagesSent: 15600,
  
  conversationTrends: [
    { date: 'Apr 1', conversations: 145 },
    { date: 'Apr 2', conversations: 132 },
    { date: 'Apr 3', conversations: 156 },
    { date: 'Apr 4', conversations: 178 },
    { date: 'Apr 5', conversations: 190 },
    { date: 'Apr 6', conversations: 184 },
    { date: 'Apr 7', conversations: 203 },
    { date: 'Apr 8', conversations: 221 },
    { date: 'Apr 9', conversations: 210 },
    { date: 'Apr 10', conversations: 230 },
    { date: 'Apr 11', conversations: 242 },
    { date: 'Apr 12', conversations: 252 },
    { date: 'Apr 13', conversations: 267 },
    { date: 'Apr 14', conversations: 258 },
  ],
  
  recentConversations: [
    {
      id: '1',
      user: 'Sarah Johnson',
      lastMessage: 'Thanks for your help!',
      timestamp: '2023-04-14T10:23:00',
      status: 'closed',
      unread: 0
    },
    {
      id: '2',
      user: 'Michael Chen',
      lastMessage: 'When will the new features be available?',
      timestamp: '2023-04-14T09:45:00',
      status: 'active',
      unread: 2
    },
    {
      id: '3',
      user: 'Emily Rodriguez',
      lastMessage: 'I have another question about the pricing...',
      timestamp: '2023-04-14T08:12:00',
      status: 'active',
      unread: 1
    },
    {
      id: '4',
      user: 'David Kim',
      lastMessage: 'Perfect, that solves my issue!',
      timestamp: '2023-04-13T15:30:00',
      status: 'closed',
      unread: 0
    },
    {
      id: '5',
      user: 'Lisa Wong',
      lastMessage: 'Can you explain how to use the new dashboard?',
      timestamp: '2023-04-13T11:15:00',
      status: 'active',
      unread: 3
    },
  ]
};

// Mock conversations list for the conversations page
export const mockConversations = [
  {
    id: '1',
    user: 'Sarah Johnson',
    lastMessage: 'Thanks for your help!',
    timestamp: '2023-04-14T10:23:00',
    status: 'closed',
    unread: 0
  },
  {
    id: '2',
    user: 'Michael Chen',
    lastMessage: 'When will the new features be available?',
    timestamp: '2023-04-14T09:45:00',
    status: 'active',
    unread: 2
  },
  {
    id: '3',
    user: 'Emily Rodriguez',
    lastMessage: 'I have another question about the pricing...',
    timestamp: '2023-04-14T08:12:00',
    status: 'active',
    unread: 1
  },
  {
    id: '4',
    user: 'David Kim',
    lastMessage: 'Perfect, that solves my issue!',
    timestamp: '2023-04-13T15:30:00',
    status: 'closed',
    unread: 0
  },
  {
    id: '5',
    user: 'Lisa Wong',
    lastMessage: 'Can you explain how to use the new dashboard?',
    timestamp: '2023-04-13T11:15:00',
    status: 'active',
    unread: 3
  },
  {
    id: '6',
    user: 'James Wilson',
    lastMessage: 'I need help with my account settings',
    timestamp: '2023-04-12T14:50:00',
    status: 'active',
    unread: 0
  },
  {
    id: '7',
    user: 'Maria Garcia',
    lastMessage: 'The chat widget is not showing on my site',
    timestamp: '2023-04-12T09:32:00',
    status: 'active',
    unread: 0
  },
  {
    id: '8',
    user: 'Alex Turner',
    lastMessage: 'How do I integrate this with my React app?',
    timestamp: '2023-04-11T16:28:00',
    status: 'closed',
    unread: 0
  },
  {
    id: '9',
    user: 'Sophia Martinez',
    lastMessage: 'Is there an API documentation available?',
    timestamp: '2023-04-10T13:15:00',
    status: 'closed',
    unread: 0
  },
  {
    id: '10',
    user: 'John Doe',
    lastMessage: 'I want to upgrade my subscription',
    timestamp: '2023-04-09T10:45:00',
    status: 'closed',
    unread: 0
  },
];

// Mock conversation details
export const mockConversationDetails = {
  id: '2',
  user: 'Michael Chen',
  startTime: '2023-04-14T09:30:00',
  endTime: '2023-04-14T09:45:00',
  duration: 15,
  status: 'active',
  messages: [
    {
      sender: 'user',
      content: 'Hi there! I was wondering if you could help me with your product.',
      timestamp: '2023-04-14T09:30:00'
    },
    {
      sender: 'bot',
      content: 'Hello Michael! I\'d be happy to help. What questions do you have about our product?',
      timestamp: '2023-04-14T09:30:30'
    },
    {
      sender: 'user',
      content: 'I\'m trying to understand the difference between the Pro and Enterprise plans.',
      timestamp: '2023-04-14T09:31:45'
    },
    {
      sender: 'bot',
      content: 'Great question! The Pro plan includes up to 5 team members, 50GB storage, and basic analytics. The Enterprise plan includes unlimited team members, 500GB storage, advanced analytics, and dedicated support. Would you like me to elaborate on any specific feature?',
      timestamp: '2023-04-14T09:32:15'
    },
    {
      sender: 'user',
      content: 'That\'s helpful, thanks. What about API access? Is that available on both plans?',
      timestamp: '2023-04-14T09:33:30'
    },
    {
      sender: 'bot',
      content: 'The Pro plan includes limited API access with rate limits of 1,000 requests per day. The Enterprise plan includes full API access with customizable rate limits based on your needs. Enterprise customers also get access to our premium endpoints for advanced data analytics.',
      timestamp: '2023-04-14T09:34:00'
    },
    {
      sender: 'user',
      content: 'I see. And is there a significant price difference between the two?',
      timestamp: '2023-04-14T09:35:45'
    },
    {
      sender: 'bot',
      content: 'Yes, there is a price difference. The Pro plan is $49/month when billed annually, or $59/month when billed monthly. The Enterprise plan starts at $199/month when billed annually, but the final price depends on your specific needs and usage requirements. Would you like me to connect you with our sales team for a custom quote?',
      timestamp: '2023-04-14T09:36:30'
    },
    {
      sender: 'user',
      content: 'Not at this moment, but I\'m curious about upcoming features. Do you have any new features planned for release soon?',
      timestamp: '2023-04-14T09:38:15'
    },
    {
      sender: 'bot',
      content: 'We\'re actually in the process of releasing several new features in the coming weeks! These include an improved dashboard with customizable widgets, enhanced reporting tools, and better integration options for third-party services. We\'re also working on a mobile app that should be available by the end of the quarter.',
      timestamp: '2023-04-14T09:39:00'
    },
    {
      sender: 'user',
      content: 'That sounds great! When will the new features be available?',
      timestamp: '2023-04-14T09:44:30'
    },
    {
      sender: 'bot',
      content: 'The dashboard improvements and reporting tools are scheduled for release next month. The integration enhancements will follow shortly after, and as mentioned, the mobile app is targeted for the end of this quarter. We\'ll send out detailed announcements via email as each feature becomes available. Would you like me to make sure you\'re subscribed to our product updates?',
      timestamp: '2023-04-14T09:45:00'
    }
  ]
};