import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  Card,
  Avatar,
  Title,
  Caption,
  List,
  Divider,
  Switch,
  Button,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text 
          size={80} 
          label="👤" 
          style={styles.avatar}
        />
        <Title style={styles.userName}>You</Title>
        <Caption style={styles.userStatus}>Available</Caption>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Account</Title>
          <List.Item
            title="Phone"
            description="+1 234 567 8900"
            left={(props) => (
              <MaterialIcons
                name="phone"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
          <List.Item
            title="Username"
            description="@myusername"
            left={(props) => (
              <MaterialIcons
                name="alternate-email"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
          <List.Item
            title="Bio"
            description="Hey there! I am using WhatsApp."
            left={(props) => (
              <MaterialIcons
                name="info"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Settings</Title>
          <List.Item
            title="Notifications"
            description="Enable push notifications"
            left={(props) => (
              <MaterialIcons
                name="notifications"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <List.Item
            title="Dark Mode"
            description="Enable dark theme"
            left={(props) => (
              <MaterialIcons
                name="dark-mode"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
            right={() => (
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
              />
            )}
          />
          <List.Item
            title="Privacy"
            description="Manage your privacy settings"
            left={(props) => (
              <MaterialIcons
                name="privacy-tip"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
            right={(props) => (
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
          <List.Item
            title="Security"
            description="Two-step verification, change number"
            left={(props) => (
              <MaterialIcons
                name="security"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
            right={(props) => (
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Support</Title>
          <List.Item
            title="Help"
            description="Help center, contact support"
            left={(props) => (
              <MaterialIcons
                name="help"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
            right={(props) => (
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
          <List.Item
            title="About"
            description="App version, terms of service"
            left={(props) => (
              <MaterialIcons
                name="info-outline"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
            right={(props) => (
              <MaterialIcons
                name="chevron-right"
                size={24}
                color={theme.colors.onSurfaceVariant}
                style={props.style}
              />
            )}
          />
        </Card.Content>
      </Card>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={() => console.log('Logout pressed')}
          style={styles.logoutButton}
          labelStyle={styles.logoutButtonText}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: theme.colors.surface,
  },
  avatar: {
    backgroundColor: theme.colors.primaryContainer,
    marginBottom: 12,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  card: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.surface,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  footer: {
    padding: 24,
    paddingBottom: 32,
  },
  logoutButton: {
    borderColor: '#F44336',
  },
  logoutButtonText: {
    color: '#F44336',
  },
});

export default ProfileScreen;