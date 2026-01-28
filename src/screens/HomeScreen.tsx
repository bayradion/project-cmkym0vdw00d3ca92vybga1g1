import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface ChatItemProps {
  contact: Contact;
  onPress: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({ contact, onPress }) => {
  const { getChatByContactId } = useChatStore();
  const chat = getChatByContactId(contact.id);
  const lastMessage = chat?.lastMessage;

  return (
    <View style={styles.chatItemWrapper}>
      <Pressable style={styles.chatItem} onPress={onPress}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.avatar}</Text>
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.timestamp}>
              {lastMessage ? formatTime(lastMessage.timestamp) : ''}
            </Text>
          </View>
          <View style={styles.chatPreview}>
            <Text style={styles.lastMessage} numberOfLines={1}>
              {lastMessage ? lastMessage.text : 'No messages yet'}
            </Text>
            {contact.isOnline && <View style={styles.onlineIndicator} />}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const formatTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (hours < 1) {
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days}d`;
  }
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { contacts } = useChatStore();

  const handleChatPress = (contact: Contact) => {
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            contact={item}
            onPress={() => handleChatPress(item)}
          />
        )}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
  },
  chatList: {
    flex: 1,
  },
  chatItemWrapper: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  chatPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    flex: 1,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: 8,
  },
});

export default HomeScreen;