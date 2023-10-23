import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, TextInput, ScrollView, View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { createNote } from '../../../network/useNoteService';
import { getUserNotes } from '../../../network/useNoteService';
import { GlobalContext } from '../../../context/GlobalContext';

const AddNote = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [header, setHeader] = useState('');
    const [comment, setComment] = useState('');

    const handleAddNote = async () => {
        const date = new Date();
        if (!header || !comment) {
            alert("Please fill out the form");
            return;
        }

        const newNote = { header, date, comment };
        const userId = globalState.userInfo.id;
        const res = await createNote(globalState.userInfo.token, userId, newNote);
        if (res) {
            try {
                const noteData = await getUserNotes(globalState.userInfo.token, userId);
                setGlobalState({ ...globalState, DailyNotes: noteData.data });
                alert("Note Saved successfully")
                navigation.goBack()
            } catch (error) {
                Alert.alert(error.message)
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={header}
                style={styles.inputHeading}
                placeholder="Title ..."
                onChangeText={(text) => setHeader(text)}
            />
            <TextInput
                value={comment}
                style={styles.input}
                multiline
                placeholder="Enter your note here ... "
                onChangeText={(text) => setComment(text)}
            />
            <Button mode="outlined" onPress={handleAddNote} style={styles.button}>
                Save Note
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputHeading: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 24,
        margin: 4,
    }, input: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 4,
        paddingBottom: 4,
        fontSize: 16,
        margin: 4
    },
    button: {
        margin: 20,
    },
});

export default AddNote;
