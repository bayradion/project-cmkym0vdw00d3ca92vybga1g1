import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants/theme';

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>
        <Text style={styles.name}>Your Name</Text>
        <Text style={styles.status}>Available</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.sectionContent}>
          Hey there! I am using WhatsApp.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phone</Text>
        <Text style={styles.sectionContent}>+1 234 567 8900</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Privacy</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Security</Text>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Help</Text>
        </View>
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
    paddingVertical: 32,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    fontSize: 64,
    width: 100,
    height: 100,
    textAlign: 'center',
    lineHeight: 100,
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 50,
    overflow: 'hidden',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    fontSize: 16,
    color: theme.colors.onSurface,
    lineHeight: 22,
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  settingText: {
    fontSize: 16,
    color: theme.colors.onSurface,
  },
});

export default ProfileScreen;