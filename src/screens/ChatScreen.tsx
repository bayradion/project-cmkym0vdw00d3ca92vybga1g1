import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useRoute, useIsFocused } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useChatStore } from '../store/chatStore';
import MessageBubble from '../components/MessageBubble';
import { theme } from '../constants/theme';
import type { RootStackParamList, Message } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const isFocused = useIsFocused();
  const { contactId } = route.params;
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const responseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { getMessagesByContactId, addMessage } = useChatStore();
  const messages = getMessagesByContactId(contactId);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
    };
  }, []);

  const handleSend = () => {
    if (inputText.trim() && isFocused) {
      addMessage(contactId, inputText.trim(), true);
      setInputText('');
      
      // Clear any existing timeout
      if (responseTimeoutRef.current) {
        clearTimeout(responseTimeoutRef.current);
      }
      
      // Simulate response after 1-2 seconds
      responseTimeoutRef.current = setTimeout(() => {
        // Check if component is still focused before adding response
        if (isFocused) {
          const responses = [
            'Got it!',
            'Thanks for letting me know',
            'Sounds good',
            'Sure thing!',
            'I understand',
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          addMessage(contactId, randomResponse, false);
        }
        responseTimeoutRef.current = null;
      }, 1000 + Math.random() * 1000);
    }
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    return <MessageBubble key={`${item.id}-${index}`} message={item} />;
  };

  const getItemLayout = (data: Message[] | null | undefined, index: number) => ({
    length: 80, // Approximate height of each message
    offset: 80 * index,
    index,
  });

  if (!isFocused) {
    return null;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        getItemLayout={getItemLayout}
      />
      
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            multiline
            mode="outlined"
            outlineColor="transparent"
            activeOutlineColor="transparent"
            contentStyle={styles.inputContent}
          />
          <View style={styles.sendButtonWrapper}>
            <IconButton
              icon="send"
              size={24}
              iconColor={theme.colors.onPrimary}
              style={styles.sendButton}
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
    backgroundColor: theme.colors.background,
  },
  messagesList: {
    flex: 1,
    paddingVertical: 8,
  },
  inputContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 4,
  },
  textInput: {
    flex: 1,
    maxHeight: 120,
    backgroundColor: 'transparent',
  },
  inputContent: {
    paddingVertical: 8,
  },
  sendButtonWrapper: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    marginLeft: 8,
    overflow: 'hidden',
  },
  sendButton: {
    margin: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default ChatScreen;