import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Avatar, Card, List, Switch } from 'react-native-paper';
import { theme } from '../constants/theme';

const ProfileScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label="ME"
          style={styles.avatar}
        />
        <Text style={styles.name}>My Profile</Text>
        <Text style={styles.status}>Available</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Item
              title="Phone"
              description="+1 234 567 8900"
              left={(props) => <List.Icon {...props} icon="phone" />}
            />
            <List.Item
              title="Email"
              description="me@example.com"
              left={(props) => <List.Icon {...props} icon="email" />}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Item
              title="Notifications"
              description="Receive push notifications"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              )}
            />
            <List.Item
              title="Dark Mode"
              description="Use dark theme"
              left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                />
              )}
            />
          </List.Section>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <List.Section>
            <List.Item
              title="Privacy"
              description="Privacy settings"
              left={(props) => <List.Icon {...props} icon="lock" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="Help & Support"
              description="Get help and support"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
            <List.Item
              title="About"
              description="App information"
              left={(props) => <List.Icon {...props} icon="information" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
            />
          </List.Section>
        </Card.Content>
      </Card>
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
    backgroundColor: theme.colors.primary,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  card: {
    margin: 16,
    marginTop: 8,
  },
});

export default ProfileScreen;