import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, FAB } from 'react-native-paper'; // Import FAB (Floating Action Button)
import { GlobalContext } from "../../../context/GlobalContext";
import { createStackNavigator } from '@react-navigation/stack';
import NoteDetail from './NoteDetail';
import { getUserNotes } from '../../../network/useNoteService';
import AddNote from './AddNote';
import { useFocusEffect } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function DailyNotes({ navigation }) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const userId = "6534075de284f4b7d6093e81"; // for test

  const fetchNoteData = async () => {
    const noteData = await getUserNotes(userId);
    console.log('noteData', noteData);
    return noteData;
  };

  const fetchData = async () => {
    const noteData = await fetchNoteData();
    setGlobalState({ ...globalState, DailyNotes: noteData.data });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const toAdd = () => {
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
        </View>
        <View style={styles.itemButton}>
          <Pressable
            onPress={() => toDetail(item)}
            style={styles.button}
            underlayColor="#D8BFD8"
          >
            <Text style={styles.buttonText}>></Text>
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
      {/* Add a Floating Action Button (FAB) */}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={toAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
