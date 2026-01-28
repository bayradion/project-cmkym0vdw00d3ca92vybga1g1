import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChatStore, Contact, Chat, Message } from '../types';

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Анна Иванова',
    isOnline: true,
    lastMessage: 'Привет! Как дела?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Петр Петров',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    lastMessage: 'Увидимся завтра',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Мария Сидорова',
    isOnline: true,
    lastMessage: 'Отлично, спасибо!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unreadCount: 1,
  },
  {
    id: '4',
    name: 'Александр Козлов',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
    lastMessage: 'Хорошо, договорились',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 6),
    unreadCount: 0,
  },
];

const mockChats: Chat[] = [
  {
    id: '1',
    contactId: '1',
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
    messages: [
      {
        id: '1',
        text: 'Привет! Как дела?',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isOwn: false,
        contactId: '1',
        status: 'read',
      },
      {
        id: '2',
        text: 'Привет! Всё хорошо, а у тебя?',
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        isOwn: true,
        contactId: '1',
        status: 'read',
      },
      {
        id: '3',
        text: 'Тоже отлично! Планы на выходные есть?',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isOwn: false,
        contactId: '1',
        status: 'delivered',
      },
    ],
  },
  {
    id: '2',
    contactId: '2',
    lastActivity: new Date(Date.now() - 1000 * 60 * 60),
    messages: [
      {
        id: '4',
        text: 'Не забудь про встречу завтра',
        timestamp: new Date(Date.now() - 1000 * 60 * 65),
        isOwn: true,
        contactId: '2',
        status: 'read',
      },
      {
        id: '5',
        text: 'Увидимся завтра',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isOwn: false,
        contactId: '2',
        status: 'read',
      },
    ],
  },
];

export const useChatStore = create<ChatStore>((set, get) => ({
  contacts: mockContacts,
  chats: mockChats,
  currentUser: {
    id: 'me',
    name: 'Я',
  },

  addMessage: (contactId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isOwn: true,
      contactId,
      status: 'sent',
    };

    set((state) => {
      const existingChatIndex = state.chats.findIndex(
        (chat) => chat.contactId === contactId
      );

      let updatedChats = [...state.chats];

      if (existingChatIndex !== -1) {
        updatedChats[existingChatIndex] = {
          ...updatedChats[existingChatIndex],
          messages: [...updatedChats[existingChatIndex].messages, newMessage],
          lastActivity: new Date(),
        };
      } else {
        updatedChats.push({
          id: Date.now().toString(),
          contactId,
          messages: [newMessage],
          lastActivity: new Date(),
        });
      }

      const updatedContacts = state.contacts.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              lastMessage: text,
              lastMessageTime: new Date(),
            }
          : contact
      );

      return {
        chats: updatedChats,
        contacts: updatedContacts,
      };
    });
  },

  markAsRead: (contactId: string) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === contactId
          ? { ...contact, unreadCount: 0 }
          : contact
      ),
    }));
  },

  updateContact: (contactId: string, updates: Partial<Contact>) => {
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === contactId ? { ...contact, ...updates } : contact
      ),
    }));
  },

  getChat: (contactId: string) => {
    return get().chats.find((chat) => chat.contactId === contactId);
  },

  getChatMessages: (contactId: string) => {
    const chat = get().getChat(contactId);
    return chat ? chat.messages : [];
  },
}));