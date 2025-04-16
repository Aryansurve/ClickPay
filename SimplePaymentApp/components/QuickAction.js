

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const QuickActions = ({ navigation }) => {
  const handleImagePick = async () => {
    Alert.alert(
      'Choose Option',
      'Select an image from gallery or take a new picture.',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              quality: 1,
            });

            if (!result.canceled) {
              Alert.alert('File Selected', 'File has been captured/selected.');
              console.log(result.assets[0].uri);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              quality: 1,
            });

            if (!result.canceled) {
              Alert.alert('File Selected', 'File has been picked from gallery.');
              console.log(result.assets[0].uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Camera/Gallery Button */}
      <TouchableOpacity style={styles.action} onPress={handleImagePick}>
        <MaterialIcons name="camera-alt" size={28} color="black" />
        <Text style={styles.hal}>Open Camera</Text>
      </TouchableOpacity>

      {/* Pay by Phone */}
      <TouchableOpacity style={styles.action} onPress={() => navigation.navigate('PayByPhone')}>
        <MaterialIcons name="phone" size={28} color="black" />
        <Text style={styles.hal}>Pay by Phone</Text>
      </TouchableOpacity>

      {/* Show More */}
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
