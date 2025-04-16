
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_URL } from "../lib/config";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrVisible, setQrVisible] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");
        if (!token) {
          Alert.alert("Session Expired", "Please log in again.");
          navigation.replace("SignInScreen");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const userDetails = await response.json();
        if (!response.ok) {
          throw new Error(userDetails.message || "Failed to fetch user data");
        }

        setUser(userDetails);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading Profile...</Text>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: `data:image/png;base64,${user.image}`,
            }}
            style={styles.profileImage}
          />

          {/* QR Code Positioned on Bottom-Right */}
          <TouchableOpacity
            style={styles.qrContainer}
            onPress={() => setQrVisible(true)}
          >
            <Image
              source={{
                uri: `data:image/png;base64,${user.qrCode}`,
              }}
              style={styles.qrCode}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phoneNumber}</Text>
        <Text style={styles.email}>{user.userUPIId}</Text>
      </View>

      <View style={styles.rewards}>
        <Ionicons name="trophy" size={24} color="#FFD700" />
        <Text style={styles.rewardsText}>182 Rewards Earned</Text>
      </View>

      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>Set up payment methods 1/2</Text>
        <View style={styles.paymentOptions}>
          <View style={styles.paymentCard}>
            <MaterialCommunityIcons name="bank" size={30} color="black" />
            <Text>Bank account</Text>
            <Text style={styles.smallText}>1 account</Text>
          </View>
          <View style={styles.paymentCard}>
            <Ionicons name="card" size={30} color="green" />
            <Text>Pay businesses</Text>
            <Text style={styles.smallText}>Debit/credit card</Text>
          </View>
        </View>
      </View>

      <View style={styles.options}>
        <TouchableOpacity>
          <Text style={styles.optionText}>Invite friends, get rewards</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.optionText}>Help and feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ExchangeRates")}
        >
          <Text style={styles.optionText}>Exchange Rates Online</Text>
        </TouchableOpacity>
      </View>

      {/* QR Code Modal */}
      <Modal visible={qrVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your QR Code</Text>
            <Image
              source={{
                uri: `data:image/png;base64,${user.qrCode}`,
              }}
              style={styles.qrImage}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setQrVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 20,
  },
  profileTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 10 },
  profileSection: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold", marginTop: 10 },
  phone: { fontSize: 16, color: "gray" },
  email: { fontSize: 16, color: "gray" },
  rewards: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  rewardsText: { marginLeft: 10, fontSize: 16, fontWeight: "bold" },
  paymentSection: { backgroundColor: "#fff", padding: 15, borderRadius: 10 },
  paymentTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  paymentOptions: { flexDirection: "row", justifyContent: "space-between" },
  paymentCard: { alignItems: "center" },
  smallText: { fontSize: 12, color: "gray" },
  options: { marginTop: 20 },
  optionText: { fontSize: 16, paddingVertical: 10, color: "blue" },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  qrImage: { width: 200, height: 200, marginBottom: 15 },
  closeButton: { backgroundColor: "#007BFF", padding: 10, borderRadius: 5 },
  closeButtonText: { color: "#fff", fontSize: 16 },
  qrContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 5,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  qrCode: {
    width: 20,
    height: 20,
  },

  // Slightly larger for better visibility
});

export default ProfileScreen;
