import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { theme } from '../constants/theme';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = React.memo(({ 
  message, 
  showAvatar = true 
}) => {
  const isFromMe = message.isFromMe;
  
  return (
    <View style={[
      styles.container,
      isFromMe ? styles.containerFromMe : styles.containerFromOther
    ]}>
      <Surface
        style={[
          styles.bubble,
          isFromMe ? styles.bubbleFromMe : styles.bubbleFromOther
        ]}
        elevation={1}
      >
        <Text style={[
          styles.messageText,
          isFromMe ? styles.messageTextFromMe : styles.messageTextFromOther
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          isFromMe ? styles.timestampFromMe : styles.timestampFromOther
        ]}>
          {new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </Surface>
    </View>
  );
});

MessageBubble.displayName = 'MessageBubble';

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginHorizontal: 16,
  },
  containerFromMe: {
    alignItems: 'flex-end',
  },
  containerFromOther: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  bubbleFromMe: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  bubbleFromOther: {
    backgroundColor: theme.colors.surfaceVariant,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTextFromMe: {
    color: theme.colors.onPrimary,
  },
  messageTextFromOther: {
    color: theme.colors.onSurfaceVariant,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  timestampFromMe: {
    color: theme.colors.onPrimary,
    opacity: 0.7,
  },
  timestampFromOther: {
    color: theme.colors.onSurfaceVariant,
    opacity: 0.7,
  },
});