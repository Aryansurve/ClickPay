import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const QuickActions = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.action}>
        <MaterialIcons name="qr-code-scanner" size={28} color="black" />
        <Text style={styles.hal}>Scan any QR Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('PayByPhone')}>
        <MaterialIcons name="phone" size={28} color="black" />
        <Text style={styles.hal}>Pay by Phone</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action}>
        <MaterialIcons name="expand-more" size={28} color="black" />
        <Text style={styles.hal}>Show More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
  },
  action: {
    alignItems: 'center',
  },
  hal: {
    padding: 9,
  },
});

export default QuickActions;
