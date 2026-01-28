import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Avatar, List, Divider } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export default function ProfileScreen() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    status: 'Hey there! I am using WhatsApp.',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Avatar.Text 
            size={100} 
            label={user.name.split(' ').map(n => n[0]).join('')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userStatus}>{user.status}</Text>
      </View>

      <Card style={styles.infoCard}>
        <Card.Content>
          <List.Item
            title="Email"
            description={user.email}
            left={(props) => <List.Icon {...props} icon="email" />}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Phone"
            description={user.phone}
            left={(props) => <List.Icon {...props} icon="phone" />}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Status"
            description={user.status}
            left={(props) => <List.Icon {...props} icon="information" />}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      <Card style={styles.settingsCard}>
        <Card.Content>
          <List.Item
            title="Notifications"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <MaterialIcons name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Privacy"
            left={(props) => <List.Icon {...props} icon="shield" />}
            right={(props) => <MaterialIcons name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />}
            style={styles.listItem}
          />
          <Divider />
          <List.Item
            title="Help"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <MaterialIcons name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: theme.colors.surface,
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: theme.colors.primaryContainer,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  userStatus: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  settingsCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  listItem: {
    paddingVertical: 8,
  },
});