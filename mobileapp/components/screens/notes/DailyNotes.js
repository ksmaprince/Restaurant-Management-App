import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, TextInput } from 'react-native';
import { GlobalContext } from "../../../context/GlobalContext";
import { getUserNotes } from '../../../network/useNoteService';
import ShowItem from './NoteItem';
import FabButton from '../../FabButton';
import Background from '../../Background';
import { IconButton, MD3Colors } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function DailyNotes({ navigation }) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [dailyNotes, setDailyData] = useState({});
  const [searchText, setSearhText] = useState("");

  const userId = globalState.userInfo.id;
  const fetchNoteData = async () => {
    const noteData = await getUserNotes(globalState.userInfo.token, userId);
    return noteData;
  };

  const fetchData = async () => {
    const noteData = await fetchNoteData();
    setGlobalState({ ...globalState, DailyNotes: noteData.data });
  };

  const handleSearchText = (text) => {
    setSearhText(text);
    const filteredData = filterData(globalState.DailyNotes, text);
    setDailyData(filteredData);
  }

  const filterData = (data, searchText) => {
    return data.filter((item) => {
      return item.header.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  const handleAsc = () => {
    const sortedData = [...globalState.DailyNotes];
    sortedData.sort((a, b) => a.header.localeCompare(b.header));
    const filteredData = filterData(sortedData, searchText);
    setDailyData(filteredData);
  }

  const handleDesc = () => {
    const sortedData = [...globalState.DailyNotes];
    sortedData.sort((a, b) => b.header.localeCompare(a.header));
    const filteredData = filterData(sortedData, searchText);
    setDailyData(filteredData);
  }

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
    <Background style={styles.container}>
      <View style={{
        position: "relative",
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
      }}>
        <TextInput
          placeholder="Search your notes..."
          style={{
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            paddingLeft: 40,
          }}
          onChangeText={handleSearchText}
          value={searchText}
        />
        <Icon
          name="search"
          size={20}
          color="#333"
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
        />
        <IconButton
          icon="sort-alphabetical-ascending"
          iconColor={MD3Colors.error50}
          size={30}
          style={{ position: "absolute", top: -10, right: 40, zIndex: 1 }}
          onPress={handleAsc}
        />
        <IconButton
          icon="sort-alphabetical-descending"
          iconColor={MD3Colors.error50}
          size={30}
          style={{ position: "absolute", top: -10, right: 5, zIndex: 1 }}
          onPress={handleDesc}
        />
      </View>
      <FlatList
        data={dailyNotes}
        keyExtractor={(item) => item._id}
        renderItem={item => <ShowItem itemData={item.item} userId={userId} navigation={navigation} />}

      />
      {/* Add a Floating Action Button (FAB) */}
      {/* <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={toAdd}
      /> */}
      <FabButton onPress={toAdd} />
    </Background>
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
