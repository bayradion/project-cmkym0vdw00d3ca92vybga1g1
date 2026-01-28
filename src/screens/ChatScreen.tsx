import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton, Text } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';

import { useChatStore } from '../store/chatStore';
import MessageBubble from '../components/MessageBubble';
import { theme, spacing } from '../constants/theme';
import type { RootStackParamList, Message } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId } = route.params;
  const [inputText, setInputText] = useState('');
  const { getChatMessages, addMessage } = useChatStore();
  const messages = getChatMessages(contactId);

  const handleSend = () => {
    if (inputText.trim()) {
      addMessage(contactId, inputText.trim());
      setInputText('');
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          inverted={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Введите сообщение..."
            style={styles.textInput}
            multiline
            maxLength={1000}
            mode="outlined"
            outlineStyle={styles.inputOutline}
          />
          <View style={styles.sendButtonContainer}>
            <IconButton
              icon="send"
              size={24}
              iconColor={theme.colors.onPrimary}
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? theme.colors.primary : theme.colors.onSurfaceVariant }
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingVertical: spacing.md,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    backgroundColor: theme.colors.surface,
    marginRight: spacing.sm,
  },
  inputOutline: {
    borderColor: theme.colors.outline,
    borderWidth: 1,
  },
  sendButtonContainer: {
    justifyContent: 'flex-end',
    paddingBottom: spacing.xs,
  },
  sendButton: {
    margin: 0,
    borderRadius: 24,
  },
});

export default ChatScreen;