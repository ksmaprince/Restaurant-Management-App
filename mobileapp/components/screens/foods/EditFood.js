import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Alert, Image } from "react-native";
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

export default function EditFood({ navigation,route }) {
  
  const { globalState } = useContext(GlobalContext);
  
  const [_id, setId] = useState(route.params.item._id);
  const [name, setName] = useState(route.params.item.name);
  const [origin, setOrigin] = useState(route.params.item.origin);
  const [description, setDescription] = useState(route.params.item.description);
  const [price, setPrice] = useState(route.params.item.price);
  const [imageUri, setImageUri] = useState(route.params.item.image.uri);
  
  const [capturedImage, setCapturedImage] = useState('');
  const [imageCaptured, setImageCaptured] = useState(false);
  
  const [saving, setSaving] = useState(false);
 
  const { updateFood } = useFoodService();
  console.log(route.params.item)
  const handleUpdateFood = async () => {
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
        _id,
        name,
        origin,
        description,
        price,
        image: { uri: imageUri },
        date: getCurrentDate(),
      };

      const response = await updateFood(
        globalState.userInfo.token,
        globalState.userInfo.id,
         
        food
      );

      setSaving(false);

      if (response.success) {
      //  alert("Success", "Food updated!");
      //   const fdata = await getFoods(globalState.userInfo.token,globalState.userInfo.id);
      //  setGlobalState({ ...globalState, foods: [fdata.data] });
      //   navigation.navigate('foodlist');
      refreshFoodStack();
      } else {
        alert("Error", response.error);
      }
    } catch (error) {
      setSaving(false);
      alert("Error", error);
    }
  };

  const captureImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== 'granted') {
      alert('Error', 'Camera permission is required to capture an image.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setCapturedImage(result.uri);
      setImageCaptured(true);
      setImageUri(result.uri); // Fill the Image URI input with the captured image URI
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
        <IconButton
          icon="camera"
          size={24}
          color="black"
          onPress={captureImage}
        />
      </View>

      {imageCaptured && (
        <View style={styles.imagePreview}>
          <Image source={{ uri: capturedImage }} style={styles.previewImage} />
        </View>
      )}

      <View style={{ width: "100%", position: "absolute", bottom: 10 }}>
        <Button
          icon="floppy"
          mode="contained"
          onPress={handleUpdateFood}
          style={styles.saveButton}
        >
          Update
        </Button>
      </View>
    </View>
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
  imagePreview: {
    alignItems: 'center',
    marginTop: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});
