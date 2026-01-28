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
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isOwn,
      contactId,
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  getContactById: (id: string) => {
    const state = get();
    return state.contacts.find(contact => contact.id === id);
  },

  getChatByContactId: (contactId: string) => {
    const state = get();
    const messages = state.messages.filter(message => message.contactId === contactId);
    const lastMessage = messages[messages.length - 1];
    
    return {
      id: contactId,
      contactId,
      messages,
      lastMessage,
    };
  },

  getMessagesByContactId: (contactId: string) => {
    const state = get();
    return state.messages.filter(message => message.contactId === contactId);
  },
}));