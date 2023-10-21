import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { FoodsStack } from "../tabs/FoodsStack"
import { NotesStack } from "../tabs/NotesStack"
import { ProfileStack } from "../tabs/ProfileStack"


const Tab = createBottomTabNavigator()

export default function DashboardScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='foods' component={FoodsStack} options={{
                title: "Foods",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="food-turkey" color={color} size={26} />
            }} />
            <Tab.Screen name='notes' component={NotesStack} options={{
                title: "Notes",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="note" color={color} size={26} />
            }} />
            <Tab.Screen name='profile' component={ProfileStack} options={{
                title: "Profile",
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />
            }} />
        </Tab.Navigator>
    );
}