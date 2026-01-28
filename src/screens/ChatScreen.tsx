import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useChatStore } from '../store/chatStore';
import MessageBubble from '../components/MessageBubble';
import { theme } from '../constants/theme';
import type { RootStackParamList, Message } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId } = route.params;
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);
  
  const { getMessagesByContactId, addMessage } = useChatStore();
  const messages = useMemo(() => getMessagesByContactId(contactId), [contactId, getMessagesByContactId]);

  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      addMessage(contactId, inputText.trim(), true);
      setInputText('');
      
      // Simulate response after 1-2 seconds
      const timeoutId = setTimeout(() => {
        const responses = [
          'Got it!',
          'Thanks for letting me know',
          'Sounds good',
          'Sure thing!',
          'I understand',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(contactId, randomResponse, false);
      }, 1000 + Math.random() * 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [contactId, inputText, addMessage]);

  const renderMessage = useCallback(({ item }: { item: Message }) => {
    return <MessageBubble message={item} />;
  }, []);

  const keyExtractor = useCallback((item: Message) => item.id, []);

  const isDisabled = useMemo(() => !inputText.trim(), [inputText]);

  const scrollToEnd = useCallback(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages.length]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToEnd();
    }, 100);

    return () => clearTimeout(timer);
  }, [scrollToEnd, messages.length]);

  const inputContentStyle = useMemo(() => [styles.inputContent], []);
  const sendButtonStyle = useMemo(() => [styles.sendButton], []);
  const sendButtonWrapperStyle = useMemo(() => [styles.sendButtonWrapper], []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={keyExtractor}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        windowSize={10}
        initialNumToRender={15}
        onContentSizeChange={scrollToEnd}
        onLayout={scrollToEnd}
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
            contentStyle={inputContentStyle}
          />
          <View style={sendButtonWrapperStyle}>
            <IconButton
              icon="send"
              size={24}
              iconColor={theme.colors.onPrimary}
              style={sendButtonStyle}
              onPress={handleSend}
              disabled={isDisabled}
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

export default React.memo(ChatScreen);