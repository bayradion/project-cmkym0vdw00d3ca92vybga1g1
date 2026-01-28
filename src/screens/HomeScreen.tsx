import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Avatar, Badge } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Chat } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { chats, contacts, loadData } = useChatStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (days === 1) {
      return 'Yesterday';
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { 
        day: '2-digit', 
        month: '2-digit' 
      });
    }
  };

  const getContactName = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    return contact?.name || 'Unknown Contact';
  };

  const handleChatPress = (chat: Chat) => {
    const contactName = getContactName(chat.contactId);
    navigation.navigate('Chat', {
      contactId: chat.contactId,
      contactName,
    });
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    const contactName = getContactName(item.contactId);
    const contact = contacts.find(c => c.id === item.contactId);
    const lastMessage = item.lastMessage;

    return (
      <View style={styles.cardContainer}>
        <Card 
          style={styles.chatCard} 
          onPress={() => handleChatPress(item)}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Text 
                size={50} 
                label={contactName.split(' ').map(n => n[0]).join('')}
                style={styles.avatar}
              />
              {contact?.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
            </View>
            
            <View style={styles.chatInfo}>
              <View style={styles.chatHeader}>
                <Text style={styles.contactName} numberOfLines={1}>
                  {contactName}
                </Text>
                {lastMessage && (
                  <Text style={styles.timestamp}>
                    {formatTime(lastMessage.timestamp)}
                  </Text>
                )}
              </View>
              
              <View style={styles.messagePreview}>
                {lastMessage ? (
                  <Text style={styles.lastMessage} numberOfLines={1}>
                    {lastMessage.isOwn ? 'You: ' : ''}{lastMessage.text}
                  </Text>
                ) : (
                  <Text style={styles.noMessages}>No messages yet</Text>
                )}
                
                {item.unreadCount > 0 && (
                  <Badge style={styles.unreadBadge}>
                    {item.unreadCount}
                  </Badge>
                )}
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
  },
  chatList: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  chatCard: {
    backgroundColor: theme.colors.surface,
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
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.surface,
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
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 8,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    flex: 1,
  },
  noMessages: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: theme.colors.primary,
    marginLeft: 8,
  },
});