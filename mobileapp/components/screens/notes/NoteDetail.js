import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function NoteDetail({ navigation, note }) {
    // data will from dailynotes
    const [state, setState] = useState({ header: note.header, date: note.date });
    console.log('aaaaaaaaaaaaaa', note)
    return (
        <View>
            <Text>{state.header}</Text>
            <Text>{state.date}</Text>
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
});