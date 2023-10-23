import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { updateNote, getUserNotes } from '../../../network/useNoteService';
import { GlobalContext } from '../../../context/GlobalContext';
import { Button } from 'react-native-paper';

const EditNote = ({ navigation, route }) => {
    const [headerText, setHeaderText] = useState('');
    const [commentText, setCommentText] = useState('');
    const { globalState, setGlobalState } = useContext(GlobalContext);

    const { _id, header, date, comment } = route.params.data;
    const userId = globalState.userInfo.id;
    useEffect(() => {
        setHeaderText(header);
        setCommentText(comment);
    }, [header, date, comment]);

    const handleUpdateNote = async () => {
        const time = new Date();
        const updatedNote = { _id, header: headerText, date: time, comment: commentText };
        try {
            const res = await updateNote(globalState.userInfo.token, userId, updatedNote);
            if (res) {
                const noteData = await getUserNotes(globalState.userInfo.token, userId);
                setGlobalState({ ...globalState, DailyNotes: noteData.data });
                alert("Note updated successfully")
                navigation.goBack()
            }
        } catch (error) {
            alert(error.message)
        }

    };

    return (
        <View style={styles.container}>
            <TextInput
                value={headerText}
                style={styles.inputHeading}
                placeholder="Title ..."
                onChangeText={(text) => setHeaderText(text)}
            />
            <TextInput
                value={commentText}
                style={styles.input}
                multiline
                placeholder="Enter your note here ... "
                onChangeText={(text) => setCommentText(text)}
            />
            <Button mode="outlined" onPress={handleUpdateNote} style={styles.button}>
                Update Note
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
export default EditNote;
