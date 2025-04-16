
// export default PeopleList;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons
import { BASE_URL } from "../lib/config";


const PeopleList = ({ token, senderId, senderName, senderImage }) => {
  // Accept sender details as props
  const navigation = useNavigation();
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
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

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }

        setPeople(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

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

  let displayedUsers = people.slice(0, showAll ? people.length : 7);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>People</Text>

      {/* Display users in rows of 4 */}
      {displayedUsers.map((_, index) =>
        index % 4 === 0 ? (
          <View
            key={`row-${index}`}
            style={[
              styles.row,
              index + 4 >= displayedUsers.length &&
              displayedUsers.length % 4 <= 2 // Last row with ≤2 users
                ? styles.lastRow
                : {},
            ]}
          >
            {displayedUsers.slice(index, index + 4).map((user, userIndex) => (
              <UserItem
                key={`user-${user?._id || userIndex}`}
                user={user}
                senderId={senderId} // Pass sender details to UserItem
                senderName={senderName}
                senderImage={senderImage}
                token={token}
                navigation={navigation}
              />
            ))}

            {/* Show More / Show Less Button at last row */}
            {index + 4 >= displayedUsers.length && (
              <TouchableOpacity
                style={styles.userContainer}
                onPress={() => setShowAll(!showAll)}
              >
                <MaterialIcons
                  name={showAll ? "expand-less" : "expand-more"}
                  size={35}
                  color="black"
                />
                <Text style={styles.userName}>
                  {showAll ? "Show Less" : "Show More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null
      )}
    </View>
  );
};

const UserItem = ({ user, navigation, token }) => {
  if (!user) return null;

  const receiverId = user._id || user.id; // Handle both cases

  const handlePress = () => {
    if (!receiverId) {
      console.error("ERROR: User ID is missing! Cannot navigate.", user);
      return;
    }

    console.log("DEBUG: Navigating to PaymentScreen with Receiver ID:", receiverId);

    navigation.navigate("PaymentScreen", {
      token,
      receiverId, // Use the extracted receiverId
      receiverName: user?.name || "Unknown",
      receiverPhoneNumber: user?.phoneNumber || "N/A",
      receiverImage: `data:image/png;base64,${user.image}` || "",
    });
  };

  return (
    <TouchableOpacity style={styles.userContainer} onPress={handlePress}>
      <Image source={{ uri: `data:image/png;base64,${user.image}` }} style={styles.userImage} />
      <Text style={styles.userName}>{user.name || "Unknown"}</Text>
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  lastRow: {
    justifyContent: "flex-start",
    gap: 15, // Align only last row when it has ≤2 users
  },
  userContainer: {
    alignItems: "center",
    width: "22%",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
  },
  userName: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
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
});

export default PeopleList;
