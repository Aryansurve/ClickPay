import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text } from 'react-native';

import Header from '../components/Header';
import QuickActions from '../components/QuickAction';
import PeopleList from '../components/PeopleList';
import BusinessList from '../components/BusinessList';

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Header navigation={navigation} />
      <Image source={require('../assets/bag.png')} style={styles.logo} />
      <QuickActions navigation={navigation} />
      <View style={styles.separator} />
      <PeopleList />
      
      <View style={styles.separator} />
      <BusinessList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  separator: {
    backgroundColor: 'black',
    height: 2,
    marginHorizontal: 10,
    alignSelf: 'center',
    width: '90%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default DashboardScreen;
