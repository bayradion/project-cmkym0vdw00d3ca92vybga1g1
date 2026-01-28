import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, Avatar, Divider } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const { contacts, getMessagesByContactId } = useChatStore();

  const handleContactPress = (contact: Contact) => {
    if (isFocused) {
      navigation.navigate('Chat', {
        contactId: contact.id,
        contactName: contact.name,
      });
    }
  };

  const getLastMessage = (contactId: string) => {
    const messages = getMessagesByContactId(contactId);
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const contactsWithMessages = useMemo(() => {
    return contacts.map(contact => ({
      ...contact,
      lastMessage: getLastMessage(contact.id)
    }));
  }, [contacts, getMessagesByContactId]);

  const renderContact = ({ item, index }: { item: Contact & { lastMessage: any }; index: number }) => {
    return (
      <View key={`${item.id}-${index}`}>
        <View style={styles.contactWrapper}>
          <Pressable
            style={styles.contactItem}
            onPress={() => handleContactPress(item)}
          >
            <Avatar.Text
              size={50}
              label={item.avatar || item.name.charAt(0)}
              style={styles.avatar}
            />
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              {item.lastMessage ? (
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.lastMessage.text}
                </Text>
              ) : (
                <Text style={styles.noMessages}>No messages yet</Text>
              )}
            </View>
            <View style={styles.rightInfo}>
              {item.lastMessage && (
                <Text style={styles.timestamp}>
                  {formatTime(item.lastMessage.timestamp)}
                </Text>
              )}
              {item.isOnline && <View style={styles.onlineIndicator} />}
            </View>
          </Pressable>
        </View>
        <Divider />
      </View>
    );
  };

  const getItemLayout = (data: any, index: number) => ({
    length: 72, // Approximate height of each contact item
    offset: 72 * index,
    index,
  });

  if (!isFocused) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contactsWithMessages}
        renderItem={renderContact}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contactWrapper: {
    backgroundColor: theme.colors.surface,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  noMessages: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  rightInfo: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
});

export default HomeScreen;