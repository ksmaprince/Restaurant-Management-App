import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";
import { IconButton, MD3Colors, Divider,Button } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';

import context from "../Context";
export default function AddFood({navigtion}) {
  return (
    <View style={styles.container}>
     <View style={styles.inputContainer}>
     <Ionicons name="fast-food" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Food Name"
        placeholderTextColor="#888"
      />
    </View>
    <View style={styles.inputContainer}>
    <Entypo name="location" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Origin"
        placeholderTextColor="#888"
      />
    </View>
    <View style={styles.inputContainer}>
    <Entypo name="list" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#888"
      />
    </View>
    <View style={styles.inputContainer}>
   
<MaterialCommunityIcons name="currency-usd" size={24} color="black" />
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#888"
      />
     
    </View>
  <View style={{width:'100%',position:"absolute",bottom:10}}>
  <Button icon="floppy" mode="contained" onPress={()=>navigtion.navigator("foodlist")} width='100%'>
    Save
  </Button>
  </View>
    </View>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 5,
    paddingHorizontal: 10,
    width:'100%'
    
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20, // Adjust the margin as needed
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 40,
    margin:10
  }
});
