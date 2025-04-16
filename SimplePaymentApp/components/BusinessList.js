import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BASE_URL } from "../lib/config";

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(`${BASE_URL}/api/businesses`)
            .then(response => response.json())
            .then(data => {
                setBusinesses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching businesses:", err);
                setError("Failed to load businesses");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading Businesses...</Text>
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Businesses and Bills</Text>
            <View style={styles.grid}>
                {businesses.map((item) => (
                    <View key={item._id} style={styles.businessContainer}>
                        <Image 
                            source={{ uri: `${BASE_URL}${item.image}` }}
                            style={styles.businessImage} 
                            resizeMode="contain"
                            onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
                        />
                        <Text style={styles.businessText}>{item.name}</Text>
                    </View>
                ))}
                {/* Show More Option */}
                <TouchableOpacity style={styles.businessContainer}>
                    <MaterialIcons name="expand-more" size={35} color="black" />
                    <Text style={styles.businessText}>Show More</Text>
                </TouchableOpacity>
            </View>
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
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',  
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    businessContainer: {
        alignItems: 'center',
        width: '22%',  // Adjusted width for 4 items per row
        marginBottom: 15,
    },
    businessImage: {
        width: 60, // Standardized image size
        height: 60, 
        borderRadius: 10,  
        backgroundColor: '#f0f0f0',
    },
    businessText: {
        marginTop: 5,
        fontSize: 12, // Adjusted font size for better alignment
        textAlign: 'center',
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
});

export default BusinessList;
