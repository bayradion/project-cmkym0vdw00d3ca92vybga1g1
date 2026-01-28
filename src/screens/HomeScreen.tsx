import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
} from 'react-native';
import { Card, Avatar, Title, Caption } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface ChatListItemProps {
  contact: Contact;
  onPress: () => void;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ contact, onPress }) => {
  const { getMessagesByContactId } = useChatStore();
  const messages = getMessagesByContactId(contact.id);
  const lastMessage = messages[messages.length - 1];

  return (
    <View style={styles.cardWrapper}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Text 
                size={50} 
                label={contact.avatar} 
                style={styles.avatar}
              />
              {contact.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <Title style={styles.contactName}>{contact.name}</Title>
                {lastMessage && (
                  <Caption style={styles.timestamp}>
                    {lastMessage.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Caption>
                )}
              </View>
              <Caption style={styles.lastMessage}>
                {lastMessage ? lastMessage.text : 'No messages yet'}
              </Caption>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { contacts } = useChatStore();

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const renderChatItem = ({ item }: { item: Contact }) => (
    <ChatListItem
      contact={item}
      onPress={() => handleContactPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pressable: {
    borderRadius: 12,
  },
  card: {
    backgroundColor: theme.colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    backgroundColor: theme.colors.primaryContainer,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
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
  lastMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    numberOfLines: 1,
  },
});

export default HomeScreen;