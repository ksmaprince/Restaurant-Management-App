import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FoodListScreen } from "../tabs/FoodListScreen"
import { NoteListScreen } from "../tabs/NoteListScreen"
import { ProfileScreen } from "../tabs/ProfileScreen"
import { MaterialCommunityIcons } from "@expo/vector-icons"


const Tab = createBottomTabNavigator()

export default function DashboardScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='foods' component={FoodListScreen} options={{
                title: "Foods",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="food-turkey" color={color} size={26} />
            }} />
            <Tab.Screen name='notes' component={NoteListScreen} options={{
                title: "Notes",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="note" color={color} size={26} />
            }} />
            <Tab.Screen name='profile' component={ProfileScreen} options={{
                title: "Profile",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />
            }} />
        </Tab.Navigator>
    );
}