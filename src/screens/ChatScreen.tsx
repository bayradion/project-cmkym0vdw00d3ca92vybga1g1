import React, { useState } from 'react';
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
  
  const { getMessagesByContactId, addMessage } = useChatStore();
  const messages = getMessagesByContactId(contactId);

  const handleSend = () => {
    if (inputText.trim()) {
      addMessage(contactId, inputText.trim(), true);
      setInputText('');
      
      // Simulate response after 1-2 seconds
      setTimeout(() => {
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
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    return <MessageBubble message={item} />;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        inverted={false}
        showsVerticalScrollIndicator={false}
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