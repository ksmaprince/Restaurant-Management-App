import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Alert,Image } from "react-native";
import { IconButton, Button, ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GlobalContext } from "../../../context/GlobalContext";
import { useFoodService } from "../../../network/useFoodService";
import { uriValidator } from "../../../helpers/uriValidator";
import alert from '../../../helpers/alert'
import { getCurrentDate } from "../../../helpers/getDateString";
import * as ImagePicker from 'expo-image-picker';
import Background from "../../Background";
export default function AddFood({ navigation }) {
  const { globalState } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [saving, setSaving] = useState(false);
  const { createFood } = useFoodService();
  
 

  const handleAddFood = async () => {
    if (!name || !origin || !description || !price || !imageUri) {
      alert("Error", "Please fill in all fields.");
      return;
    }

    if (!/^[0-9]*\.[0-9]+$/.test(price)) {
      alert("Error", "Invalid price format. Use digits with one dot.");
      return;
    }

    if (!/^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(imageUri)) {
      alert("Error", "Invalid image URI format.");
      return;
    }

    try {
      setSaving(true);

      const food = {
        name,
        origin,
        description,
        price,
        image: { uri: imageUri },
        date: getCurrentDate(),
      };

      const response = await createFood(
        globalState.userInfo.id,
        globalState.userInfo.token,
        food
      );

      setSaving(false);

      if (response.success) {
       // alert("Success", "Food created!")
        refreshFoodStack();
          
      } else {
        alert("Error", response.error);
      }
    } catch (error) {
      setSaving(false);
      alert("Error", "Unable to process by Server!");
    }
  };
  //refesh the foodlist stack
  const refreshFoodStack = () => {
    navigation.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{ name: 'foodlist' }], // Specify the stack to reset
    });
  };
  return (
    <Background>
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="fast-food" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Food Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Entypo name="location" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Origin"
          placeholderTextColor="#888"
          value={origin}
          onChangeText={(text) => setOrigin(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Entypo name="list" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="currency-usd" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Price"
          placeholderTextColor="#888"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="image" size={24} color="black" />
        <TextInput
          style={styles.input}
          placeholder="Image URI"
          placeholderTextColor="#888"
          value={imageUri}
          onChangeText={(text) => setImageUri(text)}
        />
        
      </View>

    
        
      
      
      <View style={{ width: "100%", position: "absolute", bottom: 10 }}>
        <Button
          icon="floppy"
          mode="contained"
          onPress={handleAddFood}
          style={styles.saveButton}
        >
          Save
        </Button>
      </View>
    </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d8d8d8",
    borderRadius: 5,
    paddingHorizontal: 10,
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 40,
    margin: 10,
  },
  saveButton: {
    width: "100%",
  },
});
