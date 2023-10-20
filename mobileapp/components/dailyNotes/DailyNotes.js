import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import AddNote from './AddNote';
import NoteDetail from './NoteDetail';

const Stack = createStackNavigator();

export default function DailyNotes({ navigation }) {

  const toAdd = () => {
    //toAdd
    navigation.navigate("add-note");
  }
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Daily Notes" />
      </Appbar.Header>
      <Stack.Navigator initialRouteName="note-detail">
        <Stack.Screen name="add-note" component={AddNote} options={{ title: 'Add Note' }} />
        <Stack.Screen name="note-detail" component={NoteDetail} options={{ title: 'Note Detail' }} />
      </Stack.Navigator>
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
