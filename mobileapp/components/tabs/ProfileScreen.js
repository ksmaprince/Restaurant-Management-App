import Background from "../../components/Background"
import Logo from "../../components/Logo"
import Header from "../../components/Header"
import Paragraph from "../../components/Paragraph"
import Button from "../../components/Button"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const ProfileScreen = ({navigation}) => {
    const {globalState, setGlobalState} = useContext(GlobalContext)
    const logoutPress = async () => {
        try {
            await AsyncStorage.removeItem("USER")
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            })
            setGlobalState({...globalState, userInfo:null})
        } catch (error) {
            
        }
    }
    return (
        <Background>
            <Logo />
            <Header>{globalState.userInfo.name} </Header>
            <Paragraph>
                Phone: {globalState.userInfo.phone}
            </Paragraph>
            <Paragraph>
                Email: {globalState.userInfo.email}
            </Paragraph>
            <Button
                mode="outlined"
                onPress={logoutPress}
            >
                Logout
            </Button>

        </Background>
    )
}