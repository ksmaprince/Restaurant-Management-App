import { useContext, useEffect,useState } from "react";
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
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const {getFoods}=useFoodService();
  const [foodData, setFoodData] = useState([]);
  const userId = globalState.userInfo.id;
  const [searchText,setSearhText]=useState("");
  //const [filteredData,setFilteredData]=useState();
  
  const fetchFoodData = async () => {
    const fdata = await getFoods(globalState.userInfo.token,userId);
    return fdata;
  };

  const fetchData = async () => {
    const fdata = await fetchFoodData();
    setGlobalState({ ...globalState, foodData: fdata.data });
    setFoodData([...globalState.foodData])
  };

  useEffect(() => {
    setFoodData(globalState.foodData);
   
  }, [foodData]);

  useEffect(() => {
    fetchData();
  }, []);
  
  const renderFoodItem = ({ item }) => {
    //console.log(item.image)
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
              onPress={()=>handleDeleteFood(item)}
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
  const handleDeleteFood =async (item) => {
    let ans=confirm("Are you sure to delete?")
    if(ans){
    const { deleteFood } = useFoodService();
    const success = await deleteFood(globalState.userInfo.token, globalState.userInfo.id, item._id);
    if (success) {
             refreshFoodStack();
    }
  }
   };
   //refesh the foodlist stack
  const refreshFoodStack = () => {
    navigation.reset({
      index: 0, // Reset to the first screen in the stack
      routes: [{ name: 'foodlist' }], // Specify the stack to reset
    });
  };
  const handleAsc=()=>{
    const sortedData = [...globalState.foodData]; // 
    sortedData.sort((a, b) => a.name.localeCompare(b.name)); 
  
    setGlobalState({ ...globalState, foodData: sortedData })
  }
  const handleDesc=()=>{
    const sortedData = [...globalState.foodData]; // 
    sortedData.sort((a, b) => b.name.localeCompare(a.name)); 
  
    setGlobalState({ ...globalState, foodData: sortedData })
  }
  const handleSearchText= (text)=>{
    
     
    }
  


  
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
          style={{ position: "absolute", top: -10, right:5, zIndex: 1 }}
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
