import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Alert, Image } from "react-native";
import { IconButton, Button, ActivityIndicator, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GlobalContext } from "../../../context/GlobalContext";
import { useFoodService } from "../../../network/useFoodService";
import { uriValidator } from "../../../helpers/uriValidator";
import alert from '../../../helpers/alert'
import { getCurrentDate } from "../../../helpers/getDateString";
import * as ImagePicker from 'expo-image-picker';
import { useFirebase } from "../../../network/useFirebase"

export default function EditFood({ navigation,route }) {
  
  const { globalState } = useContext(GlobalContext);
  
  const [_id, setId] = useState(route.params.item._id);
  const [name, setName] = useState(route.params.item.name);
  const [origin, setOrigin] = useState(route.params.item.origin);
  const [description, setDescription] = useState(route.params.item.description);
  const [price, setPrice] = useState(route.params.item.price);
  const [imageUri, setImageUri] = useState(route.params.item.image.uri);
  
  const [loading, setLoading] = useState(false)
  const { uploadImage } = useFirebase()
  
  
 
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
      
      alert("Error", error);
    }
  };

  
  //refesh the foodlist stack
  const refreshFoodStack = () => {
    navigation.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{ name: 'foodlist' }], // Specify the stack to reset
    });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.canceled) {
        try {
            setLoading(true)
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();

            //Upload to Cloud Storage
            const imageRet = await uploadImage(globalState.userInfo.id, blob)
            if(imageRet.success)
            {
              setImageUri(imageRet.imageUrl);
            }

            //Update image url to current user
           // const ret = await updateProfileImage(globalState.userInfo.token, globalState.userInfo.id, image)
           
            
           // if (ret && ret.success) {
                setLoading(false)
               // await AsyncStorage.setItem("USER", JSON.stringify(ret.data))
               // setGlobalState({ ...globalState, userInfo: ret.data})
               // alert(imageRet.message)
           // }
        } catch (error) {
            alert(error.message)
        }
    }
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
        
      </View>
      {loading && <ActivityIndicator size='small' />}
      <View  style={{ justifyContent:'center',alignItems:'center',width:'100%',marginTop:20}}>
      {imageUri===''?<Avatar.Image source={require("../../../assets/foodPlaceholder.png")} size={250} />
     :<Avatar.Image source={{uri:imageUri}} size={250} />
    }
      
      </View>
      <View  style={{ justifyContent:'center',alignItems:'center',width:'100%',marginTop:20}}>
      <Button icon="camera" mode="outlined" onPress={pickImage}>
                Change Image
            </Button>
      </View>
     

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
