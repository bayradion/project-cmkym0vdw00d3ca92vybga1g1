import React, { useCallback, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { theme } from './src/constants/theme';
import type { RootStackParamList, TabParamList } from './src/types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = React.memo(() => {
  const chatTabOptions = useMemo(() => ({
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="chat" size={size} color={color} />
    ),
  }), []);

  const contactsTabOptions = useMemo(() => ({
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="contacts" size={size} color={color} />
    ),
  }), []);

  const profileTabOptions = useMemo(() => ({
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <MaterialIcons name="person" size={size} color={color} />
    ),
  }), []);

  const screenOptions = useMemo(() => ({
    headerShown: false,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
    tabBarStyle: {
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.outline,
    },
  }), []);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Chats"
        component={HomeScreen}
        options={chatTabOptions}
      />
      <Tab.Screen
        name="Contacts"
        component={ContactsScreen}
        options={contactsTabOptions}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileTabOptions}
      />
    </Tab.Navigator>
  );
});

TabNavigator.displayName = 'TabNavigator';

export default function App() {
  const stackScreenOptions = useCallback(({ route }: any) => ({
    title: route.params?.contactName || 'Chat',
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
    headerTintColor: theme.colors.onPrimary,
    headerTitleStyle: {
      fontWeight: 'bold' as const,
    },
  }), []);

  const mainScreenOptions = useMemo(() => ({
    headerShown: false,
  }), []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={mainScreenOptions}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={stackScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}