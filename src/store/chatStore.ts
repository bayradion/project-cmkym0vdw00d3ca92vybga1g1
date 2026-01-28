import { create } from 'zustand';
import type { Contact, Message, Chat } from '../types';

interface ChatStore {
  contacts: Contact[];
  chats: Chat[];
  messages: Message[];
  addMessage: (contactId: string, text: string, isOwn: boolean) => void;
  getContactById: (id: string) => Contact | undefined;
  getChatByContactId: (contactId: string) => Chat | undefined;
  getMessagesByContactId: (contactId: string) => Message[];
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '👨',
    lastSeen: '2 minutes ago',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '👩',
    lastSeen: '1 hour ago',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: '👨‍💼',
    lastSeen: 'yesterday',
    isOnline: false,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey there! How are you doing?',
    timestamp: new Date(Date.now() - 60000),
    isOwn: false,
    contactId: '1',
  },
  {
    id: '2',
    text: 'I\'m doing great, thanks! How about you?',
    timestamp: new Date(Date.now() - 30000),
    isOwn: true,
    contactId: '1',
  },
  {
    id: '3',
    text: 'Hello! Are we still meeting today?',
    timestamp: new Date(Date.now() - 120000),
    isOwn: false,
    contactId: '2',
  },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  contacts: mockContacts,
  chats: [],
  messages: mockMessages,

  addMessage: (contactId: string, text: string, isOwn: boolean) => {
    if (!contactId || typeof text !== 'string' || text.trim() === '') {
      console.warn('Invalid message parameters');
      return;
    }

    try {
      const newMessage: Message = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: text.trim(),
        timestamp: new Date(),
        isOwn: Boolean(isOwn),
        contactId: contactId.toString(),
      };

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    } catch (error) {
      console.warn('Error adding message:', error);
    }
  },

  getContactById: (id: string) => {
    if (!id) return undefined;
    
    try {
      return get().contacts.find(contact => contact?.id === id);
    } catch (error) {
      console.warn('Error getting contact by id:', error);
      return undefined;
    }
  },

  getChatByContactId: (contactId: string) => {
    if (!contactId) return undefined;
    
    try {
      const messages = get().getMessagesByContactId(contactId);
      const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : undefined;
      
      return {
        id: contactId,
        contactId,
        messages: messages || [],
        lastMessage,
      };
    } catch (error) {
      console.warn('Error getting chat by contact id:', error);
      return undefined;
    }
  },

  getMessagesByContactId: (contactId: string) => {
    if (!contactId) return [];
    
    try {
      const allMessages = get().messages || [];
      return allMessages.filter(message => message?.contactId === contactId);
    } catch (error) {
      console.warn('Error getting messages by contact id:', error);
      return [];
    }
  },
}));