import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { createNote } from '../../../network/useNoteService';
import { TextInput as PaperTextInput } from 'react-native-paper';
const AddNote = ({ navigation }) => {
    const [header, setHeader] = useState('');
    const [date, setDate] = useState('');
    const [comment, setComment] = useState('');

    const handleAddNote = async () => {
        if (!header || !date || !comment) {
            alert("please fill the form");
            return;
        }

        const newNote = { header, date, comment };
        const userId = "6534075de284f4b7d6093e81"; // for test
        console.log('userId', userId);
        const res = await createNote(userId, newNote);
        setHeader('');
        setDate('');
        setComment('');
        navigation.navigate('dailyNotes');
    };

    return (
        <View style={styles.container}>
            <PaperTextInput
                style={styles.infoContainer}
                label="Header"
                value={header}
                onChangeText={(text) => setHeader(text)}
                required
            />
            <PaperTextInput
                style={styles.infoContainer}
                label="Date"
                value={date}
                onChangeText={(text) => setDate(text)}
                required
            />
            <PaperTextInput
                style={{ ...styles.infoContainer, height: 80 }}
                label="Comment"
                value={comment}
                onChangeText={(text) => setComment(text)}
                required
            />
            <Button mode="contained" style={styles.button} onPress={handleAddNote}>
                Add Note
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#3498db',
        marginTop: 16,
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
});

export default AddNote;
