// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from "../lib/config";


// const Header = () => {
//   const navigation = useNavigation();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = await AsyncStorage.getItem("jwt_token");
//         if (!token) {
//           Alert.alert("Session Expired", "Please log in again.");
//           navigation.replace("SignInScreen");
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/api/users/profile`, { // Correct API endpoint
//           method: "GET",
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const userDetails = await response.json();
//         if (!response.ok) {
//           throw new Error(userDetails.message || "Failed to fetch user data");
//         }

//         setUser(userDetails); // Now user is correctly set
//       } catch (err) {
//         console.error("Error fetching user details:", err);
//         setError("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   return (
//     <View style={styles.header}>
//       <Image source={require('../assets/indian-rupee.jpg')} style={styles.logo} />
//       <Text style={styles.title}>ClickPay</Text>

//       {/* Show Loading Indicator while fetching data */}
//       {loading ? (
//         <ActivityIndicator size="small" color="black" />
//       ) : (
//         <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
//           {user && user.image ? (
//             <Image source={{ uri: `${BASE_URL}${user.image}` }} style={styles.profileImage} />
//           ) : (
//             <Ionicons name="person-circle" size={32} color="black" />
//           )}
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 30,
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: 30,
//     height: 30,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//   },
//   profileImage: {
//     width: 30,
//     height: 30,
//     borderRadius: 20,
//   },
// });

// export default Header;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../lib/config";

const Header = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");
        if (!token) {
          Alert.alert("Session Expired", "Please log in again.");
          navigation.replace("SignInScreen");
          return;
        }

        const response = await fetch(`${BASE_URL}/api/users/profile`, { // Correct API endpoint
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const userDetails = await response.json();
        if (!response.ok) {
          throw new Error(userDetails.message || "Failed to fetch user data");
        }

        setUser(userDetails); // Now user is correctly set
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.header}>
      <Image source={require('../assets/indian-rupee.jpg')} style={styles.logo} />
      <Text style={styles.title}>ClickPay</Text>

      {/* Show Loading Indicator while fetching data */}
      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          {user && user.image ? (
            <Image source={{ uri: `data:image/png;base64,${user.image}` }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle" size={32} color="black" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  logo: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
  },
});

export default Header;
