import React from 'react';
import { View, FlatList, StyleSheet, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type ContactsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { contacts } = useChatStore();

  const startChat = (contact: Contact) => {
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  const renderContactItem = ({ item }: { item: Contact }) => {
    return (
      <View style={styles.contactItemWrapper}>
        <Pressable
          style={styles.contactItem}
          onPress={() => startChat(item)}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{item.avatar}</Text>
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.lastSeen}>
              {item.isOnline ? 'Online' : `Last seen ${item.lastSeen}`}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
    width: 50,
    height: 50,
    textAlign: 'center',
    lineHeight: 50,
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 25,
    overflow: 'hidden',
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
});

export default ContactsScreen;