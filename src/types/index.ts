export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  contactId?: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  lastSeen?: Date;
  isOnline?: boolean;
}

export interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
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