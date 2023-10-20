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
} from "react-native";
import { IconButton, MD3Colors, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import context from "../Context";
export default function FoodList({ navigation }) {
    const {foodData,setFoodData}=useContext(context);
    console.log(foodData);
  const handleAddFood = () => {
    navigation.navigate("addfood");
  };
  const handleEditFood = () => {
    navigation.navigate("editfood");
  };
  const handleDetailFood = () => {
    navigation.navigate("fooddetail");
  };
  const handleDeleteFood = () => {};
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
              /> </View>
      <Divider />
      <ScrollView style={{ width: "100%" }}>
        
       
      <View style={styles.row}>
    <View style={[styles.column, { width: "120" }]}>
      <Image
        source={require("../foodimages/burger.png")}
        style={{ width: 100, height: 100 }}
      />
    </View>
    <View style={[styles.column, { paddingTop: 20 }]}>
      <Text style={{ fontWeight: "bold" }}>Chicken Noodle (POI)</Text>
      <Text>Origin: Thailand</Text>
      <Text>Price: $12 </Text>
      <View style={styles.row}>
     
        <IconButton
          icon="book-edit"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={handleEditFood}
        />
        <IconButton
          icon="format-list-bulleted-triangle"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={handleDetailFood}
        />
        <IconButton
          icon="delete-circle"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={handleDeleteFood}
        />
      </View>
    </View>
  </View>
  <Divider />

        
      </ScrollView>
     
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
    overflow:"hidden",
    
  },
  plustext:{
    color:'white',
    fontSize:40,
    width:30
  }
});
