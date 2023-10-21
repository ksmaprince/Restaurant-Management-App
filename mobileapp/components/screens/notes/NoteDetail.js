import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
export default function NoteDetail({ navigation }) {
    // data will from dailynotes
    const [state, State] = useState({ header: '', date: '' });

    return (
        <View>
            <Text
                placeholder="Header"
                value={state.header}
            />
            <Text
                placeholder="Date"
                value={state.date}
            />
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