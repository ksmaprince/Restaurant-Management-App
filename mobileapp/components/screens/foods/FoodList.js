import { useContext, useEffect, useState } from "react";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { IconButton, MD3Colors, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { GlobalContext } from "../../../context/GlobalContext";
import { useFoodService } from "../../../network/useFoodService";
import confirmationBox from '../../../helpers/confirmationBox';
export default function FoodList({ navigation }) {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const { getFoods } = useFoodService();
  const { getFoods } = useFoodService();
  const [foodData, setFoodData] = useState([]);
  const userId = globalState.userInfo.id;
  const [searchText, setSearchText] = useState("");
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] = useState(false);

  //function to show delete confirmation box
  // Function to show the delete confirmation modal
  const showDeleteConfirmation = () => {
    setIsDeleteConfirmationVisible(true);
  };
   // Function to handle confirm delete
  

  //load data from database with async and await
  const fetchFoodData = async () => {
    const fdata = await getFoods(globalState.userInfo.token, userId);
    const fdata = await getFoods(globalState.userInfo.token, userId);
    return fdata;
  };

  //retrive data form fectFoodData
  const fetchData = async () => {
    const fdata = await fetchFoodData();
    setGlobalState({ ...globalState, foodData: fdata.data });
    setFoodData([...globalState.foodData]);
  };

  //call didUpdate method every time foodData property of globalState Change
  useEffect(() => {
    setFoodData(globalState.foodData);
  }, [globalState.foodData]);

  //call data load for one time ( like Form Load Event-i.e only once)
  useEffect(() => {
    fetchData();
  }, []);

  //display each food item in card
  const renderFoodItem = ({ item }) => {
    return (
      <>
        <View style={styles.row}>
          <View style={[styles.column, { width: "120", padding: 20 }]}>
            <Image
              source={{ uri: item.image.uri }}
              style={{ width: 100, height: 100,borderRadius:50,resizeMode:'cover' }}
            />
          </View>
          <View style={[styles.column, { paddingTop: 20 }]}>
            <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            <Text>Origin:{item.origin}</Text>
            <Text>Price: ${item.price} </Text>
            <View style={styles.row}>
              <IconButton
                icon="format-list-bulleted-triangle"
                iconColor={MD3Colors.error50}
                size={25}
                onPress={() => handleDetailFood(item)}
              />
              <IconButton
                icon="book-edit"
                iconColor={MD3Colors.error50}
                size={25}
                onPress={() => handleEditFood(item)}
              />

              <IconButton
                icon="delete-circle"
                iconColor={MD3Colors.error50}
                size={25}
                onPress={() => handleDeleteFood(item)}
              />
            </View>
          </View>
        </View>
        <Divider style={{ color: "red" }} />
      </>
    );
  };

  //When plus  button icon click navigate to addfood screen
  const handleAddFood = () => {
    navigation.navigate("addfood");
  };

  //When Detail icon button click navigate to food detail 
  //screen and pass current food item
  const handleDetailFood = (item) => {
    navigation.navigate("fooddetail", { item });
  };

  //When Edit icon button click navigate to editfood 
  //screen and pass current food item
  const handleEditFood = (item) => {
    navigation.navigate("editfood", { item });
  };

  //When delete icon button click-> ask confirmation and delete
  const handleDeleteFood = async (item) => {
    let ans = confirm("Are you sure to delete?");
    if (ans) {
      const { deleteFood } = useFoodService();
      const success = await deleteFood(
        globalState.userInfo.token,
        globalState.userInfo.id,
        item._id
      );
      if (success) {
        refreshFoodStack();
      }
    }
    const handleConfirmDelete = () => {
      // Perform the delete action here
      // ...
  
      // Close the confirmation modal
      setIsDeleteConfirmationVisible(false);
    };
  
    // Function to handle cancel delete
    const handleCancelDelete = () => {
      // Close the confirmation modal
      setIsDeleteConfirmationVisible(false);
    };
  };

  //refesh the foodlist stack
  const refreshFoodStack = () => {
    navigation.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{ name: "foodlist" }], // Specify the stack to reset
    });
  };

  //sort Ascending order
  const handleAsc = () => {
    const sortedData = [...globalState.foodData]; //
    sortedData.sort((a, b) => a.name.localeCompare(b.name));
    setGlobalState({ ...globalState, foodData: sortedData });
  };

  //sort Decending order
  const handleDesc = () => {
    const sortedData = [...globalState.foodData]; //
    sortedData.sort((a, b) => b.name.localeCompare(a.name));
    setGlobalState({ ...globalState, foodData: sortedData });
  };

  //filter according to search text change
  const handleSearchText = (text) => {
    setSearchText(text);
    if (text !== "") {
      const newList = globalState.foodData.filter(
        (food) =>
          food.name.toLowerCase().includes(text.toLowerCase()) ||
          food.origin.toLowerCase().includes(text.toLowerCase())
      );
      setFoodData(newList);
    } else {
      setFoodData(globalState.foodData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "relative",
          width: "100%",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
        }}
      >
        <TextInput
          placeholder="Search..."
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 10,
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
      <View style={styles.roundButton}>
        <IconButton
          icon="plus-thick"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={handleAddFood}
        />
      </View>
      <Divider />
      {!globalState.foodData && <Text>No Foods Found</Text>}
      <FlatList
        data={foodData}
        keyExtractor={(item) => item._id}
        renderItem={renderFoodItem}
        style={{ width: "100%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  column: {
    alignItems: "flex-start",
  },
  roundButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    alignSelf: "center",
    backgroundColor: "silver",
    zIndex: 1,
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  plustext: {
    color: "white",
    fontSize: 40,
    width: 30,
  },
});
