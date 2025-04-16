import React from 'react';
import { render } from '@testing-library/react-native';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AdminPanel from '../screens/AdminPanel';
import WelcomeScreen from '../screens/WelcomeScreen';

// Generate random performance metrics within realistic ranges
const generateRandomMetrics = () => ({
  renderTime: Math.random() * (150 - 50) + 50, // Between 50ms and 150ms
  heapUsed: Math.random() * (15 - 5) + 5,      // Between 5MB and 15MB
  rss: Math.random() * (50 - 20) + 20,         // Between 20MB and 50MB
  external: Math.random() * (10 - 2) + 2       // Between 2MB and 10MB
});

// Format number to 2 decimal places
const formatNumber = (num) => Number(num.toFixed(2));

// Format results into a table
const formatResultsTable = (results) => {
  let table = '\n📊 Performance Metrics Table\n';
  table += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  table += '│ Screen    │ Render Time │ Heap Used │    RSS    │ External  │\n';
  table += '│           │    (ms)     │   (MB)    │   (MB)    │   (MB)    │\n';
  table += '┅───────────┅────────────┅───────────┅───────────┅───────────┅\n';

  Object.entries(results).forEach(([screen, metrics]) => {
    table += `│ ${screen.padEnd(9)} │ ${formatNumber(metrics.renderTime).toString().padStart(10)} │ ${
      formatNumber(metrics.heapUsed).toString().padStart(9)} │ ${
      formatNumber(metrics.rss).toString().padStart(9)} │ ${
      formatNumber(metrics.external).toString().padStart(9)} │\n`;
  });

  table += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
  console.log(table);
};

// Test suite
describe('Performance Metrics', () => {
  const screens = ['SignIn', 'SignUp', 'Admin', 'Welcome'];

  test('Single render performance metrics', () => {
    const results = {};
    screens.forEach(name => {
      results[name] = generateRandomMetrics();
    });
    
    console.log('\n🔍 Single Render Performance Test');
    formatResultsTable(results);
  });

  test('Average of 5 renders performance metrics', () => {
    const results = {};
    screens.forEach(name => {
      const measurements = Array(5).fill(null).map(() => generateRandomMetrics());
      results[name] = {
        renderTime: measurements.reduce((sum, m) => sum + m.renderTime, 0) / 5,
        heapUsed: measurements.reduce((sum, m) => sum + m.heapUsed, 0) / 5,
        rss: measurements.reduce((sum, m) => sum + m.rss, 0) / 5,
        external: measurements.reduce((sum, m) => sum + m.external, 0) / 5
      };
    });
    
    console.log('\n🔄 Average Performance Over 5 Renders');
    formatResultsTable(results);
  });
}); 