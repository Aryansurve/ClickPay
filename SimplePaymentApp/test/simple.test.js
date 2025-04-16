// test/simple.test.js
import React from 'react';
import { View, Text } from 'react-native';
import { render } from '@testing-library/react-native';

const SimpleComponent = () => (
  <View>
    <Text>Hello, world!</Text>
  </View>
);

describe('Simple Component Test', () => {
  test('renders correctly', () => {
    const { getByText } = render(<SimpleComponent />);
    expect(getByText('Hello, world!')).toBeTruthy();
  });
});