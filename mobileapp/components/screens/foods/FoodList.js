import { useContext, useEffect } from "react";
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
//import { fooddata } from './tempFoodData'
export default function FoodList({ navigation }) {
  const{getFood}=useFoodService();
  const { globalState, setGlobalState } = useContext(GlobalContext);
console.log(globalState.userInfo)
  useEffect(() => {
    const prepare=async()=>{
      const ret= await getFood(globalState.userInfo._id,globalState.userInfo.token);
      console.log(ret);
    setGlobalState({ ...globalState, foodData: ret.data });
    console.log(globalState);
    }
    prepare();
  }, []);
  
  const renderFoodItem = ({ item }) => {
    console.log(item.image)
    return (<>
      <View style={styles.row}>
        <View style={[styles.column, { width: "120", padding: 20 }]}>
          <Image
            source={{ uri: item.image.uri }}
            style={{ width: 100, height: 100 }}
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
              onPress={handleDeleteFood}
            />
          </View>
        </View>
      </View>
      <Divider style={{ color: 'red' }} />
    </>)
  }
  const handleAddFood = () => {
    navigation.navigate("addfood");
  };
  const handleDetailFood = (item) => {
    navigation.navigate("fooddetail", { item });
  };

  const handleEditFood = (item) => {
    navigation.navigate("editfood", { item });
  };
  const handleDeleteFood = () => { };
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
        />
        <Icon
          name="search"
          size={20}
          color="#333"
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
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
        data={globalState.foodData}
        keyExtractor={(item) => item._id}
        renderItem={renderFoodItem}
        style={{ width: '100%' }}
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
    alignltems: "center",
    overflow: "hidden",
  },
  plustext: {
    color: "white",
    fontSize: 40,
    width: 30,
  },
});
