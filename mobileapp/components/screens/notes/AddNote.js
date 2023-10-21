import React, { useState } from 'react';
import { View, TextInput, StyleSheet, } from 'react-native';
import { Button } from 'react-native-paper';
import { createNote } from '../../../network/useNoteService'
const AddNote = ({ navigation }) => {
    const [header, setHeader] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    const handleAddNote = async () => {
        const newNote = { header, date, comment };
        const userId = "6534075de284f4b7d6093e81" // for test
        console.log('userId', userId);
        const res = await createNote(userId, newNote);
        setHeader('');
        setDate('');
        setComment('');
        navigation.navigate('dailyNotes');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Header"
                value={header}
                onChangeText={(text) => setHeader(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Date"
                value={date}
                onChangeText={(text) => setDate(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Comment"
                value={comment}
                onChangeText={(text) => setComment(text)}
            />
            <Button mode="contained" style={styles.button} onPress={handleAddNote}>Add Note</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
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

export default AddNote;
