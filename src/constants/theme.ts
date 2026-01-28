import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#075E54',
    primaryContainer: '#DCF8C6',
    secondary: '#128C7E',
    secondaryContainer: '#34B7F1',
    surface: '#FFFFFF',
    surfaceVariant: '#F0F2F5',
    background: '#FFFFFF',
    onBackground: '#1C1B1F',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',
    outline: '#E5E5E5',
    shadow: '#000000',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
};