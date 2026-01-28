import React, { useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, Pressable } from 'react-native';
import { Text, Avatar, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { RootStackParamList, Contact } from '../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface ContactItemProps {
  item: Contact;
  onPress: (contact: Contact) => void;
}

const ContactItem = React.memo<ContactItemProps>(({ item, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  const avatarStyle = useMemo(() => [styles.avatar], []);

  return (
    <View>
      <View style={styles.contactWrapper}>
        <Pressable
          style={styles.contactItem}
          onPress={handlePress}
        >
          <Avatar.Text
            size={50}
            label={item.avatar || item.name.charAt(0)}
            style={avatarStyle}
          />
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name}</Text>
            <Text style={styles.lastSeen}>
              {item.isOnline ? 'Online' : `Last seen ${item.lastSeen}`}
            </Text>
          </View>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </Pressable>
      </View>
      <Divider />
    </View>
  );
});

ContactItem.displayName = 'ContactItem';

const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { contacts } = useChatStore();

  const handleContactPress = useCallback((contact: Contact) => {
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  }, [navigation]);

  const renderContact = useCallback(({ item }: { item: Contact }) => {
    return (
      <ContactItem
        item={item}
        onPress={handleContactPress}
      />
    );
  }, [handleContactPress]);

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        getItemLayout={(data, index) => ({
          length: 80,
          offset: 80 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contactWrapper: {
    backgroundColor: theme.colors.surface,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    height: 80,
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  lastSeen: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
});

export default React.memo(ContactsScreen);