import Background from "../../Background"
import Logo from "../../Logo"
import Header from "../../Header"
import Paragraph from "../../Paragraph"
import Button from "../../Button"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../context/GlobalContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityIndicator, Avatar, Icon } from "react-native-paper"
import * as ImagePicker from 'expo-image-picker';
import { useFirebase } from "../../../network/useFirebase"
import { useUserService } from "../../../network/useUserService"
import { DEFAULT_PROFILE_URL } from '@env'
import { Pressable } from "react-native"

export const MyProfile = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const { uploadImage } = useFirebase()
    const { updateProfileImage } = useUserService()

    const logoutPress = async () => {
        try {
            await AsyncStorage.removeItem("USER")
            await
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                })
            setGlobalState({ ...globalState, userInfo: null })
        } catch (error) {

        }
    }

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
                const image = { url: imageRet.imageUrl };

                //Update image url to current user
                const ret = await updateProfileImage(globalState.userInfo.token, globalState.userInfo.id, image)

                if (ret && ret.success) {
                    setLoading(false)
                    await AsyncStorage.setItem("USER", JSON.stringify(ret.data))
                    setGlobalState({ ...globalState, userInfo: ret.data })
                }
            } catch (error) {
                alert(error.message)
            }
        }
    };

    const updateProfile = () => {
        navigation.navigate('updateProfile')
    }

    const changePassword = () => {
        navigation.navigate('changePassword')
    }
    return (
        <Background>

            <Pressable onPress={pickImage}>
                {globalState.userInfo.image ? <Avatar.Image source={{uri: globalState.userInfo.image}} size={150} /> : <Avatar.Image source={{uri:DEFAULT_PROFILE_URL}} size={150} />}
            </Pressable>
            {loading && <ActivityIndicator size='small' />}
            <Header>{globalState.userInfo.name} </Header>
            <Paragraph>
                {globalState.userInfo.address}
            </Paragraph>
            <Paragraph>
                Phone: {globalState.userInfo.phone}
            </Paragraph>
            <Paragraph>
                Email: {globalState.userInfo.email}
            </Paragraph>

            <Button icon="upload" mode="outlined" onPress={updateProfile}>
                Update Profile
            </Button>

            <Button mode="outlined" onPress={changePassword}>
                Change Password
            </Button>

            <Button
                mode="contained"
                onPress={logoutPress}
            >
                Logout
            </Button>



        </Background>
    )
}