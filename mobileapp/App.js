import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import context from './Context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddFood from './components/AddFood';
import EditFood from './components/EditFood';
import FoodDetail from './components/FoodDetail';
import FoodList from './components/FoodList';
import { useEffect, useState } from 'react';
import {fooddata} from './tempFoodData';
const Stack = createNativeStackNavigator();
export default function App() {
  //load data form db
  const [foodData,setFoodData]=useState([]);
  const getDataFromDB=async()=>{
   
  }
  useEffect(()=>{
    setFoodData([...fooddata]);
    console.log(foodData);
  },[]);
  return (
    <context.Provider value={{foodData,setFoodData}}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="foodlist">
      <Stack.Screen
        name="foodlist"
        component={FoodList}
        options={{ title: "Food List", headerShown: true }}
      />
      <Stack.Screen
        name="fooddetail"
        component={FoodDetail}
        options={{ title: "Food Detail", headerShown: true }}
      />
      <Stack.Screen
        name="addfood"
        component={AddFood}
        options={{ title: "Add New Food", headerShown: true }}
      />
      <Stack.Screen
        name="editfood"
        component={EditFood}
        options={{ title: "Edit Food", headerShown: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
    </context.Provider>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
