export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  contactId: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastSeen?: Date;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
}

export interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  lastActivity: Date;
}

export type RootStackParamList = {
  Main: undefined;
  Chat: {
    contactId: string;
    contactName: string;
  };
};

export type TabParamList = {
  Chats: undefined;
  Contacts: undefined;
  Profile: undefined;
};

export interface ChatStore {
  contacts: Contact[];
  chats: Chat[];
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  addMessage: (contactId: string, text: string) => void;
  markAsRead: (contactId: string) => void;
  updateContact: (contactId: string, updates: Partial<Contact>) => void;
  getChat: (contactId: string) => Chat | undefined;
  getChatMessages: (contactId: string) => Message[];
}