import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useChatStore } from '../store/chatStore';
import { MessageBubble } from '../components/MessageBubble';
import { theme } from '../constants/theme';
import type { RootStackParamList } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId, contactName } = route.params;
  const [messageText, setMessageText] = useState('');
  
  const { getMessagesByContactId, addMessage, getContactById } = useChatStore();
  const messages = getMessagesByContactId(contactId);
  const contact = getContactById(contactId);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      addMessage(contactId, messageText.trim(), true);
      setMessageText('');
      
      // Simulate response after 1 second
      setTimeout(() => {
        const responses = [
          'Thanks for your message!',
          'I\'ll get back to you soon.',
          'That sounds great!',
          'Let me think about it.',
          'Sure, no problem!',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(contactId, randomResponse, false);
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.contactInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{contact?.avatar || '👤'}</Text>
          </View>
          <View>
            <Text style={styles.contactName}>{contactName}</Text>
            <Text style={styles.lastSeen}>
              {contact?.isOnline ? 'Online' : contact?.lastSeen || 'Last seen recently'}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble message={item} />
        )}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            multiline
            maxLength={1000}
          />
          <View style={styles.sendButtonWrapper}>
            <Pressable
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <MaterialIcons
                name="send"
                size={20}
                color={messageText.trim() ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onPrimary,
  },
  lastSeen: {
    fontSize: 12,
    color: theme.colors.onPrimary,
    opacity: 0.8,
  },
  messagesList: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.background,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    maxHeight: 120,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.onSurface,
    maxHeight: 80,
    paddingVertical: 8,
  },
  sendButtonWrapper: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;