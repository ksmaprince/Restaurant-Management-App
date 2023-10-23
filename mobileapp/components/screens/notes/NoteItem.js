import { StyleSheet, Platform, Pressable } from 'react-native';
import { Card, IconButton, MD3Colors, Text } from "react-native-paper";
import { deleteNote, getUserNotes } from '../../../network/useNoteService';
import { GlobalContext } from '../../../context/GlobalContext';
import React, { useContext } from 'react';
export default function ShowItem({ itemData, userId, navigation }) {
    const { globalState, setGlobalState } = useContext(GlobalContext);
    const toDetail = (data) => {
        navigation.navigate("noteDetail", data);
    }

    const toDeleteNote = async () => {
        const success = await deleteNote(globalState.userInfo.token, userId, itemData._id);
        if (success) {
            console.log("Course deleted successfully");
            const noteData = await getUserNotes(globalState.userInfo.token, userId);
            setGlobalState({ ...globalState, DailyNotes: noteData.data });
            navigation.navigate('dailyNotes');
        }
    };

    const toDelete = () => {
        if (Platform.OS === 'web') {
            const userConfirmed = confirm('Do you want to delete this note?');
            if (userConfirmed) {
                toDeleteNote();
            }
        } else {
            Alert.alert('Do you want to delete this note?', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
                {
                    text: 'OK',
                    onPress: () => toDeleteNote()
                },
            ]);
        }
    };
    const dateObj = new Date(itemData.date);

    const formattedDate = dateObj.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    const toEdit = () => {
        navigation.navigate("editNote", { data: itemData });
    }
    return (
        <Card style={styles.container}>
            <Card.Content>
                <Pressable onPress={toEdit}>
                    <Text variant='titleLarge'>{itemData.header}</Text>
                    {/* <Text variant='bodyMedium'>{itemData.comment}</Text> */}
                    <Text variant='bodySmall'>{formattedDate}</Text>
                </Pressable>
            </Card.Content>
            <Card.Actions>
                <IconButton
                    icon="delete-circle"
                    iconColor={MD3Colors.error50}
                    size={25}
                    onPress={toDelete}
                />
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        width: 300
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 8,
    },
    itemContent: {
        flexDirection: 'column',
    },
    itemText: {
        marginHorizontal: 20,
        margin: 15,
        fontWeight: 'bold',
        fontSize: 21,
    },
    itemButton: {
        marginLeft: 'auto',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#800080',
    },
    buttonText: {
        color: 'white',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#800080', // Purple color
    },
});
