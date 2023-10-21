
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddFood from '../AddFood';
import EditFood from '../screens/foods/EditFood';
import FoodDetail from '../screens/foods/FoodDetail';
import FoodList from '../screens/foods/FoodList';

const Stack = createNativeStackNavigator()
export const FoodsStack = () => {
    return (
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
    )
}

