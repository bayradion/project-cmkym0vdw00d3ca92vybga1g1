import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, IconButton, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useChatStore } from '../store/chatStore';
import { MessageBubble } from '../components/MessageBubble';
import { theme } from '../constants/theme';
import type { RootStackParamList, Message } from '../types';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const { contactId } = route.params;
  const [messageText, setMessageText] = useState('');
  
  const {
    getMessagesByContactId,
    getContactById,
    addMessage,
  } = useChatStore();
  
  const messages = getMessagesByContactId(contactId);
  const contact = getContactById(contactId);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      addMessage(contactId, messageText.trim(), true);
      setMessageText('');
      
      // Simulate a response after 1 second
      setTimeout(() => {
        const responses = [
          'Thanks for your message!',
          'That sounds great!',
          'I agree with you.',
          'Let me think about it.',
          'Sure, no problem!',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(contactId, randomResponse, false);
      }, 1000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.contactStatus}>
            {contact?.isOnline ? 'Online' : `Last seen ${contact?.lastSeen}`}
          </Text>
        </View>
        
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          inverted
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            placeholder="Type a message..."
            value={messageText}
            onChangeText={setMessageText}
            multiline
            style={styles.textInput}
            outlineStyle={styles.inputOutline}
            contentStyle={styles.inputContent}
            right={
              <TextInput.Icon
                icon="send"
                onPress={handleSendMessage}
                disabled={!messageText.trim()}
                iconColor={messageText.trim() ? theme.colors.primary : theme.colors.onSurfaceVariant}
              />
            }
          />
        </View>
      </KeyboardAvoidingView>
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
    backgroundColor: theme.colors.surface,
  },
  contactStatus: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
  },
  textInput: {
    backgroundColor: theme.colors.background,
    maxHeight: 120,
  },
  inputOutline: {
    borderColor: theme.colors.outline,
    borderRadius: 24,
  },
  inputContent: {
    paddingVertical: 8,
  },
});

export default ChatScreen;