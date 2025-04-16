import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../lib/config";

//const BASE_URL = "http://192.168.0.143:5000";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
  
    setLoading(true);
  
    try {
      //console.log("📤 Sending Registration Request...");
      
      const response = await fetch(`${BASE_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          phoneNumber,
          email,
          password,
        }),
      });
  
      //console.log("🛬 Received Registration Response...");
      
      const data = await response.json();
      //console.log("📜 Response Data:", data);
  
      if (response.ok) {
        //console.log("✅ Registration Successful!");
        
        //console.log("🔐 JWT Token Received:", data.token);
        
        // ✅ Store JWT Token
        await AsyncStorage.setItem("jwt_token", data.token);
  
        // 🔍 Verify if token was stored correctly
        const storedToken = await AsyncStorage.getItem("jwt_token");
        //console.log("🗄️ Stored Token in AsyncStorage:", storedToken);
  
        // ✅ Navigate after successful registration
        navigation.replace("Dashboard");
      } else {
        console.error("❌ Registration Failed:", data.message);
        Alert.alert("Error", data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("🚨 Registration error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  
    setLoading(false);
  };
  
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate("Welcome")}
            >
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>

            {/* Heading */}
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to continue</Text>

            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* Terms & Conditions */}
            <Text style={styles.termsText}>
              By signing up, you agree to our
              <Text style={styles.linkText}> Terms & Conditions</Text> and
              <Text style={styles.linkText}> Privacy Policy</Text>.
            </Text>

            {/* Register Button */}
            <TouchableOpacity
              style={styles.createAccountButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.createAccountText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* OR Divider */}
            <View style={styles.orContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            {/* Google Sign-In Button */}
            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={require("../assets/google.png")}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Sign up with Google</Text>
            </TouchableOpacity>

            {/* Already have an account? */}
            <Text style={styles.signInText}>
              Already have an account?
              <Text
                style={styles.signInLink}
                onPress={() => navigation.navigate("Signin")}
              >
                {" "}
                Log in
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 80,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  termsText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  linkText: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
  createAccountButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 16,
    width: "100%",
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 10,
  },
  createAccountText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#999",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 30,
    justifyContent: "center",
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: "#333",
  },
  signInText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 15,
  },
  signInLink: {
    color: "#1E3A8A",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
