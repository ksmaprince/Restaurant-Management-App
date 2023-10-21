import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyNotes from '../screens/notes/DailyNotes';
import NoteDetail from '../screens/notes/NoteDetail';
import AddNote from '../screens/notes/AddNote';
import EditNote from '../screens/notes/EditNote';

const Stack = createNativeStackNavigator()

export const NotesStack = () => {
    return (
        <Stack.Navigator initialRouteName="dailyNotes">
            <Stack.Screen
                name="dailyNotes"
                component={DailyNotes}
                options={{ title: "Daily Notes", headerShown: true }}
            />
            <Stack.Screen
                name="noteDetail"
                component={NoteDetail}
                options={{ title: "Note Detail", headerShown: true }}
            />
            <Stack.Screen
                name="addNote"
                component={AddNote}
                options={{ title: "Add New Note", headerShown: true }}
            />
            <Stack.Screen
                name="editNote"
                component={EditNote}
                options={{ title: "Edit Note", headerShown: true }}
            />
        </Stack.Navigator>
    )
}