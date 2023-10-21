import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function NoteDetail({ navigation, route }) {
    // data will from dailynotes
    console.log('params:', route.params);
    const { header, date, comment } = route.params;
    const [state, setState] = useState({ header: route.params.header, date: route.params.date });
    return (
        // <View>
        //     <Text>{state.header}</Text>
        //     <Text>{state.date}</Text>
        // </View>
        <View style={styles.container}>
            <Text style={styles.input}>{header}</Text>
            <Text style={styles.input}>{date}</Text>
            <Text style={styles.input}>{comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        borderRadius: 50,
    },
    edges: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        minWidth: 50,
    },
    input: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3498db', // Customize the button color
    },
});