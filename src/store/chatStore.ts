import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Chat, Contact, Message, User } from '../types';

interface ChatState {
  chats: Chat[];
  contacts: Contact[];
  user: User | null;
  isLoading: boolean;
  
  // Actions
  loadData: () => Promise<void>;
  saveData: () => Promise<void>;
  
  // Contact actions
  addContact: (contact: Omit<Contact, 'id'>) => void;
  
  // Chat actions
  createChat: (contactId: string) => string;
  getChat: (contactId: string) => Chat | undefined;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  markChatAsRead: (chatId: string) => void;
  
  // User actions
  setUser: (user: User) => void;
}

// Sample data
const sampleContacts: Contact[] = [
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
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '4',
    name: 'Diana Wilson',
    isOnline: true,
  },
  {
    id: '5',
    name: 'Eva Martinez',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

const sampleChats: Chat[] = [
  {
    id: 'chat-1',
    contactId: '1',
    messages: [
      {
        id: 'msg-1',
        text: 'Hey! How are you doing?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isOwn: false,
        contactId: '1',
      },
      {
        id: 'msg-2',
        text: 'I\'m good, thanks! How about you?',
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
        isOwn: true,
      },
      {
        id: 'msg-3',
        text: 'Great! Want to meet up for coffee later?',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isOwn: false,
        contactId: '1',
      },
    ],
    lastMessage: {
      id: 'msg-3',
      text: 'Great! Want to meet up for coffee later?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
      contactId: '1',
    },
    unreadCount: 1,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: 'chat-2',
    contactId: '2',
    messages: [
      {
        id: 'msg-4',
        text: 'Don\'t forget about the meeting tomorrow',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        isOwn: false,
        contactId: '2',
      },
      {
        id: 'msg-5',
        text: 'Thanks for the reminder!',
        timestamp: new Date(Date.now() - 1000 * 60 * 100),
        isOwn: true,
      },
    ],
    lastMessage: {
      id: 'msg-5',
      text: 'Thanks for the reminder!',
      timestamp: new Date(Date.now() - 1000 * 60 * 100),
      isOwn: true,
    },
    unreadCount: 0,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  contacts: [],
  user: null,
  isLoading: false,

  loadData: async () => {
    set({ isLoading: true });
    
    try {
      const storedChats = await AsyncStorage.getItem('chats');
      const storedContacts = await AsyncStorage.getItem('contacts');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedChats && storedContacts) {
        const parsedChats = JSON.parse(storedChats).map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          lastMessage: chat.lastMessage ? {
            ...chat.lastMessage,
            timestamp: new Date(chat.lastMessage.timestamp),
          } : undefined,
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        }));

        const parsedContacts = JSON.parse(storedContacts).map((contact: any) => ({
          ...contact,
          lastSeen: contact.lastSeen ? new Date(contact.lastSeen) : undefined,
        }));

        set({
          chats: parsedChats,
          contacts: parsedContacts,
          user: storedUser ? JSON.parse(storedUser) : null,
        });
      } else {
        // Initialize with sample data
        set({
          contacts: sampleContacts,
          chats: sampleChats,
          user: { id: 'user-1', name: 'Me' },
        });
        
        // Save sample data
        await get().saveData();
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Fallback to sample data
      set({
        contacts: sampleContacts,
        chats: sampleChats,
        user: { id: 'user-1', name: 'Me' },
      });
    } finally {
      set({ isLoading: false });
    }
  },

  saveData: async () => {
    const { chats, contacts, user } = get();
    
    try {
      await AsyncStorage.setItem('chats', JSON.stringify(chats));
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  },

  addContact: (contactData) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString(),
    };
    
    set(state => ({
      contacts: [...state.contacts, newContact]
    }));
    
    get().saveData();
  },

  createChat: (contactId) => {
    const { chats } = get();
    const existingChat = chats.find(chat => chat.contactId === contactId);
    
    if (existingChat) {
      return existingChat.id;
    }
    
    const newChat: Chat = {
      id: `chat-${Date.now()}`,
      contactId,
      messages: [],
      unreadCount: 0,
      createdAt: new Date(),
    };
    
    set(state => ({
      chats: [...state.chats, newChat]
    }));
    
    get().saveData();
    return newChat.id;
  },

  getChat: (contactId) => {
    const { chats } = get();
    return chats.find(chat => chat.contactId === contactId);
  },

  addMessage: (chatId, messageData) => {
    const newMessage: Message = {
      ...messageData,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    };

    set(state => ({
      chats: state.chats.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, newMessage];
          return {
            ...chat,
            messages: updatedMessages,
            lastMessage: newMessage,
            unreadCount: newMessage.isOwn ? chat.unreadCount : chat.unreadCount + 1,
          };
        }
        return chat;
      })
    }));

    get().saveData();
  },

  markChatAsRead: (chatId) => {
    set(state => ({
      chats: state.chats.map(chat =>
        chat.id === chatId
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    }));

    get().saveData();
  },

  setUser: (user) => {
    set({ user });
    get().saveData();
  },
}));