import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Chat, Contact, Message, User } from '../types';

interface ChatState {
  chats: Chat[];
  contacts: Contact[];
  currentUser: User | null;
  getChat: (contactId: string) => Chat | undefined;
  createChat: (contactId: string) => string;
  addMessage: (chatId: string, messageData: Omit<Message, 'id' | 'timestamp'>) => void;
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
}

// Mock data for demonstration
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
    name: 'Carol Davis',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '4',
    name: 'David Wilson',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Eva Brown',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const mockUser: User = {
  id: 'current-user',
  name: 'Me',
};

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  contacts: mockContacts,
  currentUser: mockUser,

  getChat: (contactId: string) => {
    const { chats } = get();
    return chats.find(chat => chat.contactId === contactId);
  },

  createChat: (contactId: string) => {
    const { chats } = get();
    const existingChat = chats.find(chat => chat.contactId === contactId);
    
    if (existingChat) {
      return existingChat.id;
    }

    const newChat: Chat = {
      id: generateId(),
      contactId,
      messages: [],
      unreadCount: 0,
      createdAt: new Date(),
    };

    set(state => ({
      chats: [...state.chats, newChat],
    }));

    return newChat.id;
  },

  addMessage: (chatId: string, messageData) => {
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
            unreadCount: messageData.isOwn ? chat.unreadCount : chat.unreadCount + 1,
          };
        }
        return chat;
      }),
    }));

    // Auto-save after adding a message
    get().saveData();
  },

  loadData: async () => {
    try {
      const storedChats = await AsyncStorage.getItem('@chats');
      if (storedChats) {
        const parsedChats = JSON.parse(storedChats);
        // Convert date strings back to Date objects
        const chats = parsedChats.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          lastMessage: chat.lastMessage ? {
            ...chat.lastMessage,
            timestamp: new Date(chat.lastMessage.timestamp),
          } : undefined,
        }));
        
        set({ chats });
      } else {
        // Initialize with some sample chats for demo
        const sampleChats: Chat[] = [
          {
            id: generateId(),
            contactId: '1',
            messages: [
              {
                id: generateId(),
                text: 'Hey there! How are you?',
                timestamp: new Date(Date.now() - 1000 * 60 * 60),
                isOwn: false,
                contactId: '1',
              },
              {
                id: generateId(),
                text: 'Hi Alice! I\'m doing great, thanks for asking!',
                timestamp: new Date(Date.now() - 1000 * 60 * 50),
                isOwn: true,
              },
            ],
            unreadCount: 0,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
          },
          {
            id: generateId(),
            contactId: '2',
            messages: [
              {
                id: generateId(),
                text: 'Don\'t forget about the meeting tomorrow!',
                timestamp: new Date(Date.now() - 1000 * 60 * 30),
                isOwn: false,
                contactId: '2',
              },
            ],
            unreadCount: 1,
            createdAt: new Date(Date.now() - 1000 * 60 * 60),
          },
        ];

        // Update lastMessage for each chat
        const chatsWithLastMessage = sampleChats.map(chat => ({
          ...chat,
          lastMessage: chat.messages[chat.messages.length - 1],
        }));

        set({ chats: chatsWithLastMessage });
      }
    } catch (error) {
      console.error('Failed to load chat data:', error);
    }
  },

  saveData: async () => {
    try {
      const { chats } = get();
      await AsyncStorage.setItem('@chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Failed to save chat data:', error);
    }
  },
}));