export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
  contactId: string;
}

export interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessage?: Message;
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