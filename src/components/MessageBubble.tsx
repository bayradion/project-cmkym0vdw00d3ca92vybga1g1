import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { theme } from '../constants/theme';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isOwn = message.isOwn;

  return (
    <View style={[styles.container, isOwn ? styles.ownContainer : styles.otherContainer]}>
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isOwn ? styles.ownText : styles.otherText]}>
          {message.text}
        </Text>
        <Text style={[styles.timestamp, isOwn ? styles.ownTimestamp : styles.otherTimestamp]}>
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    paddingHorizontal: 4,
  },
  ownContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 4,
  },
  ownText: {
    color: theme.colors.onPrimary,
  },
  otherText: {
    color: theme.colors.onSurface,
  },
  timestamp: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  ownTimestamp: {
    color: theme.colors.onPrimary,
    opacity: 0.7,
  },
  otherTimestamp: {
    color: theme.colors.onSurfaceVariant,
  },
});

export default MessageBubble;