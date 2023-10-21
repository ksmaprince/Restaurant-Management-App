import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { GlobalContext } from "../../../context/GlobalContext";
import { createStackNavigator } from '@react-navigation/stack';
import NoteDetail from './NoteDetail';
import { getUserNotes } from '../../../network/useNoteService';
import AddNote from './AddNote';
const Stack = createStackNavigator();
export default function DailyNotes({ navigation }) {

  const { globalState, setGlobalState } = useContext(GlobalContext);
  const userId = "6534075de284f4b7d6093e81" // for test
  const fetchNoteData = async () => {
    const noteData = await getUserNotes(userId);
    console.log('noteData', noteData);
    return noteData;
  }

  useEffect(() => {
    const fetchData = async () => {
      const noteData = await fetchNoteData();
      setGlobalState({ ...globalState, DailyNotes: noteData.data });
    };
    fetchData();
  }, []);


  const toAdd = () => {
    //toAdd
    navigation.navigate("addNote");
  }
  const toDetail = () => {
    navigation.navigate("note-detail");
  }

  const showItem = ({ item }) => {
    console.log(item);
    return (
      <View>
        <Text>{item.header}</Text>
        <Text>{item.date}</Text>
        <View style={styles.edges}>
          <Pressable
            onPress={toDetail}
            style={styles.button}
            underlayColor="#5398DC">
            <Text style={styles.buttonText}>detail</Text>
          </Pressable>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* <Stack.Navigator initialRouteName="note-detail"> */}
        {/* <Stack.Screen name="add-note" component={AddNote} options={{ title: 'Add Note' }} /> */}
        {/* <Stack.Screen name="note-detail" component={NoteDetail} options={{ title: 'Note Detail' }} /> */}
      {/* </Stack.Navigator> */}

      {/* Need to show list here ... */}
      
      <FlatList
        data={globalState.DailyNotes}
        keyExtractor={(item) => item._id}
        renderItem={(item) => showItem(item)}
        style={{ width: '100%' }}
      />
      <View style={styles.edges}>
        <Pressable
          onPress={toAdd}
          style={styles.button}
          underlayColor="#5398DC">
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
