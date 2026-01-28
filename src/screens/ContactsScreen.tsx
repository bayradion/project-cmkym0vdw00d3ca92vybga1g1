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

type ContactsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface ContactItemProps {
  contact: Contact;
  onPress: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, onPress }) => {
  return (
    <View style={styles.contactItemWrapper}>
      <Pressable style={styles.contactItem} onPress={onPress}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.avatar}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactStatus}>
            {contact.isOnline ? 'Online' : `Last seen ${contact.lastSeen}`}
          </Text>
        </View>
        {contact.isOnline && <View style={styles.onlineIndicator} />}
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Contacts</Text>
        <Text style={styles.headerSubtitle}>{contacts.length} contacts</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactItem
            contact={item}
            onPress={() => handleContactPress(item)}
          />
        )}
        style={styles.contactsList}
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
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.onPrimary,
    opacity: 0.8,
    marginTop: 4,
  },
  contactsList: {
    flex: 1,
  },
  contactItemWrapper: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  contactItem: {
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
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  contactStatus: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  onlineIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
});

export default ContactsScreen;