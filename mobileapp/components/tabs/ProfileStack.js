import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyProfile } from '../screens/profile/MyProfile';
import { UpdateProfile } from '../screens/profile/UpdateProfile';
import { ChangePassword } from '../screens/profile/ChangePassword';

const Stack = createNativeStackNavigator()

export const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="myProfile">
            <Stack.Screen
                name="myProfile"
                component={MyProfile}
                options={{ title: "My Profile", headerShown: false }}
            />
            <Stack.Screen
                name="updateProfile"
                component={UpdateProfile}
                options={{ title: "Update Profile", headerShown: true }}
            />

            <Stack.Screen
                name='changePassword'
                component={ChangePassword}
                options={{ title: "Change Password", headerShown: true }} />

        </Stack.Navigator>
    )
}