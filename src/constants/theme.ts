import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#25D366',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E8F5E8',
    onPrimaryContainer: '#1B5E20',
    secondary: '#128C7E',
    onSecondary: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#1C1B1F',
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#6C6C6C',
    outline: '#E0E0E0',
    background: '#F8F9FA',
    onBackground: '#1C1B1F',
  },
};

export const chatTheme = {
  colors: {
    ownMessage: '#DCF8C6',
    otherMessage: '#FFFFFF',
    timestamp: '#8E8E8E',
    inputBackground: '#F0F0F0',
  },
};