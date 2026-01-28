import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#25D366',
    onPrimary: '#FFFFFF',
    primaryContainer: '#E8F5E8',
    onPrimaryContainer: '#0F5132',
    secondary: '#075E54',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#DCF8C6',
    onSecondaryContainer: '#002114',
    tertiary: '#34B7F1',
    onTertiary: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#1C1B1F',
    surfaceVariant: '#F3F2F7',
    onSurfaceVariant: '#49454F',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    background: '#F7F8FC',
    onBackground: '#1C1B1F',
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
  },
};

export const chatTheme = {
  colors: {
    ownMessage: '#DCF8C6',
    otherMessage: '#FFFFFF',
    timestamp: '#667781',
    messageBackground: '#E5DDD5',
  },
};