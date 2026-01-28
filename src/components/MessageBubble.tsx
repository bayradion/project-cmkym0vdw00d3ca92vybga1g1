import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Message } from '../types';
import { theme, chatTheme } from '../constants/theme';

interface MessageBubbleProps {
  message: Message;
  contactName?: string;
}

export default function MessageBubble({ message, contactName }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <View style={[
      styles.container,
      message.isOwn ? styles.ownMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.bubble,
        {
          backgroundColor: message.isOwn 
            ? chatTheme.colors.ownMessage 
            : chatTheme.colors.otherMessage
        }
      ]}>
        {!message.isOwn && contactName && (
          <Text style={styles.contactName}>{contactName}</Text>
        )}
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.timestamp}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginHorizontal: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  contactName: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
    color: theme.colors.onSurface,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    color: chatTheme.colors.timestamp,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});