// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
// import { BASE_URL } from "../lib/config";


// const BankBalanceScreen = ({ route, navigation }) => {
//   const { token } = route.params;
//   const [balance, setBalance] = useState(null);
//   const [loading, setLoading] = useState(true);




//   useEffect(() => {
//     const fetchWalletBalance = async () => {
//       try {
//         if (!token) {
//           Alert.alert("Session Expired", "Please log in again.");
//           navigation.replace("SignInScreen");
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/api/transactions/balance`, {
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const result = await response.json();
//         if (!response.ok) {
//           throw new Error(result.message || "Failed to fetch balance");
//         }

//         setBalance(result.balance);
//       } catch (err) {
//         console.error("Error fetching balance:", err);
//         Alert.alert("Error", "Failed to load balance");
//       } finally {
//         setLoading(false); // Ensure loading stops after fetching
//       }
//     };

//     fetchWalletBalance();
//   }, [token]);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#007BFF" />
//       ) : (
//         <View style={styles.card}>
//           <Text style={styles.title}>Bank Balance</Text>
//           <Text style={styles.balance}>₹ {balance?.toLocaleString('en-IN')}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' },
//   card: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, elevation: 5, alignItems: 'center' },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
//   balance: { fontSize: 30, color: '#007BFF', fontWeight: 'bold' },
// });

// export default BankBalanceScreen;


import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { BASE_URL } from "../lib/config";

const BankBalanceScreen = ({ route, navigation }) => {
  const { token } = route.params;
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        if (!token) {
          Alert.alert("Session Expired", "Please log in again.");
          navigation.replace("SignInScreen");
          return;
        }

        // Update the endpoint to fetch balance from Wallet model
        const response = await fetch(`${BASE_URL}/api/payments/balance`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch balance");
        }

        setBalance(result.balance);
      } catch (err) {
        console.error("Error fetching balance:", err);
        Alert.alert("Error", "Failed to load balance");
      } finally {
        setLoading(false); // Ensure loading stops after fetching
      }
    };

    fetchWalletBalance();
  }, [token]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>Bank Balance</Text>
          <Text style={styles.balance}>₹ {balance?.toLocaleString('en-IN')}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F8F8' },
  card: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, elevation: 5, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  balance: { fontSize: 30, color: '#007BFF', fontWeight: 'bold' },
});

export default BankBalanceScreen;
