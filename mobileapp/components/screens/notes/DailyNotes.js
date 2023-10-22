import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { FAB } from 'react-native-paper'; // Import FAB (Floating Action Button)
import { GlobalContext } from "../../../context/GlobalContext";
import { getUserNotes } from '../../../network/useNoteService';
import ShowItem from './NodeItem';

export default function DailyNotes({ navigation }) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [dailyNotes, setDailyData] = useState({});
  const userId = globalState.userInfo.id;
  const fetchNoteData = async () => {
    const noteData = await getUserNotes(userId);
    return noteData;
  };

  const fetchData = async () => {
    const noteData = await fetchNoteData();
    setGlobalState({ ...globalState, DailyNotes: noteData.data });
  };

  useEffect(() => {
    setDailyData(globalState.DailyNotes);
  }, [globalState.DailyNotes]);

  useEffect(() => {
    fetchData();
  }, []);

  const toAdd = () => {
    navigation.navigate("addNote");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={dailyNotes}
        keyExtractor={(item) => item._id}
        renderItem={item => <ShowItem itemData={item.item} userId={userId} navigation={navigation} />}
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
