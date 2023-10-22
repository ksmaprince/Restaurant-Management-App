import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { updateNote, getUserNotes } from '../../../network/useNoteService';
import { GlobalContext } from '../../../context/GlobalContext';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';

const EditNote = ({ navigation, route }) => {
    const [headerText, setHeaderText] = useState('');
    // const [dateText, setDateText] = useState('');
    const [commentText, setCommentText] = useState('');
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const [commentHeight, setCommentHeight] = useState(40);

    const { _id, header, date, comment } = route.params.data;
    const userId = globalState.userInfo.id;
    useEffect(() => {
        setHeaderText(header);
        // setDateText(date);
        setCommentText(comment);
    }, [header, date, comment]);

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        if (contentHeight > 80) {
            setCommentHeight(80);
        } else {
            setCommentHeight(contentHeight);
        }
    };

    const handleUpdateNote = async () => {
        const time = new Date();
        const updatedNote = { _id, header: headerText, date: time, comment: commentText };
        const res = await updateNote(userId, updatedNote);
        if (res) {
            console.log("Note updated successfully");
            const noteData = await getUserNotes(userId);
            setGlobalState({ ...globalState, DailyNotes: noteData.data });
            navigation.navigate('dailyNotes');
        }
    };

    return (
        <View style={styles.container}>
            <PaperTextInput
                style={styles.infoContainer}
                placeholder="Header"
                value={headerText}
                onChangeText={(text) => setHeaderText(text)}
            />
            {/* <PaperTextInput
                style={styles.input}
                placeholder="Date"
                value={dateText}
                onChangeText={(text) => setDateText(text)}
            /> */}
            <PaperTextInput
                style={{
                    ...styles.infoContainer, height: commentHeight
                }}
                placeholder="Comment"
                value={commentText}
                onChangeText={(text) => setCommentText(text)}
                multiline
                onContentSizeChange={(e) => {
                    handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height);
                }}
            />
            <Button mode="contained" style={styles.button} onPress={handleUpdateNote}>Update Note</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#3498db',
        marginTop: 16,
    },
    input: {
        marginBottom: 16,
        padding: "10px 2px",
        backgroundColor: '#f5f5f5', // Light gray background for each input field
        borderRadius: 8,
    },
    infoContainer: {
        paddingTop: 1,
        marginBottom: 16,
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

export default EditNote;
