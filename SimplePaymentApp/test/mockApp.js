// test/mockApp.js
import React from 'react';
import { View, Text } from 'react-native';

export default function MockApp() {
  return (
    <View>
      <Text>Mock App for Performance Testing</Text>
    </View>
  );
}

// test/startup.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import MockApp from './mockApp';

describe('App Performance Tests', () => {
  test('App renders within acceptable time', () => {
    const startTime = performance.now();
    
    render(<MockApp />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    console.log(`App render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(1000);
  });
});