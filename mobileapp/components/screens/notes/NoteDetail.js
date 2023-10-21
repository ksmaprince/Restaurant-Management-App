import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function NoteDetail({ navigation, route }) {
    // Data will be from dailynotes
    const { header, date, comment } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Header:</Text>
                <Text style={styles.value}>{header}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Date:</Text>
                <Text style={styles.value}>{date}</Text>
            </View>
            <View style={{ ...styles.infoContainer, height: 80 }}>
                <Text style={styles.label}>Comment:</Text>
                <Text style={styles.value}>{comment}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff', // Background color of the notepad
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    infoContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f5f5f5', // Light gray background for each piece of information
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
    },
});
