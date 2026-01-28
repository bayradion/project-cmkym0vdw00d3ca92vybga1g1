import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Chat, Contact, Message } from '../types';

interface ChatStore {
  chats: Chat[];
  contacts: Contact[];
  loadData: () => Promise<void>;
  getChat: (contactId: string) => Chat | undefined;
  createChat: (contactId: string) => string;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
}

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Bob Smith',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '3',
    name: 'Charlie Brown',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Diana Prince',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '5',
    name: 'Eve Wilson',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const generateMockChats = (): Chat[] => {
  const chats: Chat[] = [];
  
  // Create some initial chats
  const chatData = [
    {
      contactId: '1',
      messages: [
        { text: 'Hey! How are you?', isOwn: false, contactId: '1' },
        { text: 'I\'m good, thanks! How about you?', isOwn: true },
        { text: 'Great! Are we still on for tonight?', isOwn: false, contactId: '1' },
      ],
    },
    {
      contactId: '2',
      messages: [
        { text: 'Did you see the game last night?', isOwn: false, contactId: '2' },
        { text: 'Yes! What a match!', isOwn: true },
      ],
    },
    {
      contactId: '3',
      messages: [
        { text: 'Thanks for your help today', isOwn: true },
        { text: 'No problem at all!', isOwn: false, contactId: '3' },
      ],
    },
  ];

  chatData.forEach(({ contactId, messages }, index) => {
    const chatId = `chat_${index + 1}`;
    const chatMessages: Message[] = messages.map((msg, msgIndex) => ({
      id: `${chatId}_msg_${msgIndex + 1}`,
      text: msg.text,
      timestamp: new Date(Date.now() - (messages.length - msgIndex) * 1000 * 60 * 10),
      isOwn: msg.isOwn,
      contactId: msg.contactId,
    }));

    const lastMessage = chatMessages[chatMessages.length - 1];
    
    chats.push({
      id: chatId,
      contactId,
      messages: chatMessages,
      lastMessage,
      unreadCount: lastMessage && !lastMessage.isOwn ? Math.floor(Math.random() * 3) + 1 : 0,
      createdAt: new Date(Date.now() - (chatMessages.length * 1000 * 60 * 10)),
    });
  });

  return chats.sort((a, b) => {
    const aTime = a.lastMessage?.timestamp || a.createdAt;
    const bTime = b.lastMessage?.timestamp || b.createdAt;
    return bTime.getTime() - aTime.getTime();
  });
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  contacts: [],
  
  loadData: async () => {
    try {
      // In a real app, this would load from AsyncStorage
      // For demo purposes, we'll use mock data
      set({
        contacts: mockContacts,
        chats: generateMockChats(),
      });
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to mock data
      set({
        contacts: mockContacts,
        chats: generateMockChats(),
      });
    }
  },

  getChat: (contactId: string) => {
    const { chats } = get();
    return chats.find(chat => chat.contactId === contactId);
  },

  createChat: (contactId: string) => {
    const { chats, contacts } = get();
    
    // Check if chat already exists
    const existingChat = chats.find(chat => chat.contactId === contactId);
    if (existingChat) {
      return existingChat.id;
    }

    // Check if contact exists
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) {
      console.warn('Contact not found:', contactId);
      return '';
    }

    const newChatId = generateId();
    const newChat: Chat = {
      id: newChatId,
      contactId,
      messages: [],
      unreadCount: 0,
      createdAt: new Date(),
    };

    set(state => ({
      chats: [newChat, ...state.chats],
    }));

    return newChatId;
  },

  addMessage: (chatId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      id: generateId(),
      timestamp: new Date(),
      ...messageData,
    };

    set(state => ({
      chats: state.chats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, newMessage];
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: newMessage,
            unreadCount: newMessage.isOwn ? 0 : chat.unreadCount + 1,
          };
        }
        return chat;
      }).sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || a.createdAt;
        const bTime = b.lastMessage?.timestamp || b.createdAt;
        return bTime.getTime() - aTime.getTime();
      }),
    }));
  },
}));