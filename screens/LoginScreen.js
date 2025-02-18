import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { auth } from "../firebaseConfig";
import { signInWithPhoneNumber } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleNext = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("Invalid Number", "Please enter a valid phone number.");
      return;
    }
    try {
      setLoading(true);
      const formattedNumber = `${countryCode}${phoneNumber}`.replace(/\s+/g, "").trim();
      const confirmationResult = await signInWithPhoneNumber(auth, formattedNumber);
      setConfirmation(confirmationResult);
      setLoading(false);
      navigation.navigate("OTPVerificationScreen", { confirmation: confirmationResult });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", error.message || "Failed to send OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/clickpaylogo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to ClickPay</Text>
      <Text style={styles.subtitle}>Enter your phone number to continue</Text>

      <View style={styles.phoneContainer}>
        <TextInput
          style={styles.countryCodeInput}
          value={countryCode}
          onChangeText={(code) => setCountryCode(code.startsWith("+") ? code : `+${code}`)}
          keyboardType="phone-pad"
          maxLength={4}
        />
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text.replace(/\D/g, ""))}
          keyboardType="number-pad"
          maxLength={15}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: phoneNumber.length >= 10 ? "#007BFF" : "#ccc" }]}
        onPress={handleNext}
        disabled={loading || phoneNumber.length < 10}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Next</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "center", padding: 20 },
  logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  phoneContainer: { flexDirection: "row", width: "100%", backgroundColor: "#fff", borderRadius: 10, padding: 10, alignItems: "center", marginBottom: 20 },
  countryCodeInput: { width: 50, fontSize: 16, fontWeight: "bold", color: "#333", textAlign: "center", borderRightWidth: 1, borderRightColor: "#ccc", marginRight: 10 },
  phoneInput: { flex: 1, fontSize: 16, color: "#333" },
  button: { width: "100%", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});

export default LoginScreen;
















// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet
// } from "react-native";

// const LoginScreen = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [countryCode, setCountryCode] = useState("+91");

//   const handleNext = () => {
//     const formattedNumber = `${countryCode}${phoneNumber}`.replace(/\s+/g, "").trim();
//     navigation.navigate("OTPVerificationScreen");
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require("../assets/clickpaylogo.png")} style={styles.logo} />
//       <Text style={styles.title}>Welcome to ClickPay</Text>
//       <Text style={styles.subtitle}>Enter your phone number to continue</Text>

//       <View style={styles.phoneContainer}>
//         <TextInput
//           style={styles.countryCodeInput}
//           value={countryCode}
//           onChangeText={(code) => setCountryCode(code.startsWith("+") ? code : `+${code}`)}
//           keyboardType="phone-pad"
//           maxLength={4}
//         />
//         <TextInput
//           style={styles.phoneInput}
//           placeholder="Enter phone number"
//           value={phoneNumber}
//           onChangeText={(text) => setPhoneNumber(text.replace(/\D/g, ""))}
//           keyboardType="number-pad"
//           maxLength={15}
//         />
//       </View>

//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: phoneNumber.length >= 10 ? "#007BFF" : "#ccc" }]}
//         onPress={handleNext}
//         disabled={phoneNumber.length < 10}
//       >
//         <Text style={styles.buttonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "center", padding: 20 },
//   logo: { width: 100, height: 100, resizeMode: "contain", marginBottom: 20 },
//   title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 5 },
//   subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
//   phoneContainer: { flexDirection: "row", width: "100%", backgroundColor: "#fff", borderRadius: 10, padding: 10, alignItems: "center", marginBottom: 20 },
//   countryCodeInput: { width: 50, fontSize: 16, fontWeight: "bold", color: "#333", textAlign: "center", borderRightWidth: 1, borderRightColor: "#ccc", marginRight: 10 },
//   phoneInput: { flex: 1, fontSize: 16, color: "#333" },
//   button: { width: "100%", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
//   buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
// });



// export default LoginScreen;
