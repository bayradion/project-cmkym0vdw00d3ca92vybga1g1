import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Message } from '../types';
import { theme } from '../constants/theme';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = memo(({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.container,
      message.isOwn ? styles.ownMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.bubble,
        message.isOwn ? styles.ownBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.text,
          message.isOwn ? styles.ownText : styles.otherText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          message.isOwn ? styles.ownTimestamp : styles.otherTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
});

MessageBubble.displayName = 'MessageBubble';

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingHorizontal: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  ownBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: theme.colors.surfaceVariant,
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownText: {
    color: theme.colors.onPrimary,
  },
  otherText: {
    color: theme.colors.onSurface,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  otherTimestamp: {
    color: theme.colors.onSurfaceVariant,
  },
});

export default MessageBubble;