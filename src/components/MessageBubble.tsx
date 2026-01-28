import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, spacing, borderRadius } from '../constants/theme';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <MaterialIcons name="done" size={16} color="#999" />;
      case 'delivered':
        return <MaterialIcons name="done-all" size={16} color="#999" />;
      case 'read':
        return <MaterialIcons name="done-all" size={16} color={theme.colors.primary} />;
      default:
        return null;
    }
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
        <Text 
          variant="bodyMedium" 
          style={[
            styles.messageText,
            message.isOwn ? styles.ownText : styles.otherText
          ]}
        >
          {message.text}
        </Text>
        
        <View style={styles.messageFooter}>
          <Text 
            variant="bodySmall" 
            style={[
              styles.timeText,
              message.isOwn ? styles.ownTimeText : styles.otherTimeText
            ]}
          >
            {formatTime(message.timestamp)}
          </Text>
          {message.isOwn && (
            <View style={styles.statusIcon}>
              {getStatusIcon()}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    maxWidth: '80%',
  },
  ownMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    elevation: 1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  ownBubble: {
    backgroundColor: theme.colors.primaryContainer,
    borderBottomRightRadius: borderRadius.sm,
  },
  otherBubble: {
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: borderRadius.sm,
  },
  messageText: {
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  ownText: {
    color: theme.colors.onPrimaryContainer,
  },
  otherText: {
    color: theme.colors.onSurface,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: spacing.xs,
  },
  timeText: {
    fontSize: 11,
    opacity: 0.7,
  },
  ownTimeText: {
    color: theme.colors.onPrimaryContainer,
  },
  otherTimeText: {
    color: theme.colors.onSurface,
  },
  statusIcon: {
    marginLeft: spacing.xs,
  },
});

export default MessageBubble;