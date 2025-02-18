import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // This ensures navigation works

  return (
    <View style={styles.header}>
      <Image source={require('../assets/indian-rupee.jpg')} style={styles.logo} />
      <Text style={styles.title}>ClickPay</Text>
      
      {/* Profile Icon with Navigation */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-circle" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Header;
