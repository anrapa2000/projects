import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
}; 