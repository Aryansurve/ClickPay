
import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

const API_KEY = "c28b05971a47809998445298"; // Replace with your API key
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const currencyOptions = [
  { label: "🇺🇸 USD", value: "USD" },
  { label: "🇮🇳 INR", value: "INR" },
  { label: "🇪🇺 EUR", value: "EUR" },
  { label: "🇬🇧 GBP", value: "GBP" },
  { label: "🇨🇦 CAD", value: "CAD" },
  { label: "🇦🇺 AUD", value: "AUD" },
  { label: "🇯🇵 JPY", value: "JPY" },
  { label: "🇨🇭 CHF", value: "CHF" },
  { label: "🇸🇬 SGD", value: "SGD" },
  { label: "🇧🇷 BRL", value: "BRL" },
  { label: "🇿🇦 ZAR", value: "ZAR" },
  { label: "🇲🇽 MXN", value: "MXN" },
  { label: "🇷🇺 RUB", value: "RUB" },
  { label: "🇨🇳 CNY", value: "CNY" },
  { label: "🇭🇰 HKD", value: "HKD" },
  { label: "🇹🇭 THB", value: "THB" },
  { label: "🇲🇾 MYR", value: "MYR" },
  { label: "🇦🇪 AED", value: "AED" },
  { label: "🇳🇿 NZD", value: "NZD" },
  { label: "🇸🇪 SEK", value: "SEK" },
  { label: "🇳🇴 NOK", value: "NOK" },
  { label: "🇰🇷 KRW", value: "KRW" },
];

const ExchangeRates = () => {
  const navigation = useNavigation();

  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("1");
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    if (rates) {
      updateConversionResult();
    }
  }, [fromCurrency, toCurrency, amount, rates]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched Exchange Rates:      ", response.data); 
      setRates(response.data.conversion_rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateConversionResult = () => {
    if (rates) {
      const rate = (1 / rates[fromCurrency]) * rates[toCurrency];
      setConversionResult((amount * rate).toFixed(4));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Exchange Rates</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          <Text style={styles.label}>Enter Amount:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Text style={styles.label}>From:</Text>
          <RNPickerSelect
            onValueChange={(value) => setFromCurrency(value)}
            items={currencyOptions}
            value={fromCurrency}
            style={pickerSelectStyles}
          />

          <Text style={styles.label}>To:</Text>
          <RNPickerSelect
            onValueChange={(value) => setToCurrency(value)}
            items={currencyOptions}
            value={toCurrency}
            style={pickerSelectStyles}
          />

          <Text style={styles.result}>
            {amount} {fromCurrency} = {conversionResult} {toCurrency}
          </Text>
        </>
      )}
    </ScrollView>
  );
};

export default ExchangeRates;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef2f3",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 200,
    textAlign: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2e86de",
    marginTop: 20,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 200,
    textAlign: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  inputAndroid: {
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 200,
    textAlign: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
  },
};
