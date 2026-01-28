import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, ListRenderItem } from 'react-native';
import { Surface, Pressable } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useChatStore } from '../store/chatStore';
import { MessageBubble } from '../components/MessageBubble';
import { theme } from '../constants/theme';
import type { RootStackParamList, Message } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId } = route.params;
  const { chats, sendMessage, createOrGetChat } = useChatStore();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  const chat = chats.find(c => c.contactId === contactId);

  useEffect(() => {
    if (!chat) {
      createOrGetChat(contactId);
    }
  }, [chat, contactId, createOrGetChat]);

  const handleSend = useCallback(() => {
    if (inputText.trim().length === 0) return;
    
    sendMessage(contactId, inputText.trim());
    setInputText('');
    
    // Scroll to bottom after sending message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [inputText, contactId, sendMessage]);

  const renderMessage: ListRenderItem<Message> = useCallback(({ item, index }) => {
    const messages = chat?.messages || [];
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const showAvatar = !prevMessage || prevMessage.isFromMe !== item.isFromMe;
    
    return (
      <MessageBubble 
        key={`message-${item.id}`}
        message={item} 
        showAvatar={showAvatar}
      />
    );
  }, [chat?.messages]);

  const keyExtractor = useCallback((item: Message) => `message-${item.id}`, []);

  const getItemLayout = useCallback((data: Message[] | null | undefined, index: number) => ({
    length: 60, // Approximate height
    offset: 60 * index,
    index,
  }), []);

  if (!chat) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading chat...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        {chat.messages.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubtext}>Send a message to start the conversation</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={chat.messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            style={styles.messagesList}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            initialNumToRender={15}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />
        )}
        
        <Surface style={styles.inputContainer} elevation={4}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.onSurfaceVariant}
            multiline
            maxLength={1000}
            returnKeyType="send"
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
          />
          <View style={styles.sendButtonWrapper}>
            <Pressable
              style={[
                styles.sendButton,
                { opacity: inputText.trim().length > 0 ? 1 : 0.5 }
              ]}
              onPress={handleSend}
              disabled={inputText.trim().length === 0}
              android_ripple={{ color: theme.colors.onPrimary, borderless: true }}
            >
              <MaterialIcons 
                name="send" 
                size={24} 
                color={theme.colors.onPrimary} 
              />
            </Pressable>
          </View>
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: theme.colors.onSurface,
    backgroundColor: theme.colors.background,
  },
  sendButtonWrapper: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    marginLeft: 8,
    overflow: 'hidden',
  },
  sendButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 44,
    minHeight: 44,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
});

export default ChatScreen;