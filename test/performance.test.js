import { render, fireEvent, cleanup } from '@testing-library/react-native';
import { performance } from 'perf_hooks';
import { View, Text } from 'react-native';

// Mock all required modules
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

// Mock Expo modules
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome',
  AntDesign: 'AntDesign',
}));

jest.mock('expo-constants', () => ({
  manifest: {
    extra: {
      apiUrl: 'http://localhost:3000',
    },
  },
}));

jest.mock('expo-asset', () => ({
  Asset: {
    fromModule: jest.fn(),
  },
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'mock-token' }),
  })
);

// Import screens after mocks
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AdminPanel from '../screens/AdminPanel';

// Helper function to measure memory usage
const measureMemoryUsage = (operation) => {
  const startMemory = process.memoryUsage();
  operation();
  const endMemory = process.memoryUsage();

  return {
    heapUsed: endMemory.heapUsed - startMemory.heapUsed,
    heapTotal: endMemory.heapTotal - startMemory.heapTotal,
    external: endMemory.external - startMemory.external,
    rss: endMemory.rss - startMemory.rss,
  };
};

describe('Authentication Performance Tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('measures SignInScreen memory usage', () => {
    const memoryUsed = measureMemoryUsage(() => {
      render(<SignInScreen />);
    });

    console.log('SignInScreen Memory Usage:');
    console.log(`Heap Used: ${(memoryUsed.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memoryUsed.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(memoryUsed.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(memoryUsed.rss / 1024 / 1024).toFixed(2)} MB`);

    expect(memoryUsed.heapUsed).toBeLessThan(10 * 1024 * 1024); // Less than 10MB
  });

  test('measures SignUpScreen memory usage', () => {
    const memoryUsed = measureMemoryUsage(() => {
      render(<SignUpScreen />);
    });

    console.log('SignUpScreen Memory Usage:');
    console.log(`Heap Used: ${(memoryUsed.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memoryUsed.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(memoryUsed.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(memoryUsed.rss / 1024 / 1024).toFixed(2)} MB`);

    expect(memoryUsed.heapUsed).toBeLessThan(12 * 1024 * 1024); // Less than 12MB
  });

  test('measures SignIn form interaction memory usage', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInScreen />);

    const memoryUsed = measureMemoryUsage(() => {
      fireEvent.changeText(getByPlaceholderText('Email Address'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      fireEvent.press(getByText('Sign In'));
    });

    console.log('SignIn Form Interaction Memory Usage:');
    console.log(`Heap Used: ${(memoryUsed.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memoryUsed.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(memoryUsed.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(memoryUsed.rss / 1024 / 1024).toFixed(2)} MB`);

    expect(memoryUsed.heapUsed).toBeLessThan(5 * 1024 * 1024); // Less than 5MB
  });
});

describe('Admin Panel Performance Tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('measures AdminPanel memory usage', () => {
    const memoryUsed = measureMemoryUsage(() => {
      render(<AdminPanel />);
    });

    console.log('AdminPanel Memory Usage:');
    console.log(`Heap Used: ${(memoryUsed.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memoryUsed.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(memoryUsed.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(memoryUsed.rss / 1024 / 1024).toFixed(2)} MB`);

    expect(memoryUsed.heapUsed).toBeLessThan(15 * 1024 * 1024); // Less than 15MB
  });

  test('measures memory cleanup after component unmount', () => {
    const initialMemory = process.memoryUsage();
    const { unmount } = render(<AdminPanel />);
    unmount();
    const finalMemory = process.memoryUsage();

    const memoryDiff = {
      heapUsed: finalMemory.heapUsed - initialMemory.heapUsed,
      heapTotal: finalMemory.heapTotal - initialMemory.heapTotal,
      external: finalMemory.external - initialMemory.external,
      rss: finalMemory.rss - initialMemory.rss,
    };

    console.log('Memory Usage After Unmount:');
    console.log(`Heap Used: ${(memoryDiff.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Total: ${(memoryDiff.heapTotal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`External: ${(memoryDiff.external / 1024 / 1024).toFixed(2)} MB`);
    console.log(`RSS: ${(memoryDiff.rss / 1024 / 1024).toFixed(2)} MB`);

    expect(memoryDiff.heapUsed).toBeLessThan(2 * 1024 * 1024); // Less than 2MB
  });
});