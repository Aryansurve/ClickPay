import React from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const contacts = [
  { id: '1', name: 'Kaira', number: '+91 9512345678', image: null },
  { id: '2', name: 'Revan', number: '+91 9512345678', image: null },
  { id: '3', name: 'Scott', number: '+91 9512345678', image: null },
  { id: '4', name: 'Alex', number: '+91 9512345678', image: null },
  { id: '5', name: 'Elly', number: '+91 9512345678', image: null },
  { id: '6', name: 'Jack', number: '+91 9512345678', image: null },
  { id: '7', name: 'Nia', number: '+91 9512345678', image: null },
  { id: '8', name: 'Sophia', number: '+91 9512345678', image: null },
];

const PayByPhone = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay by Phone</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={24} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mobile number"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>People and Bills</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabInactive}>
          <Text style={styles.tabTextInactive}>Businesses</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="smartphone" size={28} color="black" />
          <Text style={styles.actionText}>Mobile Recharge</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialIcons name="receipt" size={28} color="black" />
          <Text style={styles.actionText}>Bill Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Contacts List */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.contactItem}>
            <View style={styles.contactPlaceholder}>
              <Text style={styles.contactInitial}>{item.name[0]}</Text>
            </View>
            <View>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactNumber}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  tabTextActive: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabTextInactive: {
    fontSize: 16,
    color: '#757575',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contactInitial: {
    fontSize: 18,
    color: '#757575',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 14,
    color: '#757575',
  },
});

export default PayByPhone;
