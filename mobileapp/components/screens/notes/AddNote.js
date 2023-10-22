import React, { useState, useContext, useRef } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { createNote } from '../../../network/useNoteService';
import { deleteNote, getUserNotes } from '../../../network/useNoteService';
import { GlobalContext } from '../../../context/GlobalContext';

const AddNote = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [header, setHeader] = useState('');
    // const [date, setDate] = useState('');
    const [comment, setComment] = useState('');
    const [commentHeight, setCommentHeight] = useState(40);

    const handleAddNote = async () => {
        const date = new Date();
        if (!header || !comment) {
            alert("Please fill out the form");
            return;
        }

        const newNote = { header, date, comment };
        const userId = "6534075de284f4b7d6093e81"; // for test
        console.log('userId', userId);
        const res = await createNote(userId, newNote);
        if (res) {
            console.log("Note added successfully");
            const noteData = await getUserNotes(userId);
            setGlobalState({ ...globalState, DailyNotes: noteData.data });
            navigation.navigate('dailyNotes');
        }
        setHeader('');
        setComment('');
        setCommentHeight(40);
        navigation.navigate('dailyNotes');
    };

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        if (contentHeight > 80) {
            setCommentHeight(80);
        } else {
            setCommentHeight(contentHeight);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.infoContainer}
                label="Header"
                placeholder="Enter a header"
                value={header}
                onChangeText={(text) => setHeader(text)}
                required
            />
            <TextInput
                style={{ ...styles.infoContainer, height: commentHeight }}
                label="Comment"
                placeholder="Enter a comment"
                value={comment}
                onChangeText={(text) => setComment(text)}
                multiline
                onContentSizeChange={(e) => {
                    handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height);
                }}
                required
            />
            <Button mode="contained" style={styles.button} onPress={handleAddNote}>
                Add Note
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    button: {
        backgroundColor: '#3498db',
        marginTop: 16,
    },
    infoContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
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
