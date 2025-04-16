// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo components
jest.mock('expo-font', () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-asset', () => ({
  Asset: {
    loadAsync: jest.fn(() => Promise.resolve()),
  },
}));

// Mock React Native components
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock process.memoryUsage for performance tests
const mockMemoryUsage = {
  heapUsed: 50 * 1024 * 1024, // 50MB in bytes
  rss: 100 * 1024 * 1024, // 100MB in bytes
  external: 20 * 1024 * 1024, // 20MB in bytes
};

process.memoryUsage = jest.fn(() => mockMemoryUsage); 