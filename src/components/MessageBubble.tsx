import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Message } from '../types';
import { theme } from '../constants/theme';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const formatTime = useMemo(() => (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const formattedTime = useMemo(() => formatTime(message.timestamp), [formatTime, message.timestamp]);

  const containerStyle = useMemo(() => [
    styles.container,
    message.isOwn ? styles.ownMessage : styles.otherMessage
  ], [message.isOwn]);

  const bubbleStyle = useMemo(() => [
    styles.bubble,
    message.isOwn ? styles.ownBubble : styles.otherBubble
  ], [message.isOwn]);

  const textStyle = useMemo(() => [
    styles.text,
    message.isOwn ? styles.ownText : styles.otherText
  ], [message.isOwn]);

  const timestampStyle = useMemo(() => [
    styles.timestamp,
    message.isOwn ? styles.ownTimestamp : styles.otherTimestamp
  ], [message.isOwn]);

  return (
    <View style={containerStyle}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>
          {message.text}
        </Text>
        <Text style={timestampStyle}>
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

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

export default React.memo(MessageBubble);