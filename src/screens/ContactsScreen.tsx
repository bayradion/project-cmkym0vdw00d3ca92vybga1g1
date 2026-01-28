import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Text, ListRenderItem } from 'react-native';
import { Surface, Avatar, Divider, Pressable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';
import type { Contact, ContactsScreenNavigationProp } from '../types';

const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { contacts, createOrGetChat } = useChatStore();

  const handleContactPress = useCallback((contact: Contact) => {
    createOrGetChat(contact.id);
    navigation.navigate('Chat', {
      contactId: contact.id,
      contactName: contact.name,
    });
  }, [navigation, createOrGetChat]);

  const renderContactItem: ListRenderItem<Contact> = useCallback(({ item }) => (
    <View key={`contact-wrapper-${item.id}`}>
      <Surface style={styles.contactItem} elevation={0}>
        <Pressable
          style={styles.contactPressable}
          onPress={() => handleContactPress(item)}
          android_ripple={{ color: theme.colors.primary, borderless: false }}
        >
          <Avatar.Text 
            size={50} 
            label={item.name.charAt(0).toUpperCase()}
            style={styles.avatar}
          />
          <View style={styles.contactContent}>
            <Text style={styles.contactName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.contactPhone} numberOfLines={1}>
              {item.phone}
            </Text>
            {item.status && (
              <Text style={styles.contactStatus} numberOfLines={2}>
                {item.status}
              </Text>
            )}
          </View>
        </Pressable>
      </Surface>
      <Divider />
    </View>
  ), [handleContactPress]);

  const keyExtractor = useCallback((item: Contact) => `contact-${item.id}`, []);

  const getItemLayout = useCallback((data: Contact[] | null | undefined, index: number) => ({
    length: 72,
    offset: 72 * index,
    index,
  }), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contacts</Text>
      </View>
      {contacts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No contacts</Text>
          <Text style={styles.emptySubtext}>Your contacts will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          style={styles.contactList}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
        />
      )}
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
    backgroundColor: theme.colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
  },
  contactList: {
    flex: 1,
  },
  contactItem: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: 0,
  },
  contactPressable: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 12,
  },
  contactContent: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  contactStatus: {
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.onSurfaceVariant,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default ContactsScreen;