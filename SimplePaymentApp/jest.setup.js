// Import Jest's expect
import { expect } from '@jest/globals';

// Set up a mock performance object
global.performance = {
  now: () => new Date().getTime(),
};

// Mock EventEmitter first
jest.mock('react-native/Libraries/vendor/emitter/EventEmitter', () => {
  class EventEmitter {
    addListener = jest.fn();
    removeListener = jest.fn();
    removeAllListeners = jest.fn();
    emit = jest.fn();
  }
  return EventEmitter;
});

// Mock React Native
jest.mock('react-native', () => ({
  Platform: { OS: 'ios', select: jest.fn() },
  StyleSheet: { create: jest.fn(styles => styles) },
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  TextInput: 'TextInput',
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
  },
  Image: 'Image',
}));

// Mock Expo modules
jest.mock('expo-modules-core', () => ({
  EventEmitter: {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    emit: jest.fn(),
  },
  requireNativeModule: jest.fn(),
}));

// Mock Expo Location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  watchPositionAsync: jest.fn(),
  LocationAccuracy: {
    Balanced: 3,
  },
}));

// Mock Expo Local Authentication
jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(),
  hasHardwareAsync: jest.fn(),
  supportedAuthenticationTypesAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(),
  launchCameraAsync: jest.fn(),
  requestMediaLibraryPermissionsAsync: jest.fn(),
  requestCameraPermissionsAsync: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
  NavigationContainer: 'NavigationContainer',
}));

// Configure React Native Testing Library
import { configure } from '@testing-library/react-native';
configure({
  asyncUtilTimeout: 5000,
});