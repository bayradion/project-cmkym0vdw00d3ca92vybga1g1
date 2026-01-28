import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Avatar, Text, List, Divider, Switch } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useChatStore } from '../store/chatStore';
import { theme, spacing } from '../constants/theme';

const ProfileScreen = () => {
  const { currentUser } = useChatStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Профиль" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="pencil" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Avatar.Text
            size={80}
            label={currentUser.name}
            style={styles.profileAvatar}
          />
          <Text variant="headlineSmall" style={styles.profileName}>
            {currentUser.name}
          </Text>
          <Text variant="bodyMedium" style={styles.profileStatus}>
            В сети
          </Text>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Настройки
          </Text>
          
          <List.Item
            title="Уведомления"
            description="Получать уведомления о новых сообщениях"
            left={() => (
              <MaterialIcons 
                name="notifications" 
                size={24} 
                color={theme.colors.primary}
                style={styles.listIcon}
              />
            )}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
            style={styles.listItem}
          />

          <List.Item
            title="Темная тема"
            description="Использовать темное оформление"
            left={() => (
              <MaterialIcons 
                name="dark-mode" 
                size={24} 
                color={theme.colors.primary}
                style={styles.listIcon}
              />
            )}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
            style={styles.listItem}
          />

          <List.Item
            title="Приватность"
            description="Настройки конфиденциальности"
            left={() => (
              <MaterialIcons 
                name="privacy-tip" 
                size={24} 
                color={theme.colors.primary}
                style={styles.listIcon}
              />
            )}
            right={() => (
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={theme.colors.onSurfaceVariant}
              />
            )}
            style={styles.listItem}
            onPress={() => {}}
          />

          <List.Item
            title="Хранилище"
            description="Управление данными и хранилищем"
            left={() => (
              <MaterialIcons 
                name="storage" 
                size={24} 
                color={theme.colors.primary}
                style={styles.listIcon}
              />
            )}
            right={() => (
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={theme.colors.onSurfaceVariant}
              />
            )}
            style={styles.listItem}
            onPress={() => {}}
          />
        </View>

        <Divider style={styles.divider} />

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Поддержка
          </Text>

          <List.Item
            title="Помощь"
            description="Часто задаваемые вопросы"
            left={() => (
              <MaterialIcons 
                name="help" 
                size={24} 
                color={theme.colors.primary}
                style={styles.listIcon}
              />
            )}
            right={() => (
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={theme.colors.onSurfaceVariant}
              />
            )}
            style={styles.listItem}
            onPress={() => {}}
          />

          <List.Item
            title="О приложении"
            description="Версия 1.0.0"
            left={() => (
              <MaterialIcons 
                name="info" 
                size={24} 
                color={theme.colors.primary}
                style={styles.listIcon}
              />
            )}
            right={() => (
              <MaterialIcons 
                name="chevron-right" 
                size={24} 
                color={theme.colors.onSurfaceVariant}
              />
            )}
            style={styles.listItem}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
  },
  headerTitle: {
    color: theme.colors.onPrimary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: theme.colors.surface,
  },
  profileAvatar: {
    backgroundColor: theme.colors.primary,
    marginBottom: spacing.md,
  },
  profileName: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  profileStatus: {
    color: theme.colors.primary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  listItem: {
    paddingHorizontal: spacing.md,
  },
  listIcon: {
    marginLeft: spacing.sm,
    marginRight: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.outline,
  },
});

export default ProfileScreen;