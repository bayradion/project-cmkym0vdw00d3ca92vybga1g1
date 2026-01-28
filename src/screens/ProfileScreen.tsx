import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

interface ProfileOptionProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({ icon, title, subtitle, onPress }) => {
  return (
    <View style={styles.optionWrapper}>
      <Pressable style={styles.option} onPress={onPress}>
        <MaterialIcons name={icon as any} size={24} color={theme.colors.onSurfaceVariant} />
        <View style={styles.optionContent}>
          <Text style={styles.optionTitle}>{title}</Text>
          {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
        </View>
        <MaterialIcons name="chevron-right" size={24} color={theme.colors.onSurfaceVariant} />
      </Pressable>
    </View>
  );
};

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>😊</Text>
          </View>
          <Text style={styles.userName}>You</Text>
          <Text style={styles.userStatus}>Hey there! I am using WhatsApp.</Text>
        </View>

        <View style={styles.section}>
          <ProfileOption
            icon="account-circle"
            title="Name"
            subtitle="You"
          />
          <ProfileOption
            icon="info"
            title="About"
            subtitle="Hey there! I am using WhatsApp."
          />
          <ProfileOption
            icon="phone"
            title="Phone"
            subtitle="+1 (555) 123-4567"
          />
        </View>

        <View style={styles.section}>
          <ProfileOption
            icon="notifications"
            title="Notifications"
          />
          <ProfileOption
            icon="lock"
            title="Privacy"
          />
          <ProfileOption
            icon="security"
            title="Security"
          />
          <ProfileOption
            icon="data-usage"
            title="Storage and data"
          />
        </View>

        <View style={styles.section}>
          <ProfileOption
            icon="help"
            title="Help"
          />
          <ProfileOption
            icon="feedback"
            title="Tell a friend"
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
    padding: 16,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.onPrimary,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 8,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginBottom: 8,
  },
  userStatus: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  section: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
  },
  optionWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  optionContent: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
});

export default ProfileScreen;