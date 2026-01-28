import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <View style={[styles.container, message.isOwn ? styles.ownMessage : styles.otherMessage]}>
      <View style={[styles.bubble, message.isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, message.isOwn ? styles.ownText : styles.otherText]}>
          {message.text}
        </Text>
        <Text style={[styles.timestamp, message.isOwn ? styles.ownTimestamp : styles.otherTimestamp]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ownBubble: {
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: 4,
  },
  messageText: {
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
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  ownTimestamp: {
    color: theme.colors.onPrimary,
    opacity: 0.8,
  },
  otherTimestamp: {
    color: theme.colors.onSurfaceVariant,
  },
});