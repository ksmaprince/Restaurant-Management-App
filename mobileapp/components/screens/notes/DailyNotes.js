import React from 'react';
import { createStackNavigator } from '@react-navigation/native-stack'
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import AddNote from './AddNote';
import NoteDetail from './NoteDetail';


export default function DailyNotes({ navigation }) {

  const toAdd = () => {
    //toAdd
    navigation.navigate("addNote");
  }
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Daily Notes" />
      </Appbar.Header>
      {/* <Stack.Navigator initialRouteName="note-detail">
        <Stack.Screen name="add-note" component={AddNote} options={{ title: 'Add Note' }} />
        <Stack.Screen name="note-detail" component={NoteDetail} options={{ title: 'Note Detail' }} />
      </Stack.Navigator> */}

      {/* Need to show list here ... */}
      <View style={styles.edges}>
        <TouchableHighlight
          onPress={toAdd}
          style={styles.button}
          underlayColor="#5398DC">
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
  },
});
