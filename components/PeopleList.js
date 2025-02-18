import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const BASE_URL = "http://192.168.0.143:5000"; // Update with your backend IP

const PeopleList = () => {
    const navigation = useNavigation();
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        fetch(`${BASE_URL}/api/users`)
            .then(response => response.json())
            .then(data => {
                setPeople(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setError("Failed to load users");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
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

    // **Initial Display Logic**
    const firstRow = people.slice(0, 4); // First 4 users
    const secondRow = showAll ? people.slice(4) : people.slice(4, 7); // Next 3 users (before clicking Show More)
    const remainingUsers = showAll ? [] : people.slice(7); // Remaining users to load after clicking Show More

    return (
        <View style={styles.container}>
            <Text style={styles.title}>People</Text>

            {/* First Row (Always 4 Users) */}
            <View style={styles.row}>
                {firstRow.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        style={styles.userContainer}
                        onPress={() => navigation.navigate('PaymentScreen', { person: item })}
                    >
                        <Image 
                            source={{ uri: `${BASE_URL}${item.image}` }}
                            style={styles.userImage} 
                            onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
                        />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Second Row (3 Users + Show More Button) */}
            <View style={styles.row}>
                {secondRow.map((item) => (
                    <TouchableOpacity
                        key={item._id}
                        style={styles.userContainer}
                        onPress={() => navigation.navigate('PaymentScreen', { person: item })}
                    >
                        <Image 
                            source={{ uri: `${BASE_URL}${item.image}` }}
                            style={styles.userImage} 
                            onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
                        />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))}

                {/* Show More Button (Only if there are remaining users) */}
                {!showAll && remainingUsers.length > 0 && (
                    <TouchableOpacity 
                        style={styles.showMoreContainer} 
                        onPress={() => setShowAll(true)}
                    >
                        <MaterialIcons name="expand-more" size={35} color="black" />
                        <Text style={styles.showMoreText}>Show More</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Render Remaining Users After Clicking "Show More" */}
            {showAll && (
                <View>
                    {remainingUsers.map((item, index) => (
                        <View key={index} style={styles.row}>
                            <TouchableOpacity
                                style={styles.userContainer}
                                onPress={() => navigation.navigate('PaymentScreen', { person: item })}
                            >
                                <Image 
                                    source={{ uri: `${BASE_URL}${item.image}` }}
                                    style={styles.userImage} 
                                    onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
                                />
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    userContainer: {
        alignItems: 'center',
        width: '22%',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    showMoreContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '22%',
    },
    showMoreText: {
        marginTop: 5,
        fontSize: 12, // Adjusted font size for better alignment
        textAlign: 'center',
    },
});

export default PeopleList;
