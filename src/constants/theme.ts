import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#075E54',
    onPrimary: '#FFFFFF',
    primaryContainer: '#DCF7DC',
    onPrimaryContainer: '#002114',
    secondary: '#128C7E',
    onSecondary: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#1D1C16',
    surfaceVariant: '#F0F2F1',
    onSurfaceVariant: '#44483E',
    outline: '#74796F',
    background: '#F7F8FC',
    onBackground: '#1D1C16',
  },
};

export const chatTheme = {
  colors: {
    ownMessage: '#DCF8C6',
    otherMessage: '#FFFFFF',
    timestamp: '#999999',
  },
};