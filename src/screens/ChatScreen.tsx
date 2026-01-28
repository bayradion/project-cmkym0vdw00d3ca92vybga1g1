import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useChatStore } from '../store/chatStore';
import MessageBubble from '../components/MessageBubble';
import { theme } from '../constants/theme';
import type { RootStackParamList, Message } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId, contactName } = route.params;
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  
  const { getChat, createChat, addMessage, contacts } = useChatStore();

  const chat = getChat(contactId);
  const contact = contacts.find(c => c.id === contactId);
  
  useEffect(() => {
    if (!chat) {
      createChat(contactId);
    }
  }, [chat, contactId, createChat]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chat?.messages.length) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [chat?.messages.length]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const chatId = chat?.id || createChat(contactId);
    
    addMessage(chatId, {
      text: inputText.trim(),
      isOwn: true,
    });
    
    setInputText('');
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "I see what you mean.",
        "Thanks for sharing!",
        "Got it!",
        "Cool!",
        "Nice!",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      addMessage(chatId, {
        text: randomResponse,
        isOwn: false,
        contactId,
      });
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return (
      <MessageBubble 
        message={item} 
        contactName={!item.isOwn ? contactName : undefined}
      />
    );
  };

  const messages = chat?.messages || [];

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.messagesContainer}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            style={styles.textInput}
            multiline
            maxLength={1000}
            mode="outlined"
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
          />
          <View style={styles.sendButtonWrapper}>
            <IconButton
              icon="send"
              size={24}
              iconColor={theme.colors.onPrimary}
              style={[
                styles.sendButton,
                { backgroundColor: inputText.trim() ? theme.colors.primary : theme.colors.onSurfaceVariant }
              ]}
              onPress={handleSendMessage}
              disabled={!inputText.trim()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  inputContainer: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    backgroundColor: theme.colors.surfaceVariant,
    marginRight: 8,
  },
  inputOutline: {
    borderColor: 'transparent',
    borderRadius: 25,
  },
  inputContent: {
    paddingHorizontal: 16,
  },
  sendButtonWrapper: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  sendButton: {
    margin: 0,
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});