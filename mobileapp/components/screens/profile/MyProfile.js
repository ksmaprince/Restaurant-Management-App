import Background from "../../Background"
import Logo from "../../Logo"
import Header from "../../Header"
import Paragraph from "../../Paragraph"
import Button from "../../Button"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../../context/GlobalContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ActivityIndicator, Avatar } from "react-native-paper"
import * as ImagePicker from 'expo-image-picker';

export const MyProfile = ({ navigation }) => {
    const { globalState, setGlobalState } = useContext(GlobalContext)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        setTimeout(()=> {
            setLoading(false)
            setImage("http://localhost:5001/users/images/KSMA.jpg")
        }, 1000)
    }, [])

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
            setImage(result.assets[0].uri)
        }
    };

    const updateProfile = async () => {
        navigation.navigate('updateProfile')
    }

    return (
        <Background>

            {image ? <Avatar.Image source={image} size={150} /> : <Logo />}
            {loading && <ActivityIndicator size='small' />}
            <Header>{globalState.userInfo.name} </Header>
            <Paragraph>
                Phone: {globalState.userInfo.phone}
            </Paragraph>
            <Paragraph>
                Email: {globalState.userInfo.email}
            </Paragraph>

            <Button icon="upload" mode="outlined" onPress={updateProfile}>
                Update Profile
            </Button>

            <Button icon="camera" mode="outlined" onPress={pickImage}>
                Change Image
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
