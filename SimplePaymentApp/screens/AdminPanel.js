import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL } from "../lib/config";


const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("jwt_token");
      if (!token) {
        setError("Unauthorized. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/users/all-users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to load users");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format");

        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem("jwt_token");
            const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Failed to delete user");

            setUsers(users.filter((user) => user._id !== userId));
            Alert.alert("Success", "User deleted successfully.");
          } catch (err) {
            Alert.alert("Error", "Failed to delete user.");
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading Users...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Panel</Text>
      <Text style={styles.user}>Users</Text>
      <ScrollView>
        {users.map((user) => (
          <TouchableOpacity
            key={user._id}
            style={styles.userCard}
            activeOpacity={0.7}
            onPress={() => setSelectedUser(user)}
          >
            <Image source={{ uri: `data:image/png;base64,${user.image}` }} style={styles.userImage} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name || "Unknown"}</Text>
              <Text style={styles.userEmail}>{user.email || "No Email"}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteUser(user._id)} style={styles.deleteButton}>
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for User Details */}
      {selectedUser && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Image
  source={{ uri: `data:image/png;base64,${selectedUser.image}` }}
  style={styles.modalImage}
/>

              <Text style={styles.modalName}>{selectedUser.name}</Text>
              <Text>Email: {selectedUser.email}</Text>
              <Text>Phone: {selectedUser.phone}</Text>
              <Text>Balance: ₹{selectedUser.balance}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedUser(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 15,
    marginTop: 23,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007BFF",
  },
  user:{
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 20,
    fontWeight: "bold",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#343A40",
  },
  userEmail: {
    fontSize: 11,
    color: "#6C757D",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 6,
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AdminPanel;
