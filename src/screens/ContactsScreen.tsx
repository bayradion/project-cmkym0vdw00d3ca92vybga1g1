import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, List, Avatar, Text, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useChatStore } from '../store/chatStore';
import { theme, spacing } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type ContactsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const ContactsScreen = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { contacts } = useChatStore();

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const formatLastSeen = (date: Date | undefined, isOnline: boolean) => {
    if (isOnline) return 'В сети';
    if (!date) return 'Давно';
    
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      return 'Недавно';
    }
    if (hours < 24) {
      return `${hours} ч. назад`;
    }
    const days = Math.floor(hours / 24);
    return `${days} дн. назад`;
  };

  const renderContact = ({ item }: { item: Contact }) => (
    <List.Item
      title={item.name}
      description={formatLastSeen(item.lastSeen, item.isOnline)}
      onPress={() => handleContactPress(item)}
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
        <List.Icon icon="chat" color={theme.colors.primary} />
      )}
      style={styles.listItem}
    />
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Контакты" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="account-plus" onPress={() => {}} />
      </Appbar.Header>

      <View style={styles.content}>
        <List.Item
          title="Новая группа"
          left={() => (
            <Avatar.Icon
              size={48}
              icon="account-group"
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            />
          )}
          style={styles.listItem}
          onPress={() => {}}
        />
        
        <Divider style={styles.divider} />
        
        <Text variant="titleSmall" style={styles.sectionTitle}>
          Все контакты ({contacts.length})
        </Text>
        
        <FlatList
          data={contacts.sort((a, b) => a.name.localeCompare(b.name))}
          keyExtractor={(item) => item.id}
          renderItem={renderContact}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  content: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
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
  divider: {
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '600',
  },
});

export default ContactsScreen;