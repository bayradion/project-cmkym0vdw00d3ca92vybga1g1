import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, List, Divider, Switch, Button } from 'react-native-paper';
import { useChatStore } from '../store/chatStore';
import { theme } from '../constants/theme';

export default function ProfileScreen() {
  const { currentUser, chats, contacts } = useChatStore();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const totalMessages = chats.reduce((total, chat) => total + chat.messages.length, 0);
  const totalChats = chats.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.content}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text 
              size={80} 
              label={currentUser?.name?.split(' ').map(n => n[0]).join('') || 'ME'}
              style={styles.profileAvatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {currentUser?.name || 'My Profile'}
              </Text>
              <Text style={styles.profileStatus}>Online</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Statistics Card */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalChats}</Text>
                <Text style={styles.statLabel}>Chats</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalMessages}</Text>
                <Text style={styles.statLabel}>Messages</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{contacts.length}</Text>
                <Text style={styles.statLabel}>Contacts</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* Settings Card */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <List.Item
              title="Notifications"
              description="Enable push notifications"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  color={theme.colors.primary}
                />
              )}
              style={styles.listItem}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title="Dark Mode"
              description="Use dark theme"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  color={theme.colors.primary}
                />
              )}
              style={styles.listItem}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title="Privacy"
              description="Manage your privacy settings"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
              onPress={() => {
                console.log('Privacy settings pressed');
              }}
            />
            
            <Divider style={styles.divider} />
            
            <List.Item
              title="Storage"
              description="Manage chat storage"
              left={(props) => <List.Icon {...props} icon="database" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              style={styles.listItem}
              onPress={() => {
                console.log('Storage settings pressed');
              }}
            />
          </Card.Content>
        </Card>

        {/* Actions Card */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  mode="outlined"
                  icon="account-edit"
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                  onPress={() => {
                    console.log('Edit profile pressed');
                  }}
                >
                  Edit Profile
                </Button>
              </View>
              
              <View style={styles.buttonWrapper}>
                <Button
                  mode="outlined"
                  icon="backup-restore"
                  style={styles.actionButton}
                  contentStyle={styles.buttonContent}
                  onPress={() => {
                    console.log('Backup & Restore pressed');
                  }}
                >
                  Backup & Restore
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>WhatsApp Chat App v1.0.0</Text>
          <Text style={styles.appDescription}>
            Built with React Native & Expo
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
  },
  content: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  profileAvatar: {
    backgroundColor: theme.colors.primary,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  profileStatus: {
    fontSize: 14,
    color: theme.colors.primary,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.onSurface,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  listItem: {
    paddingHorizontal: 0,
  },
  divider: {
    backgroundColor: theme.colors.outline,
    marginVertical: 8,
  },
  actionsCard: {
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  buttonWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionButton: {
    borderColor: theme.colors.primary,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  appVersion: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  appDescription: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 4,
  },
});