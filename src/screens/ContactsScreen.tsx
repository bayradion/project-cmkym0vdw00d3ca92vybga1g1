import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Avatar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type ContactsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function ContactsScreen() {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { contacts, createChat, loadData } = useChatStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const formatLastSeen = (lastSeen?: Date, isOnline?: boolean) => {
    if (isOnline) return 'Online';
    if (!lastSeen) return 'Last seen unknown';
    
    const now = new Date();
    const diff = now.getTime() - lastSeen.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const handleContactPress = (contact: Contact) => {
    createChat(contact.id);
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const renderContactItem = ({ item }: { item: Contact }) => {
    return (
      <View style={styles.cardContainer}>
        <Card 
          style={styles.contactCard} 
          onPress={() => handleContactPress(item)}
        >
          <Card.Content style={styles.cardContent}>
            <View style={styles.avatarContainer}>
              <Avatar.Text 
                size={50} 
                label={item.name.split(' ').map(n => n[0]).join('')}
                style={styles.avatar}
              />
              {item.isOnline && (
                <View style={styles.onlineIndicator} />
              )}
            </View>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.lastSeen}>
                {formatLastSeen(item.lastSeen, item.isOnline)}
              </Text>
            </View>
            
            <View style={styles.actionButtonWrapper}>
              <IconButton
                icon="chat"
                size={24}
                iconColor={theme.colors.primary}
                style={styles.chatButton}
                onPress={() => handleContactPress(item)}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.contactCount}>
          {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
        </Text>
      </View>
      
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        style={styles.contactsList}
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
  contactCount: {
    fontSize: 14,
    color: theme.colors.onPrimary,
    opacity: 0.8,
    marginTop: 4,
  },
  contactsList: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
  },
  cardContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  contactCard: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  actionButtonWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  chatButton: {
    margin: 0,
    backgroundColor: theme.colors.primaryContainer,
  },
});