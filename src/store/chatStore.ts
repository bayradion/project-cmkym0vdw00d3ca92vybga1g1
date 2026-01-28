import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Chat, Contact, Message } from '../types';

interface ChatState {
  chats: Chat[];
  contacts: Contact[];
  currentUser: Contact | null;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  createChat: (contactId: string) => string;
  getChat: (contactId: string) => Chat | undefined;
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
}

// Mock data
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: 'Bob Smith',
    isOnline: false,
    lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
  },
  {
    id: '3',
    name: 'Carol Williams',
    isOnline: true,
    lastSeen: new Date(),
  },
];

const mockChats: Chat[] = [
  {
    id: 'chat-1',
    contactId: '1',
    unreadCount: 2,
    messages: [
      {
        id: 'msg-1',
        text: 'Hey there! How are you?',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        isOwn: false,
        contactId: '1',
      },
      {
        id: 'msg-2',
        text: 'I\'m doing great, thanks! How about you?',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isOwn: true,
      },
      {
        id: 'msg-3',
        text: 'Awesome! Want to grab coffee later?',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        isOwn: false,
        contactId: '1',
      },
    ],
    lastMessage: {
      id: 'msg-3',
      text: 'Awesome! Want to grab coffee later?',
      timestamp: new Date(Date.now() - 1800000),
      isOwn: false,
      contactId: '1',
    },
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  chats: mockChats,
  contacts: mockContacts,
  currentUser: {
    id: 'me',
    name: 'Me',
    isOnline: true,
  },

  addMessage: (chatId, messageData) => {
    const newMessage: Message = {
      ...messageData,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              lastMessage: newMessage,
              unreadCount: newMessage.isOwn ? chat.unreadCount : chat.unreadCount + 1,
            }
          : chat
      ),
    }));

    get().saveData();
  },

  createChat: (contactId) => {
    const existingChat = get().chats.find(chat => chat.contactId === contactId);
    if (existingChat) {
      return existingChat.id;
    }

    const newChatId = `chat-${Date.now()}-${contactId}`;
    const newChat: Chat = {
      id: newChatId,
      contactId,
      messages: [],
      unreadCount: 0,
    };

    set((state) => ({
      chats: [...state.chats, newChat],
    }));

    get().saveData();
    return newChatId;
  },

  getChat: (contactId) => {
    return get().chats.find(chat => chat.contactId === contactId);
  },

  loadData: async () => {
    try {
      const storedChats = await AsyncStorage.getItem('chats');
      const storedContacts = await AsyncStorage.getItem('contacts');
      
      if (storedChats) {
        const parsedChats = JSON.parse(storedChats);
        // Convert timestamp strings back to Date objects
        parsedChats.forEach((chat: Chat) => {
          chat.messages.forEach((message: Message) => {
            message.timestamp = new Date(message.timestamp);
          });
          if (chat.lastMessage) {
            chat.lastMessage.timestamp = new Date(chat.lastMessage.timestamp);
          }
        });
        
        set({ chats: parsedChats });
      }
      
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        parsedContacts.forEach((contact: Contact) => {
          if (contact.lastSeen) {
            contact.lastSeen = new Date(contact.lastSeen);
          }
        });
        
        set({ contacts: parsedContacts });
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    }
  },

  saveData: async () => {
    try {
      const { chats, contacts } = get();
      await AsyncStorage.setItem('chats', JSON.stringify(chats));
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Failed to save data to storage:', error);
    }
  },
}));