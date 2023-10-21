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
  const toDetail = (data) => {
    console.log('data:::::::', data);
    navigation.navigate("noteDetail", data);
  }

  const showItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemContent}>
          <Text style={styles.itemText}>{item.header}</Text>
          <Text style={styles.itemText}>{item.date}</Text>
          <Text style={styles.itemText}>{item.comment}</Text>
        </View>
        <View style={styles.itemButton}>
          <Pressable
            onPress={() => toDetail(item)}
            style={styles.button}
            underlayColor="#5398DC"
          >
            <Text style={styles.buttonText}>Detail</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (

    <View style={styles.container}>
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
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flexDirection: 'row',
  },
  itemText: {
    marginHorizontal: 10,
  },
  itemButton: {
    marginLeft: 'auto', // Push the button to the right
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#5398DC',
  },
  buttonText: {
    color: 'white',
  },
});
