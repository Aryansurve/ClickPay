// test/startup.test.js
import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../App';
import { View, Text } from 'react-native';

// Mock all required components and modules
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome',
  AntDesign: 'AntDesign',
}));

// Mock all screen components
jest.mock('../screens/DashBoard', () => 'DashboardScreen');
jest.mock('../screens/LandingPage', () => 'LandingPage');
jest.mock('../screens/PayByPhone', () => 'PayByPhone');
jest.mock('../screens/ProfileScreen', () => 'ProfileScreen');
jest.mock('../screens/PaymentScreen', () => 'PaymentScreen');
jest.mock('../screens/LoginScreen', () => 'LoginScreen');
jest.mock('../screens/SignUpScreen', () => 'SignUpScreen');
jest.mock('../screens/WelcomeScreen', () => 'WelcomeScreen');
jest.mock('../screens/SignInScreen', () => 'SignInScreen');
jest.mock('../screens/AdminPanel', () => 'AdminPanel');
jest.mock('../screens/ExchangeRatesScreen', () => 'ExchangeRatesScreen');
jest.mock('../screens/BankBalanceScreen', () => 'BankBalanceScreen');

// Create a simple mock component for testing
const MockComponent = () => (
  <View>
    <Text>Mock Component</Text>
  </View>
);

describe('App Performance Tests', () => {
  test('App renders within acceptable time', () => {
    const startTime = performance.now();
    
    TestRenderer.create(<App />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`App render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(1000);
  });
});

describe('Performance Tests', () => {
  test('Mock component renders within acceptable time', () => {
    const startTime = performance.now();
    
    TestRenderer.create(<MockComponent />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`Mock component render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(1000);
  });
});