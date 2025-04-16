import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

const OTPVerificationScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const verifyOTP = () => {
    const enteredOtp = otp.join("");
    
    if (enteredOtp === "123456") {
      Alert.alert("Success", "OTP Verified Successfully!");
      navigation.navigate("Dashboard");
} else {
      Alert.alert("Invalid OTP", "Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your number</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to your phone</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={verifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        Having trouble? <Text style={styles.resendLink}>Resend OTP</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  otpContainer: { flexDirection: "row", justifyContent: "center" },
  otpInput: { 
    width: 40, height: 50, 
    fontSize: 20, textAlign: "center", 
    borderBottomWidth: 2, borderColor: "#007BFF",
    marginHorizontal: 5 
  },
  button: { width: "80%", paddingVertical: 12, backgroundColor: "#007BFF", borderRadius: 10, alignItems: "center", marginTop: 20 },
  buttonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  resendText: { marginTop: 20, fontSize: 14, color: "#666" },
  resendLink: { color: "#007BFF", fontWeight: "bold" },
});

export default OTPVerificationScreen;