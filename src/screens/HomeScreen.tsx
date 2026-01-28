import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, List, Avatar, Badge, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useChatStore } from '../store/chatStore';
import { theme, spacing } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { contacts, markAsRead } = useChatStore();

  const handleChatPress = (contact: Contact) => {
    markAsRead(contact.id);
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}м`;
    }
    if (hours < 24) {
      return `${hours}ч`;
    }
    return date.toLocaleDateString();
  };

  const renderChatItem = ({ item }: { item: Contact }) => (
    <List.Item
      title={item.name}
      description={item.lastMessage || 'Нет сообщений'}
      onPress={() => handleChatPress(item)}
      left={() => (
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={48}
            label={item.name.split(' ').map(n => n[0]).join('')}
            style={styles.avatar}
          />
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
      )}
      right={() => (
        <View style={styles.rightContainer}>
          <Text variant="bodySmall" style={styles.timeText}>
            {formatTime(item.lastMessageTime)}
          </Text>
          {item.unreadCount > 0 && (
            <Badge style={styles.badge}>{item.unreadCount}</Badge>
          )}
        </View>
      )}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="WhatsApp" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      
      <FlatList
        data={contacts.sort((a, b) => {
          const timeA = a.lastMessageTime?.getTime() || 0;
          const timeB = b.lastMessageTime?.getTime() || 0;
          return timeB - timeA;
        })}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        style={styles.list}
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
  },
  headerTitle: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
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
  rightContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 48,
    paddingVertical: spacing.xs,
  },
  timeText: {
    color: theme.colors.onSurfaceVariant,
  },
  badge: {
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;