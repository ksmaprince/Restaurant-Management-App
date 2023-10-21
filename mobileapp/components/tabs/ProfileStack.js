import Background from "../Background"
import Logo from "../Logo"
import Header from "../Header"
import Paragraph from "../Paragraph"
import Button from "../Button"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const ProfileStack = ({navigation}) => {
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