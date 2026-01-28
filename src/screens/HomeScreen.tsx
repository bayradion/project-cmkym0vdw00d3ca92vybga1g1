import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, ListRenderItem } from 'react-native';
import { Surface, Avatar, Divider, Pressable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { Chat, HomeScreenNavigationProp } from '../types';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { chats, contacts } = useChatStore();

  const handleChatPress = useCallback((chat: Chat) => {
    const contact = contacts.find(c => c.id === chat.contactId);
    navigation.navigate('Chat', {
      contactId: chat.contactId,
      contactName: contact?.name || 'Unknown',
    });
  }, [navigation, contacts]);

  const renderChatItem: ListRenderItem<Chat> = useCallback(({ item }) => {
    const contact = contacts.find(c => c.id === item.contactId);
    const lastMessage = item.messages[item.messages.length - 1];

    if (!contact) {
      return null;
    }

    return (
      <View key={`chat-wrapper-${item.id}`}>
        <Surface style={styles.chatItem} elevation={0}>
          <Pressable
            style={styles.chatPressable}
            onPress={() => handleChatPress(item)}
            android_ripple={{ color: theme.colors.primary, borderless: false }}
          >
            <Avatar.Text 
              size={50} 
              label={contact.name.charAt(0).toUpperCase()}
              style={styles.avatar}
            />
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.contactName} numberOfLines={1}>
                  {contact.name}
                </Text>
                <Text style={styles.timestamp}>
                  {lastMessage ? new Date(lastMessage.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : ''}
                </Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={2}>
                {lastMessage?.text || 'No messages'}
              </Text>
            </View>
          </Pressable>
        </Surface>
        <Divider />
      </View>
    );
  }, [contacts, handleChatPress]);

  const keyExtractor = useCallback((item: Chat) => `chat-${item.id}`, []);

  const getItemLayout = useCallback((data: Chat[] | null | undefined, index: number) => ({
    length: 72,
    offset: 72 * index,
    index,
  }), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
      </View>
      {chats.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No chats yet</Text>
          <Text style={styles.emptySubtext}>Start a conversation from Contacts</Text>
        </View>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          style={styles.chatList}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 0,
  },
  chatPressable: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  chatContent: {
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
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginLeft: 8,
  },
  lastMessage: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default HomeScreen;