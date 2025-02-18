import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './screens/DashBoard';
import LandingPage from './screens/LandingPage';
import PayByPhone from './screens/PayByPhone';
import ProfileScreen from './screens/ProfileScreen';
import PaymentScreen from './screens/PaymentScreen';
import LoginScreen from './screens/LoginScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="PayByPhone" component={PayByPhone} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'PaymentScreen' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
