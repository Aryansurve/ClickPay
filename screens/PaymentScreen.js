import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Importing back button icon

const PersonDetails = ({ route }) => {
  const navigation = useNavigation();
  const { person } = route.params;
  const [showMessageInput, setShowMessageInput] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image source={person.image} style={styles.smallProfileImage} />
        <Text style={styles.headerName}>{person.name}</Text>
      </View>

      {/* Payments Section */}
      <View style={styles.paymentSection}>
        <View style={[styles.paymentCard, styles.paymentToYou, styles.leftAlign]}>
          <Text style={styles.amountText}>₹ 200</Text>
          <Text style={styles.paymentType}>Payment to you</Text>
          <Text style={styles.dateText}>Paid - 10 Jan</Text>
        </View>

        <View style={[styles.paymentCard, styles.paymentToThem, styles.rightAlign]}>
          <Text style={styles.amountText}>₹ 5300</Text>
          <Text style={styles.paymentType}>Payment to {person.name}</Text>
          <Text style={styles.dateText}>Paid - 15 Jan</Text>
        </View>

        <View style={[styles.paymentCard, styles.paymentToThem, styles.rightAlign]}>
          <Text style={styles.amountText}>₹ 1200</Text>
          <Text style={styles.paymentType}>Payment to {person.name}</Text>
          <Text style={styles.dateText}>Paid - 15 Jan</Text>
        </View>

        <View style={[styles.paymentCard, styles.paymentToYou, styles.leftAlign]}>
          <Text style={styles.amountText}>₹ 500</Text>
          <Text style={styles.paymentType}>Payment to you</Text>
          <Text style={styles.dateText}>Paid - 20 Jan</Text>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => setShowMessageInput(true)}
        >
          <Text style={styles.messageText}>Message...</Text>
        </TouchableOpacity>
      </View>

      {/* Message Input */}
      {showMessageInput && (
        <KeyboardAvoidingView behavior="padding" style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            placeholder="Enter amount"
            keyboardType="numeric" // Ensures only numbers are allowed
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              setShowMessageInput(false);
              console.log("Sent message:", message);
            }}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  smallProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentSection: {
    flex: 1,
  },
  paymentCard: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    width: '48%',
  },
  paymentToYou: {
    backgroundColor: '#E5E5E5',
  },
  paymentToThem: {
    backgroundColor: '#D4F7DC',
  },
  leftAlign: {
    alignSelf: 'flex-start',
  },
  rightAlign: {
    alignSelf: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentType: {
    fontSize: 14,
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 10,
  },
  messageText: {
    color: '#000',
    fontSize: 16,
  },
  messageInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PersonDetails;
