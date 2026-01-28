import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#25D366',
    primaryContainer: '#E8F5E8',
    secondary: '#128C7E',
    secondaryContainer: '#E0F2F1',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#F0F2F5',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#1F2937',
    onSurfaceVariant: '#6B7280',
    outline: '#E5E7EB',
    outlineVariant: '#F3F4F6',
  },
};

export const chatTheme = {
  colors: {
    ownMessage: '#DCF8C6',
    otherMessage: '#FFFFFF',
    timestamp: '#858585',
  },
};