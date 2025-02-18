import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Ensure the Back Button Works */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.profileTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <Ionicons name="person-circle" size={80} color="#aaa" />
        <Text style={styles.name}>Justin Folly</Text>
        <Text style={styles.phone}>+91 9512345678</Text>
        <Text style={styles.email}>justinfolly123@oksbi</Text>
      </View>

      <View style={styles.rewards}>
        <Ionicons name="trophy" size={24} color="#FFD700" />
        <Text style={styles.rewardsText}>182 Rewards Earned</Text>
      </View>

      <View style={styles.paymentSection}>
        <Text style={styles.paymentTitle}>Set up payment methods 1/2</Text>
        <View style={styles.paymentOptions}>
          <View style={styles.paymentCard}>
            <Ionicons name="bank" size={24} color="blue" />
            <Text>Bank account</Text>
            <Text style={styles.smallText}>1 account</Text>
          </View>
          <View style={styles.paymentCard}>
            <Ionicons name="card" size={24} color="green" />
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
      </View>
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
});

export default ProfileScreen;
