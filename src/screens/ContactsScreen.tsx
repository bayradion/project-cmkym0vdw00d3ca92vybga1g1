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

type ContactsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface ContactItemProps {
  contact: Contact;
  onPress: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onPress }) => {
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
              <Title style={styles.contactName}>{contact.name}</Title>
              <Caption style={styles.lastSeen}>
                {contact.isOnline ? 'Online' : `Last seen ${contact.lastSeen}`}
              </Caption>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
};

const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { contacts } = useChatStore();

  const handleContactPress = (contact: Contact) => {
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const renderContactItem = ({ item }: { item: Contact }) => (
    <ContactItem
      contact={item}
      onPress={() => handleContactPress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Contacts</Title>
        <Caption style={styles.contactCount}>{contacts.length} contacts</Caption>
      </View>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
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
  header: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  contactCount: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
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
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  lastSeen: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
});

export default ContactsScreen;