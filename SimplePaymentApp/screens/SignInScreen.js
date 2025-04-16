import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { Ionicons } from "@expo/vector-icons"; 
import { BASE_URL } from "../lib/config";

//const BASE_URL = "http://192.168.0.143:5000";

import { userRoute } from "@react-navigation/native";
const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handle login
  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        Alert.alert("Login Failed", data.message);
        return;
      }

      // ✅ Store JWT Token
      await AsyncStorage.setItem("jwt_token", data.token);

      // ✅ Redirect based on user type
      if (data.isAdmin) {
        navigation.replace("AdminPanel", { token: data.token }); // Admin goes to Admin Panel
      } else {
        navigation.replace("Dashboard"); // Normal user goes to Dashboard
      }

    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Welcome')}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Heading */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.loginText}>{loading ? "Signing In..." : "Sign In"}</Text>
      </TouchableOpacity>

      {/* Sign Up Redirect */}
      <Text style={styles.signUpText}>
        Don't have an account?
        <Text style={styles.signUpLink} onPress={() => navigation.navigate("Signup")}> Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F5F7FA", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 20 
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 5 
  },
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    marginBottom: 20 
  },
  input: { 
    width: "100%", 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 15, 
    elevation: 2 
  },
  loginButton: { 
    backgroundColor: "#1E3A8A", 
    paddingVertical: 14, 
    width: "100%", 
    borderRadius: 25, 
    alignItems: "center",
    marginBottom: 10
  },
  loginText: { 
    fontSize: 18, 
    color: "#fff", 
    fontWeight: "bold" 
  },
  signUpText: { 
    fontSize: 14, 
    color: "#666", 
    marginTop: 15 
  },
  signUpLink: { 
    color: "#1E3A8A", 
    fontWeight: "bold" 
  },
});

export default SignInScreen;
